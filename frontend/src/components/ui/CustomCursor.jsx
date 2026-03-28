import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const auraRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });
  const auraPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // Smooth aura follow via RAF
    function animate() {
      const { x, y } = posRef.current;
      const ax = auraPos.current.x + (x - auraPos.current.x) * 0.12;
      const ay = auraPos.current.y + (y - auraPos.current.y) * 0.12;
      auraPos.current = { x: ax, y: ay };

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 6}px, ${y - 6}px)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${ax - 20}px, ${ay - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // Hover state on interactive elements
    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    const onHoverIn = () => {
      if (cursorRef.current) cursorRef.current.style.transform += " scale(2)";
      if (auraRef.current) {
        auraRef.current.style.width = "70px";
        auraRef.current.style.height = "70px";
        auraRef.current.style.borderColor = "rgba(200, 169, 110, 0.5)";
      }
    };
    const onHoverOut = () => {
      if (auraRef.current) {
        auraRef.current.style.width = "40px";
        auraRef.current.style.height = "40px";
        auraRef.current.style.borderColor = "rgba(61, 90, 241, 0.4)";
      }
    };
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverIn);
        el.removeEventListener("mouseleave", onHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={auraRef}
        className="cursor-aura"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
