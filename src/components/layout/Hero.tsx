'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  const bootRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    if (isReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-1, 1], [-8, 8]);
  const rotateY = useTransform(mouseX, [-1, 1], [8, -8]);
  const translateX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const translateY = useTransform(mouseY, [-1, 1], [-15, 15]);

  const floatY = useMotionValue(0);
  const floatShadow = useMotionValue(0);

  useEffect(() => {
    if (isReducedMotion) return;
    let frame = 0;
    const animate = () => {
      frame += 0.008;
      floatY.set(Math.sin(frame) * 8);
      floatShadow.set(Math.sin(frame) * 4);
      requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [isReducedMotion]);

  const springyRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springyRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });
  const springyTranslateX = useSpring(translateX, { stiffness: 300, damping: 30 });
  const springyTranslateY = useSpring(translateY, { stiffness: 300, damping: 30 });
  const springyFloatY = useSpring(floatY, { stiffness: 200, damping: 20 });
  const springyFloatShadow = useSpring(floatShadow, { stiffness: 200, damping: 20 });

  return (
    <section className="relative bg-white overflow-hidden" aria-labelledby="hero-heading">
      <div className="container relative py-10 sm:py-16 lg:py-24 xl:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center min-h-[60vh] lg:min-h-[80vh]">
          <motion.div
            className="max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-[#D4A574] mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              THE ICONIC TIMBERLAND
            </motion.span>

            <motion.h1
              id="hero-heading"
              className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] text-[#17131F] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              BUILT FOR<br />
              EVERY STEP.
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Timeless design. Everyday comfort. Made to stand out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px]"
                >
                  DISCOVER THE COLLECTION
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div
            className="relative"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              ref={bootRef}
              className="relative aspect-[4/5] lg:aspect-[3/4] max-w-[280px] sm:max-w-[320px] lg:max-w-lg xl:max-w-xl mx-auto"
              style={{
                y: isReducedMotion ? 0 : springyFloatY,
                rotateX: isReducedMotion ? 0 : springyRotateX,
                rotateY: isReducedMotion ? 0 : springyRotateY,
                x: isReducedMotion ? 0 : springyTranslateX,
                translateY: isReducedMotion ? 0 : springyTranslateY,
              }}
            >
              <motion.div
                className="relative aspect-[4/5] lg:aspect-[3/4] max-w-[280px] sm:max-w-[320px] lg:max-w-lg xl:max-w-xl mx-auto"
                animate={{
                  scale: isReducedMotion ? 1 : [1, 1.02, 1],
                  boxShadow: isReducedMotion 
                    ? '0 20px 40px rgba(0,0,0,0.08)' 
                    : [
                        '0 20px 40px rgba(0,0,0,0.08)',
                        '0 35px 60px rgba(0,0,0,0.12)',
                        '0 20px 40px rgba(0,0,0,0.08)',
                      ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Image
                  src="/images/timberland-hero.png"
                  alt="Timberland Premium Yellow Boot - Waterproof leather, durable construction, iconic style"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>

              <motion.div
                className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 w-[70%] h-2 bg-gradient-to-r from-transparent via-black/5 to-transparent rounded-full"
                animate={{
                  opacity: isReducedMotion ? 0.5 : [0.4, 0.6, 0.4],
                  scale: isReducedMotion ? 1 : [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;