import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { upcomingEvents, pastPerformances } from '../data/mock';

const Events = () => {
  return (
    <section id="events" className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Upcoming Events
          </h2>
          <p
            className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Join me at these exciting upcoming performances
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #2b1810 0%, #1a1a1a 100%)',
                  border: '2px solid #d4af37',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 175, 55, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="p-8">
                  {/* Date Badge */}
                  <div
                    className="inline-flex items-center px-4 py-2 rounded-full mb-4"
                    style={{ backgroundColor: '#d4af37', color: '#0a0a0a' }}
                  >
                    <Calendar size={16} className="mr-2" />
                    <span className="font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ fontFamily: 'Poppins, sans-serif', color: '#f5f5f5' }}
                  >
                    {event.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-gray-400">
                      <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" style={{ color: '#ff6b35' }} />
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{event.venue}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock size={18} className="mr-2 flex-shrink-0" style={{ color: '#ff6b35' }} />
                      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{event.time}</span>
                    </div>
                  </div>

                  <p
                    className="text-gray-400 mb-6"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {event.description}
                  </p>

                  <a
                    href={event.ticketLink}
                    className="inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300"
                    style={{
                      backgroundColor: '#d4af37',
                      color: '#0a0a0a',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f5c842';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#d4af37';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Get Tickets
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Past Performances */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Past Performances
          </h2>
          <p
            className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Highlights from recent shows and events
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastPerformances.map((performance, index) => (
              <motion.div
                key={performance.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={performance.image}
                    alt={performance.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
                  >
                    {performance.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className="flex items-center text-gray-300"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <MapPin size={14} className="mr-1" />
                      {performance.venue}
                    </span>
                    <span
                      className="text-gray-400"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {new Date(performance.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
