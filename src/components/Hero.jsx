import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroSlides, artistInfo } from '../data/mock';
import Saxophone3D from './Saxophone3D';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentSlide];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
          style={{ backgroundColor: slide.bgColor }}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover opacity-100"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${slide.bgColor} 0%, rgba(0,0,0,0.8) 40%)`,
              }}
            />
          </div>

          {/* Content Grid */}
          <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center z-10 pt-32 pb-20 lg:pt-20 lg:pb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8 lg:mb-12"
              >
                <h2
                  className="text-lg sm:text-xl mb-3"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: slide.textColor,
                    opacity: 0.9,
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  className="text-base sm:text-lg mb-6 max-w-md"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5f5',
                    opacity: 0.7,
                  }}
                >
                  {slide.description}
                </p>
              </motion.div>

              {/* Artist Branding - Fixed positioning to avoid header overlap */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="mt-auto"
              >
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-4"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    color: slide.textColor,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {artistInfo.name}
                </h1>
                <p
                  className="text-xl sm:text-2xl lg:text-3xl font-light"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    color: '#f5f5f5',
                    letterSpacing: '0.1em',
                  }}
                >
                  {artistInfo.tagline}
                </p>
              </motion.div>
            </div>

            {/* Right Side - 3D Saxophone */}
            <div className="hidden lg:flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-full h-full"
              >
                {/* <Saxophone3D /> */}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#d4af37]/80 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} color="#f5f5f5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-[#d4af37]/80 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} color="#f5f5f5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentSlide ? 1 : -1);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#d4af37] w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
