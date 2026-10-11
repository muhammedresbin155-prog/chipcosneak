'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
  return (
    <section className="relative bg-white overflow-hidden" aria-labelledby="hero-heading">
      <div className="container relative py-16 lg:py-24 xl:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center min-h-[70vh] lg:min-h-[85vh]">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block text-xs font-medium tracking-widest uppercase text-[#D4A574] mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              THE ICONIC TIMBERLAND
            </motion.span>

            <motion.h1
              id="hero-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.1] text-[#17131F] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              BUILT FOR<br />
              EVERY STEP.
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Timeless design. Everyday comfort. Made to stand out.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/shop">
                <Button
                  variant="primary"
                  size="lg"
                  className="min-w-[220px]"
                >
                  DISCOVER THE COLLECTION
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative aspect-[3/4] lg:aspect-square max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0">
              <Image
                src="/images/timberland-hero.png"
                alt="Timberland Premium Yellow Boot - Waterproof leather, durable construction, iconic style"
                fill
                className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;