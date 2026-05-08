import { useMemo, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PURPLE = new THREE.Color("#a78bfa");
const TEAL = new THREE.Color("#5eead4");

interface FieldProps {
  count: number;
  spread: number;
  interactive: boolean;
  reducedMotion: boolean;
}

const StarField = ({ count, spread, interactive, reducedMotion }: FieldProps) => {
  const groupRef = useRef<THREE.Points>(null);
  const { camera, mouse } = useThree();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread;
      tmp.copy(Math.random() > 0.5 ? PURPLE : TEAL);
      const intensity = 0.4 + Math.random() * 0.6;
      col[i * 3] = tmp.r * intensity;
      col[i * 3 + 1] = tmp.g * intensity;
      col[i * 3 + 2] = tmp.b * intensity;
    }
    return [pos, col];
  }, [count, spread]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.02;
      groupRef.current.rotation.x += delta * 0.005;
    }
    if (interactive && !reducedMotion) {
      // subtle camera parallax (max ~3deg)
      const targetX = mouse.y * 0.05;
      const targetY = mouse.x * 0.05;
      camera.rotation.x += (targetX - camera.rotation.x) * 0.03;
      camera.rotation.y += (targetY - camera.rotation.y) * 0.03;
    }
  });

  return (
    <points ref={groupRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

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

  const count = isMobile ? 600 : 2000;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={["#0a0a0f", 20, 60]} />
        <StarField
          count={count}
          spread={60}
          interactive={!isMobile}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
