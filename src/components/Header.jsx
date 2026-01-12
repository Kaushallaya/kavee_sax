import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { artistInfo } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Music', path: '#music' },
    { name: 'Events', path: '#events' },
    { name: 'Gallery', path: '#gallery' },
    { name: 'Biography', path: '#biography' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (e, path) => {
    e.preventDefault();
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#d4af37' }}
          >
            {artistInfo.name}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => scrollToSection(e, link.path)}
                className="text-sm font-medium text-gray-300 hover:text-[#d4af37] transition-colors duration-200"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-6 py-2 rounded-full font-medium text-sm transition-all duration-300"
              style={{
                backgroundColor: '#d4af37',
                color: '#0a0a0a',
                fontFamily: 'Poppins, sans-serif',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f5c842';
                e.target.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#d4af37';
                e.target.style.boxShadow = 'none';
              }}
            >
              Book Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#d4af37] p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/98 backdrop-blur-sm absolute top-20 left-0 right-0 border-t border-[#d4af37]/20">
            <div className="flex flex-col space-y-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => scrollToSection(e, link.path)}
                  className="text-base font-medium text-gray-300 hover:text-[#d4af37] transition-colors duration-200"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-6 py-3 rounded-full font-medium text-sm text-center transition-all duration-300"
                style={{
                  backgroundColor: '#d4af37',
                  color: '#0a0a0a',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Book Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
