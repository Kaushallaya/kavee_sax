import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { bioContent, artistInfo } from '../data/mock';

const Biography = () => {
  return (
    <section id="biography" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Biography
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            The journey of a passionate saxophonist
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://customer-assets.emergentagent.com/job_cd9d964f-e711-4da7-8ed3-bc7a1f6bed03/artifacts/0d8ouz8t_IMG_6985.JPG"
                alt={artistInfo.fullName}
                className="w-full h-full object-cover"
              />
              {/* Decorative frame */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  border: '4px solid #d4af37',
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
                }}
              />
            </div>

            {/* Decorative element */}
            <div
              className="absolute -bottom-8 -right-8 w-64 h-64 rounded-full blur-3xl opacity-20"
              style={{ backgroundColor: '#d4af37' }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
            >
              {artistInfo.fullName}
            </h3>
            <p
              className="text-xl mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#ff6b35' }}
            >
              {artistInfo.tagline}
            </p>

            <div className="space-y-4 mb-8">
              <p
                className="text-gray-300 leading-relaxed"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {bioContent.short}
              </p>
              {bioContent.full.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="text-gray-400 leading-relaxed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Download EPK Button */}
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300"
              style={{
                backgroundColor: '#d4af37',
                color: '#0a0a0a',
                fontFamily: 'Poppins, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5c842';
                e.target.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d4af37';
                e.target.style.boxShadow = 'none';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <Download size={20} className="mr-2" />
              Download Press Kit (EPK)
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Biography;
