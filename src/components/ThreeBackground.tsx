import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/useScrollProgress";

// ---------- Formation generators ----------
// Each fills a Float32Array of length count*3 with target positions.
type Generator = (out: Float32Array, count: number) => void;

const rand = (a: number, b: number) => a + Math.random() * (b - a);

const starfield: Generator = (out, count) => {
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-30, 30);
    out[i * 3 + 1] = rand(-30, 30);
    out[i * 3 + 2] = rand(-40, 10);
  }
};

const sphere: Generator = (out, count) => {
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = 8 + (Math.random() - 0.5) * 0.4;
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    out[i * 3 + 2] = r * Math.cos(phi);
  }
};

const lattice: Generator = (out, count) => {
  // icosahedron-ish lattice: points on edges of a subdivided icosahedron
  const geo = new THREE.IcosahedronGeometry(9, 2);
  const pos = geo.attributes.position.array as Float32Array;
  const n = pos.length / 3;
  for (let i = 0; i < count; i++) {
    const idx = i % n;
    out[i * 3] = pos[idx * 3] + rand(-0.2, 0.2);
    out[i * 3 + 1] = pos[idx * 3 + 1] + rand(-0.2, 0.2);
    out[i * 3 + 2] = pos[idx * 3 + 2] + rand(-0.2, 0.2);
  }
  geo.dispose();
};

const grid: Generator = (out, count) => {
  const cols = Math.ceil(Math.sqrt(count));
  const spacing = 0.9;
  for (let i = 0; i < count; i++) {
    const x = (i % cols) - cols / 2;
    const y = Math.floor(i / cols) - cols / 2;
    out[i * 3] = x * spacing + rand(-0.05, 0.05);
    out[i * 3 + 1] = y * spacing + rand(-0.05, 0.05);
    out[i * 3 + 2] = Math.sin(x * 0.3) * 1.5 + Math.cos(y * 0.3) * 1.5;
  }
};

const motes: Generator = (out, count) => {
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-14, 14);
    out[i * 3 + 1] = rand(-10, 10);
    out[i * 3 + 2] = rand(-15, 5);
  }
};

const flowLine: Generator = (out, count) => {
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const y = (t - 0.5) * 30;
    const wob = Math.sin(t * Math.PI * 4) * 1.2;
    out[i * 3] = wob + rand(-0.4, 0.4);
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.cos(t * Math.PI * 4) * 1.2 + rand(-0.4, 0.4);
  }
};

const starfieldFar: Generator = (out, count) => {
  for (let i = 0; i < count; i++) {
    out[i * 3] = rand(-40, 40);
    out[i * 3 + 1] = rand(-40, 40);
    out[i * 3 + 2] = rand(-60, -20);
  }
};

const FORMATIONS: Generator[] = [
  starfield,
  sphere,
  lattice,
  grid,
  motes,
  flowLine,
  starfieldFar,
];

// Camera keyframes (one per formation)
const CAMERA_KEYS: Array<[number, number, number]> = [
  [0, 0, 1],
  [0, 0, 14],
  [2, 1, 16],
  [0, 0, 18],
  [-1, 0, 14],
  [0, 0, 10],
  [0, 0, 4],
];

// ---------- Shader ----------
const vertexShader = /* glsl */ `
  attribute vec3 positionB;
  attribute float aSeed;
  uniform float uMix;
  uniform float uTime;
  uniform float uSize;
  varying float vDepth;
  varying float vSeed;
  void main() {
    vec3 p = mix(position, positionB, uMix);
    // subtle per-particle drift so it never feels frozen
    p.x += sin(uTime * 0.3 + aSeed * 6.28) * 0.08;
    p.y += cos(uTime * 0.25 + aSeed * 6.28) * 0.08;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (1.0 / -mv.z) * 60.0;
    vDepth = -mv.z;
    vSeed = aSeed;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uProgress;
  uniform vec3 uFogColor;
  uniform float uFogNear;
  uniform float uFogFar;
  varying float vDepth;
  varying float vSeed;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.0, d);
    float mixC = clamp(uProgress + (vSeed - 0.5) * 0.4, 0.0, 1.0);
    vec3 color = mix(uColorA, uColorB, mixC);
    // fog
    float fogF = smoothstep(uFogNear, uFogFar, vDepth);
    color = mix(color, uFogColor, fogF);
    alpha *= (1.0 - fogF * 0.85) * 0.9;
    gl_FragColor = vec4(color, alpha);
  }
`;

