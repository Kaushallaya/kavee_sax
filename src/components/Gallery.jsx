import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryImages } from '../data/mock';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredImages =
    filter === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === filter);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            Gallery
          </h2>
          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Moments captured from performances and events
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {['all', 'live', 'dj','wedding','band'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'shadow-lg'
                    : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: filter === category ? '#d4af37' : '#1a1a1a',
                  color: filter === category ? '#0a0a0a' : '#d4af37',
                  border: `2px solid ${filter === category ? '#d4af37' : '#d4af37'}`,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {category === 'all' ? 'All Photos' : category === 'live' ? 'Live Performances' : category === 'dj' ? 'DJ Sessions': 
                category === 'wedding' ? 'Wedding' : 'Breeze Band'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p
                      className="text-white font-medium"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      {image.alt}
                    </p>
                  </div>
                </div>
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(212, 175, 55, 0.3)',
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Close lightbox"
              >
                <X size={24} color="#f5f5f5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} color="#f5f5f5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200"
                aria-label="Next image"
              >
                <ChevronRight size={24} color="#f5f5f5" />
              </button>

              <motion.img
                key={selectedImage.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
