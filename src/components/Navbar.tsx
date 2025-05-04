import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

const SkeletonBox = ({ width, height }: { width: string; height: string }) => (
  <div
    className="bg-gray-700/30 rounded-md animate-pulse"
    style={{ width, height }}
  />
);

const Navbar = ({ className }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  const isScrolled = scrollPosition > 20;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-indigo-950/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {loading ? (
            <SkeletonBox width="120px" height="32px" />
          ) : (
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="text-2xl font-bold text-white">
                PHANINDRA<span className="text-violet-400">.</span>
              </Link>
            </motion.div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-10">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonBox key={i} width="80px" height="20px" />
                ))
              : navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="nav-link"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    whileHover={{ y: -3 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {!loading && (
              <button
                onClick={toggleMenu}
                className="text-white hover:text-violet-400 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {!loading && isOpen && (
        <div className="md:hidden block animate-fade-in">
          <div className="px-2 pt-2 pb-4 bg-indigo-950/90 backdrop-blur-md space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="block px-3 py-4 text-center text-lg font-medium hover:text-violet-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                whileTap={{ scale: 0.97 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
