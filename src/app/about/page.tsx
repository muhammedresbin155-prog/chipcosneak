'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FeaturedCollections } from '@/components/layout/FeaturedCollections';
import { Footer } from '@/components/layout/Footer';

export default function AboutPage() {
  return (
    <>
      <section className="relative hero-gradient overflow-hidden min-h-[60vh] flex items-center" aria-labelledby="about-hero-heading">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        
        <div className="container relative py-20 lg:py-32">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 tracking-wider uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              OUR STORY
            </motion.span>
            
            <motion.h1
              id="about-hero-heading"
              className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight mb-6 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              BORN FROM THE<br />
              STREETS. BUILT FOR<br />
              THE CULTURE.
            </motion.h1>
            
            <motion.p
              className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              CHIPCOSNEAKS started with a simple belief: everyone deserves to express themselves through what they wear on their feet.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link href="/shop">
                <Button size="lg" icon="arrow-right" iconPosition="right">
                  SHOP NOW
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 via-purple-50 to-white">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <svg className="mx-auto w-32 h-32 text-primary/20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L21 21M12 3v13.5m0 0l-4.5-4.5M12 16.5l4.5-4.5M3.75 3.75h16.5a2.25 2.25 0 012.25 2.25v16.5a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 20.25V3.75A2.25 2.25 0 013.75 1.5z" />
                      </svg>
                      <p className="text-muted text-lg max-w-sm mx-auto">Authentic streetwear culture meets premium footwear craftsmanship</p>
                    </div>
                  </div>
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
                BRAND STORY
              </motion.span>
              <motion.h2
                id="brand-story-heading"
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-dark-text mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                From the Streets,<br />For the Culture
              </motion.h2>
              <motion.p
                className="text-muted mb-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Founded by a collective of sneakerheads, designers, and street culture enthusiasts, CHIPCOSNEAKS set out to create a destination that bridges the gap between performance and style. We believe that what you wear on your feet isn't just about function—it's a statement of identity.
              </motion.p>
              <motion.p
                className="text-muted mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Every brand we carry, every design we showcase, is chosen with intention. From the iconic Timberland yellow boot that defined a generation, to the latest limited drops that push boundaries—we curate for those who understand that footwear is culture.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/shop">
                  <Button variant="primary">Explore Our Collection</Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-light-lavender" aria-labelledby="philosophy-heading">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-4 tracking-wider uppercase"
            >
              OUR PHILOSOPHY
            </motion.span>
            <motion.h2
              id="philosophy-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-dark-text mb-4"
            >
              Three Pillars.<br />One Vision.
            </motion.h2>
            <motion.p
              className="text-muted leading-relaxed"
            >
              Everything we do at CHIPCOSNEAKS is guided by three core principles that define who we are and what we stand for.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Authenticity',
                description: 'We only stock genuine, authorized products from brands we trust. No replicas. No compromises. Every pair tells a real story.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                title: 'Community',
                description: 'Built by sneakerheads, for sneakerheads. We celebrate the culture, the history, and the people who make this world what it is.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 19a2 2 0 01-2-2V7a2 2 0 014 0v10a2 2 0 01-2 2zM5 7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7z" />
                  </svg>
                ),
                title: 'Quality',
                description: 'Premium materials, expert craftsmanship, and rigorous standards. We curate products that last—on your feet and in your rotation.'
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="text-center p-8 bg-white rounded-2xl border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6">
                  {pillar.icon}
                </div>
                <h3 className="font-heading text-xl font-medium text-dark-text mb-3">{pillar.title}</h3>
                <p className="text-muted leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-labelledby="journey-heading">
        <div className="container">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              className="inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium mb-4 tracking-wider uppercase"
            >
              OUR JOURNEY
            </motion.span>
            <motion.h2
              id="journey-heading"
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-dark-text mb-4"
            >
              Milestones That<br />Define Us
            </motion.h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block" />
            
            <div className="space-y-12">
              {[
                { year: '2024', title: 'The Beginning', description: 'CHIPCOSNEAKS launches with a curated selection of 50+ premium sneaker models from the world\'s most respected brands.' },
                { year: '2024', title: 'Community Growth', description: 'Reached 10,000+ members in our community. Launched exclusive drops and member-only access to limited editions.' },
                { year: '2025', title: 'Global Expansion', description: 'Expanded shipping to 12 countries. Partnered with Timberland, Nike, and adidas for exclusive collaborative releases.' },
                { year: '2025', title: 'Flagship Experience', description: 'Opened our digital flagship with immersive 3D product views, virtual try-on, and personalized style recommendations.' },
              ].map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className={`relative flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="relative flex-shrink-0 w-24 md:w-32 text-center">
                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block -translate-x-1/2" />
                    <div className="relative z-10">
                      <div className="w-4 h-4 rounded-full bg-primary border-4 border-white absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:-translate-y-1/2 hidden md:block" />
                      <span className="font-heading text-2xl md:text-3xl font-bold text-primary">{milestone.year}</span>
                    </div>
                  </div>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right md:pr-8' : 'md:pl-8'} md:w-1/2`}>
                    <div className="bg-light-lavender rounded-2xl p-6 md:p-8 border border-border">
                      <h3 className="font-heading text-xl font-medium text-dark-text mb-2">{milestone.title}</h3>
                      <p className="text-muted leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-dark-text" aria-labelledby="cta-heading">
        <div className="container">
          <motion.div
            className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-purple-700 to-primary text-center p-12 md:p-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            <div className="relative max-w-2xl mx-auto">
              <motion.span
                className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-sm font-medium mb-6 tracking-wider uppercase"
              >
                JOIN THE CULTURE
              </motion.span>
              <motion.h2
                id="cta-heading"
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-4"
              >
                Ready to Step Up<br />Your Rotation?
              </motion.h2>
              <motion.p
                className="text-white/80 mb-8 leading-relaxed"
              >
                Discover the latest drops, exclusive collaborations, and timeless classics. Your next grail is waiting.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/shop">
                  <Button size="lg" className="w-full sm:w-auto" icon="arrow-right" iconPosition="right">
                    SHOP NOW
                  </Button>
                </Link>
                <Link href="/shop?filter=new">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    NEW ARRIVALS
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturedCollections />
      <Footer />
    </>
  );
}