'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
  {
    name: 'ICONIC BOOTS',
    slug: 'iconic-boots',
    description: 'Heritage craftsmanship meets modern utility. The boots that defined a generation.',
    filter: 'boots',
    image: '/products/timberland/classic-sneaker.svg',
    accentColor: 'from-amber-700 to-amber-900',
    brand: 'Timberland',
  },
  {
    name: 'STREET ESSENTIALS',
    slug: 'street-essentials',
    description: 'Curated rotation for the streets. Bold silhouettes from culture-defining brands.',
    filter: 'lifestyle',
    image: '/products/converse/chuck-taylor-all-star-high-top.svg',
    accentColor: 'from-primary to-primary-hover',
    brand: 'Converse × Vans',
  },
  {
    name: 'EVERYDAY CLASSICS',
    slug: 'everyday-classics',
    description: 'Timeless silhouettes engineered for all-day comfort. The icons you reach for daily.',
    filter: 'retro',
    image: '/products/nike/air-force-1-low.svg',
    accentColor: 'from-gray-700 to-gray-900',
    brand: 'Nike × New Balance',
  },
];

export const FeaturedCollections = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-light-lavender" aria-labelledby="collections-heading">
      <div className="container">
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div>
            <motion.h2
              id="collections-heading"
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Editorial Picks
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Three distinct edits for your rotation
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/shop" className="btn-ghost hidden sm:inline-flex">
              View All →
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(98, 70, 155, 0.25)' }}
            >
              <Link
                href={`/shop?filter=${collection.filter}`}
                className="group block relative aspect-[5/6] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-border hover:shadow-2xl hover:shadow-primary/15 transition-all duration-700"
                aria-label={`Shop ${collection.name}`}
              >
                <div className="relative aspect-[5/6] sm:aspect-[4/5] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br bg-[${collection.accentColor}] opacity-5 group-hover:opacity-15 transition-opacity duration-700" />
                  
                  <div className="relative aspect-[4/5] max-w-[220px] sm:max-w-[260px] lg:max-w-lg mx-auto mt-6 sm:mt-8 lg:mt-10">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 lg:p-8">
                    <div className="text-left">
                      <motion.span
                        className="inline-block text-xs font-medium tracking-widest uppercase text-white/70 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {collection.brand}
                      </motion.span>
                      <motion.h3
                        className="font-heading text-xl sm:text-2xl md:text-3xl font-normal text-white mb-2"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        {collection.name}
                      </motion.h3>
                    </div>

                    <div className="text-left">
                      <motion.p
                        className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xs sm:max-w-sm"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        {collection.description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-primary text-sm font-medium rounded-full shadow-lg group-hover:shadow-xl group-hover:gap-3 transition-all duration-500">
                          Explore Collection
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;