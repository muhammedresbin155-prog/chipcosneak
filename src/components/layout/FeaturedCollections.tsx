'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const collections = [
  {
    name: 'Streetwear Essentials',
    slug: 'streetwear-essentials',
    description: 'Curated picks for your daily rotation. Bold silhouettes, iconic brands.',
    filter: 'lifestyle',
    image: '/products/converse/chuck-taylor-all-star-high-top.svg',
    accentColor: 'from-primary to-primary-hover',
  },
  {
    name: 'Classic Sneakers',
    slug: 'classic-sneakers',
    description: 'Timeless silhouettes that never go out of style. The icons you know and love.',
    filter: 'retro',
    image: '/products/nike/air-force-1-low.svg',
    accentColor: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Everyday Comfort',
    slug: 'everyday-comfort',
    description: 'All-day wear meets premium craftsmanship. Step into cloud-like cushioning.',
    filter: 'running',
    image: '/products/new-balance/9060.svg',
    accentColor: 'from-emerald-500 to-teal-600',
  },
];

export const FeaturedCollections = () => {
  return (
    <section className="py-16 lg:py-24 bg-light-lavender" aria-labelledby="collections-heading">
      <div className="container">
        <motion.div
          className="flex items-center justify-between mb-10"
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
              Featured Collections
            </motion.h2>
            <motion.p
              className="section-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Curated selections for every style
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(98, 70, 155, 0.25)' }}
            >
              <Link
                href={`/shop?filter=${collection.filter}`}
                className="group block relative aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-border hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
                aria-label={`Shop ${collection.name}`}
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br bg-[${collection.accentColor}] opacity-10 group-hover:opacity-20 transition-opacity duration-500" />
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <h3 className="font-heading text-xl font-normal text-white mb-2 group-hover:translate-y-[-4px] transition-transform duration-300">
                        {collection.name}
                      </h3>
                      <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                        {collection.description}
                      </p>
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-primary text-sm font-medium rounded-full backdrop-blur-sm">
                        Explore Collection
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
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