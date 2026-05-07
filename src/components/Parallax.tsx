"use client";

import { Children, isValidElement, useEffect, useRef } from "react";

function isReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Parallax wrapper: translates child by a fraction of how far the element
 * is from the viewport center. Speed > 0 = slower (background feel),
 * speed < 0 = faster (foreground pop). Typical range: -0.15 to 0.4.
 */
export function Parallax({
  children,
  speed = 0.2,
  className = "",
  axis = "y",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  axis?: "y" | "x";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    if (isReducedMotion()) return;

    let raf = 0;
    let last = Number.NEGATIVE_INFINITY;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = -center * speed;
      if (Math.abs(offset - last) > 0.4) {
        el.style.transform =
          axis === "y"
            ? `translate3d(0, ${offset.toFixed(1)}px, 0)`
            : `translate3d(${offset.toFixed(1)}px, 0, 0)`;
        last = offset;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    el.style.willChange = "transform";
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, axis]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * Reveal: fades + translates children into view when they enter viewport.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 22,
  duration = 700,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
  as?: "div" | "section" | "li" | "article" | "figure" | "span";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;

    if (isReducedMotion()) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.22, 0.61, 0.23, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 0.61, 0.23, 1) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.unobserve(el);
            setTimeout(() => {
              if (el) el.style.willChange = "auto";
            }, duration + delay + 100);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, duration]);

  return (
    // @ts-expect-error – dynamic ref typing for polymorphic element
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Stagger: wraps each direct child in a Reveal with progressive delays.
 */
export function Stagger({
  children,
  base = 0,
  step = 80,
  y = 18,
  className = "",
}: {
  children: React.ReactNode;
  base?: number;
  step?: number;
  y?: number;
  className?: string;
}) {
  const arr = Children.toArray(children);
  return (
    <div className={className}>
      {arr.map((child, i) =>
        isValidElement(child) ? (
          <Reveal key={i} delay={base + i * step} y={y}>
            {child}
          </Reveal>
        ) : (
          child
        )
      )}
    </div>
  );
}
