import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
