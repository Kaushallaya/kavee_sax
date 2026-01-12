import React from 'react';
import { motion } from 'framer-motion';
import { Music, Disc, FileMusic, Sparkles } from 'lucide-react';
import { services } from '../data/mock';

const iconMap = {
  music: Music,
  disc: Disc,
  fileMusic: FileMusic,
  sparkles: Sparkles,
};

const Services = () => {
  return (
    <section className="py-20 bg-[#1a1a1a]">
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
            Services
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Professional entertainment for every occasion
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl p-8 transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${service.color}15 0%, #1a1a1a 100%)`,
                  border: `2px solid ${service.color}30`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = service.color;
                  e.currentTarget.style.boxShadow = `0 8px 32px ${service.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${service.color}30`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div
                  className="inline-flex p-4 rounded-full mb-6 transition-all duration-300"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <IconComponent size={32} style={{ color: service.color }} />
                </div>

                {/* Content */}
                <h3
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'Poppins, sans-serif', color: '#f5f5f5' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-gray-400 leading-relaxed"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {service.description}
                </p>

                {/* Decorative element */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ backgroundColor: service.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