// ---------- Scene ----------
interface SceneProps {
  count: number;
  reducedMotion: boolean;
  isMobile: boolean;
}

const MorphScene = ({ count, reducedMotion, isMobile }: SceneProps) => {
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();
  const progressRef = useScrollProgress();
  const segRef = useRef(-1);
  const targetMixRef = useRef(0);
  const currentMixRef = useRef(0);

  const { geometry, bufA, bufB, seeds } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const a = new Float32Array(count * 3);
    const b = new Float32Array(count * 3);
    const s = new Float32Array(count);
    FORMATIONS[0](a, count);
    FORMATIONS[1](b, count);
    for (let i = 0; i < count; i++) s[i] = Math.random();
    g.setAttribute("position", new THREE.BufferAttribute(a, 3));
    g.setAttribute("positionB", new THREE.BufferAttribute(b, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(s, 1));
    return { geometry: g, bufA: a, bufB: b, seeds: s };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uMix: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: isMobile ? 1.4 : 1.8 },
      uProgress: { value: 0 },
      uColorA: { value: new THREE.Color("#166534") },
      uColorB: { value: new THREE.Color("#4ADE80") },
      uFogColor: { value: new THREE.Color("#0A0F1E") },
      uFogNear: { value: 18 },
      uFogFar: { value: 65 },
    }),
    [isMobile]
  );

  useFrame((_, delta) => {
    if (!matRef.current || !pointsRef.current) return;
    uniforms.uTime.value += delta;

    if (reducedMotion) {
      // static / drift only
      pointsRef.current.rotation.y += delta * 0.01;
      uniforms.uProgress.value = 0;
      return;
    }

    const p = progressRef.current;
    const segCount = FORMATIONS.length - 1; // 6 transitions
    const scaled = p * segCount;
    const seg = Math.min(segCount - 1, Math.floor(scaled));
    const local = scaled - seg;

    // when segment changes, shift buffers: A <- B, B <- next formation
    if (seg !== segRef.current) {
      if (segRef.current === -1) {
        // initial state
        FORMATIONS[seg](bufA, count);
        FORMATIONS[seg + 1](bufB, count);
      } else if (seg === segRef.current + 1) {
        // moved forward
        bufA.set(bufB);
        FORMATIONS[seg + 1](bufB, count);
      } else if (seg === segRef.current - 1) {
        // moved backward
        bufB.set(bufA);
        FORMATIONS[seg](bufA, count);
      } else {
        FORMATIONS[seg](bufA, count);
        FORMATIONS[seg + 1](bufB, count);
      }
      (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geometry.attributes.positionB as THREE.BufferAttribute).needsUpdate = true;
      segRef.current = seg;
      currentMixRef.current = 0;
    }

    // smooth mix towards local progress (eased)
    targetMixRef.current = local;
    const eased = THREE.MathUtils.smoothstep(targetMixRef.current, 0, 1);
    currentMixRef.current += (eased - currentMixRef.current) * Math.min(1, delta * 4);
    uniforms.uMix.value = currentMixRef.current;
    uniforms.uProgress.value = p;

    // camera spline interpolation
    const k = CAMERA_KEYS;
    const cx = THREE.MathUtils.lerp(k[seg][0], k[seg + 1][0], local);
    const cy = THREE.MathUtils.lerp(k[seg][1], k[seg + 1][1], local);
    const cz = THREE.MathUtils.lerp(k[seg][2], k[seg + 1][2], local);
    camera.position.x += (cx - camera.position.x) * Math.min(1, delta * 2);
    camera.position.y += (cy - camera.position.y) * Math.min(1, delta * 2);
    camera.position.z += (cz - camera.position.z) * Math.min(1, delta * 2);
    camera.lookAt(0, 0, 0);

    pointsRef.current.rotation.y += delta * 0.015;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ---------- Wrapper ----------
const ThreeBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setIsMobile(mqMobile.matches);
      setReducedMotion(mqMotion.matches);
    };
    update();
    mqMobile.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  const count = isMobile ? 600 : 2500;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: isMobile ? 0.95 : 0.85 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 200 }}
      >
        <MorphScene count={count} reducedMotion={reducedMotion} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
