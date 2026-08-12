import * as React from "react";

/**
 * Keeps the document in sync with the dynamic visual viewport height.
 *
 * On tablets, the browser chrome (address bar, tabs) can hide/show and resize the
 * viewport without firing a window resize event. CSS `dvh` units already adapt to
 * this in modern browsers, but this hook additionally:
 *
 * 1. Dispatches a synthetic `resize` event whenever the visual viewport changes,
 *    so components relying on the `resize` listener still update.
 * 2. Updates a `--vvh` CSS variable on `<html>` as a fallback for browsers
 *    without native `dvh` support.
 */
export function useDynamicViewportHeight() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const update = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const visualViewport = window.visualViewport;
        const height = visualViewport ? visualViewport.height : window.innerHeight;

        document.documentElement.style.setProperty("--vvh", `${Math.round(height)}px`);

        if (visualViewport && (visualViewport.height !== window.innerHeight || visualViewport.scale !== 1)) {
          window.dispatchEvent(new Event("resize"));
        }
      });
    };

    update();

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", update);
      window.visualViewport.addEventListener("scroll", update);
      return () => {
        if (frame) cancelAnimationFrame(frame);
        window.visualViewport?.removeEventListener("resize", update);
        window.visualViewport?.removeEventListener("scroll", update);
      };
    }

    window.addEventListener("resize", update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);
}
