'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Hero } from '@/components/layout/Hero';
import { BrandStrip } from '@/components/layout/BrandStrip';
import { FeaturedCollections } from '@/components/layout/FeaturedCollections';
import { Footer } from '@/components/layout/Footer';

const brandStory = {
  title: 'OUR STORY',
  subtitle: 'Born from the streets, built for the culture',
  description: 'CHIPCOSNEAKS started with a simple belief: everyone deserves to express themselves through what they wear on their feet. Founded by a collective of sneakerheads, designers, and street culture enthusiasts, we set out to create a destination that bridges the gap between performance and style.',
  highlights: [
    { number: '50K+', label: 'Happy Customers' },
    { number: '12', label: 'Countries Shipped' },
    { number: '200+', label: 'Unique Designs' },
    { number: '4.8★', label: 'Average Rating' },
  ],
};

const promotionalBanner = {
  title: 'SPRING COLLECTION 2025',
  subtitle: 'Fresh drops. Bold energy. Your style, your rules.',
  ctaText: 'SHOP ALL SNEAKERS',
  ctaHref: '/shop',
  image: '/products/nike/air-max-90.svg',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      
      <BrandStrip />
      
      <FeaturedCollections />
      
      <section className="py-16 lg:py-24 bg-white" aria-labelledby="brand-story-heading">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80"
                    alt="CHIPCOSNEAKS brand story - streetwear culture and sneaker design"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            </div>
            <div>
              <motion.span
                className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-4 tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {brandStory.title}
              </motion.span>
              <motion.h2
                id="brand-story-heading"
                className="section-title mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {brandStory.subtitle}
              </motion.h2>
              <motion.p
                className="text-muted mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {brandStory.description}
              </motion.p>
              <motion.div
                className="grid grid-cols-2 gap-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {brandStory.highlights.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <p className="font-heading text-3xl md:text-4xl text-primary">{stat.number}</p>
                    <p className="text-muted text-sm mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Link href="/about">
                  <Button variant="primary">Read Our Story</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 overflow-hidden" aria-labelledby="promo-heading">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        
        <div className="container relative">
          <motion.div
            className="relative rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative aspect-[4/3] lg:aspect-auto min-h-[400px]">
                <div className="absolute inset-0">
                  <Image
                    src={promotionalBanner.image}
                    alt="Spring Collection 2025 - Premium sneakers"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
                </div>
              </div>
              <div className="relative bg-primary p-12 lg:p-16 flex items-center justify-center min-h-[400px]">
                <div className="max-w-md">
                  <motion.span
                    className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-4 tracking-wider uppercase"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    NEW SEASON
                  </motion.span>
                  <motion.h2
                    id="promo-heading"
                    className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {promotionalBanner.title}
                  </motion.h2>
                  <motion.p
                    className="text-white/80 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {promotionalBanner.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Link href={promotionalBanner.ctaHref}>
                      <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                        {promotionalBanner.ctaText}
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}