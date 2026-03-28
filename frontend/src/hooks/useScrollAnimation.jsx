import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates a ref'd element's children with a stagger fade-up on scroll entry.
 * @param {React.RefObject} containerRef - ref to the parent element
 * @param {string} selector - CSS selector for children to animate
 * @param {object} options
 */
export function useScrollReveal(containerRef, selector = ".reveal", options = {}) {
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: options.duration ?? 0.9,
          ease: options.ease ?? "expo.out",
          stagger: options.stagger ?? 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start ?? "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);
}

/**
 * Animates a numeric counter from 0 to `target` when scrolled into view.
 * @param {React.RefObject} ref - ref to the element displaying the number
 * @param {number} target
 * @param {number} duration
 */
export function useCountUp(ref, target, duration = 2) {
  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate() {
        if (ref.current) ref.current.textContent = Math.round(obj.val).toLocaleString("it-IT");
      },
    });
    return () => tween.kill();
  }, [target, duration]);
}
