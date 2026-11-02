import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import IntroLoader from "@/components/hero/IntroLoader";

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
  document.documentElement.removeAttribute("data-intro-skip");
  document.documentElement.removeAttribute("data-intro-complete");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  document.documentElement.removeAttribute("data-intro-complete");
  document.documentElement.removeAttribute("data-intro-skip");
});

describe("intro hand-off", () => {
  it("waits the full 700ms flight before releasing the hero", () => {
    const landed = vi.fn();
    window.addEventListener("intro-complete", landed);
    render(<IntroLoader />);
    act(() => vi.advanceTimersByTime(1300));
    act(() => vi.advanceTimersByTime(699));
    expect(landed).not.toHaveBeenCalled();
    expect(document.documentElement.hasAttribute("data-intro-complete")).toBe(false);
    act(() => vi.advanceTimersByTime(1));
    expect(landed).toHaveBeenCalledTimes(1);
    expect(document.documentElement.hasAttribute("data-intro-complete")).toBe(true);
    window.removeEventListener("intro-complete", landed);
  });

  it("releases the hero immediately when the visitor skips", () => {
    render(<IntroLoader />);
    act(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })));
    expect(document.documentElement.hasAttribute("data-intro-complete")).toBe(true);
    expect(document.documentElement.style.overflow).toBe("");
  });
});