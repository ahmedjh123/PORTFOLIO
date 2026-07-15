"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Background layer is swappable: replace <HeroCanvas /> below with a
 * <video autoPlay muted loop playsInline> element once a real hero
 * video exists — the overlay, gradient and text layers are unaffected.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hem"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper" />
      </motion.div>

      <div className="container-content relative flex flex-1 flex-col justify-between pt-24 pb-12 md:pt-28">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="grid flex-1 grid-cols-1 items-center md:grid-cols-12"
        >
          <div className="md:col-span-10 md:col-start-1">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label mb-6 text-muted"
            >
              Ahmed Habib — Portfölj / 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
              className="font-display text-5xl font-medium tracking-tightest text-ink md:text-6xl"
            >
              Ahmed Habib
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="mt-4 max-w-2xl font-display text-2xl font-medium tracking-tight text-muted md:text-3xl"
            >
              Systemutvecklare &amp; digitala tjänster-specialist
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
              className="mt-8 max-w-md text-lg text-muted md:ml-[8%]"
            >
              Jag bygger digitala tjänster med fokus på kvalitet,
              tillgänglighet och modern teknik.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex items-center justify-between"
        >
          <span className="label text-faint">Scrolla</span>
          <a
            href="#om-mig"
            aria-label="Scrolla till nästa sektion"
            className="group relative flex h-16 w-8 items-start justify-center overflow-hidden rounded-full border border-line"
          >
            <motion.span
              className="mt-2.5 h-2 w-2 rounded-full bg-blue"
              animate={{ y: [0, 34, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: EASE }}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
