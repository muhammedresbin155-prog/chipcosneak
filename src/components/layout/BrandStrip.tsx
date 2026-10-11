'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Converse', slug: 'converse', logo: '/images/brands/converse.svg' },
  { name: 'Vans', slug: 'vans', logo: '/images/brands/vans.svg' },
  { name: 'Timberland', slug: 'timberland', logo: '/images/brands/timberland.svg' },
  { name: 'Nike', slug: 'nike', logo: '/images/brands/nike.svg' },
  { name: 'Adidas', slug: 'adidas', logo: '/images/brands/adidas.svg' },
  { name: 'New Balance', slug: 'new-balance', logo: '/images/brands/new-balance.svg' },
];

export const BrandStrip = () => {
  return (
    <section className="bg-white border-y border-border py-8 lg:py-16" aria-labelledby="brand-strip-heading">
      <div className="container">
        <motion.h2
          id="brand-strip-heading"
          className="font-heading text-2xl md:text-3xl text-dark-text text-center mb-10 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          ICONIC SNEAKER BRANDS
        </motion.h2>
        
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link
                href={`/shop?brand=${brand.slug}`}
                className="flex flex-col items-center gap-3 group transition-all duration-300 hover:scale-105"
                aria-label={`Shop ${brand.name}`}
              >
                <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-light-lavender flex items-center justify-center overflow-hidden group-hover:bg-primary/5 transition-colors duration-300">
                  <motion.img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    initial={{ filter: 'grayscale(1)', scale: 0.9 }}
                    whileHover={{ filter: 'grayscale(0)', scale: 1 }}
                    transition={{ duration: 0.5 }}
                    width={96}
                    height={48}
                    loading="lazy"
                  />
                </div>
                <motion.span
                  className="font-heading text-lg md:text-xl font-normal text-dark-text group-hover:text-primary transition-colors duration-300 text-center"
                >
                  {brand.name}
                </motion.span>
                <motion.svg
                  className="w-5 h-5 text-muted group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0, x: 0 }}
                  whileHover={{ opacity: 1, x: 4 }}
                  transition={{ delay: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;