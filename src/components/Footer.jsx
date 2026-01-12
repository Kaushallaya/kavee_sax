import React from 'react';
import { motion } from 'framer-motion';
import { Youtube, Music, Instagram, Facebook, Heart } from 'lucide-react';
import { artistInfo } from '../data/mock';

const Footer = () => {
  const socialLinks = [
    { icon: Youtube, url: artistInfo.socialLinks.youtube, label: 'YouTube' },
    { icon: Music, url: artistInfo.socialLinks.soundcloud, label: 'SoundCloud' },
    { icon: Instagram, url: artistInfo.socialLinks.instagram, label: 'Instagram' },
    { icon: Facebook, url: artistInfo.socialLinks.facebook, label: 'Facebook' },
  ];

  return (
    <footer className="bg-black border-t border-[#d4af37]/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
            >
              {artistInfo.name}
            </h3>
            <p
              className="text-gray-400 mb-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {artistInfo.tagline}
            </p>
            <p
              className="text-sm text-gray-500"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {artistInfo.description}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className="text-lg font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Music', 'Events', 'Gallery', 'Biography', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className="text-lg font-bold mb-4"
              style={{ fontFamily: 'Poppins, sans-serif', color: '#f5c842' }}
            >
              Connect
            </h4>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-all duration-300"
                    style={{ backgroundColor: '#1a1a1a' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#d4af37';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 8px 16px rgba(212, 175, 55, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={social.label}
                  >
                    <Icon size={20} color="#f5f5f5" />
                  </a>
                );
              })}
            </div>
            <div className="space-y-2">
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                For bookings and inquiries:
              </p>
              <a
                href={`mailto:${artistInfo.email}`}
                className="text-[#d4af37] hover:text-[#f5c842] transition-colors duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {artistInfo.email}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-[#d4af37]/20 pt-8 text-center"
        >
          <p
            className="text-sm text-gray-500 flex items-center justify-center"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            © {new Date().getFullYear()} {artistInfo.name}. All rights reserved. Made with
            <Heart size={16} className="mx-1" style={{ color: '#d4af37' }} fill="#d4af37" />
            for music lovers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
