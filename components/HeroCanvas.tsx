"use client";

import { useEffect, useRef } from "react";

type Dot = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  phase: number;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const context: CanvasRenderingContext2D = ctx;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPACING = 46;
    const RADIUS = 140;
    const dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999, active: false };

    function buildGrid() {
      dots.length = 0;
      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * SPACING;
          const y = j * SPACING;
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    }

    function draw(time: number) {
      context.clearRect(0, 0, width, height);

      for (const dot of dots) {
        const drift = reduceMotion
          ? 0
          : Math.sin(time * 0.0006 + dot.phase) * 3;
        let x = dot.baseX;
        let y = dot.baseY + drift;

        let radius = 1.1;
        let alpha = 0.16;
        let color = "17, 17, 17";

        if (mouse.active) {
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS) {
            const force = (1 - dist / RADIUS);
            x += (dx / (dist || 1)) * force * 14;
            y += (dy / (dist || 1)) * force * 14;
            radius = 1.1 + force * 2.2;
            alpha = 0.16 + force * 0.55;
            color = "0, 102, 255";
          }
        }

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, ${alpha})`;
        context.fill();
      }

      if (!reduceMotion) {
        raf = requestAnimationFrame(draw);
      }
    }

    let raf = 0;

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
    }

    resize();
    draw(0);

    const ro = new ResizeObserver(() => resize());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    if (reduceMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
