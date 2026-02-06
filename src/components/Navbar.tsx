import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import Logo from './Logo';
import { useDemo } from '../contexts/DemoContext';

const navLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Documentation', href: '/documentation' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrolled(scrollTop > 20);
      setScrollProgress(Math.min(scrollPercent, 100));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const { startTracking } = useDemo();

  const handleGetStarted = () => {
    startTracking();
    navigate('/demo');
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto relative transition-all duration-500 overflow-hidden ${scrolled
            ? 'w-full max-w-[90%] lg:max-w-6xl rounded-[2.5rem] bg-orange-50/90 backdrop-blur-3xl shadow-[0_8px_32px_rgba(249,115,22,0.15)] border border-white/40'
            : 'w-full max-w-7xl rounded-none bg-transparent'
            }`}
        >
          {/* Purple Gradient Overlay - Intensifies with scroll */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-500/10 to-purple-600/0 pointer-events-none"
            style={{
              opacity: scrollProgress / 100,
            }}
          />

          {/* Animated Glow Line for scrolled state */}
          <AnimatePresence>
            {scrolled && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
                  style={{ opacity: scrollProgress / 150 }}
                />
              </>
            )}
          </AnimatePresence>

          <div className="flex h-16 lg:h-20">
            {/* 30% Section - Logo */}
            <div className={`flex-[0_0_auto] w-[20%] lg:w-[30%] flex items-center px-6 lg:px-8 transition-colors duration-500 ${scrolled ? 'border-r border-orange-200/20 bg-white/30' : ''}`}>
              <Link to="/" className="group flex-shrink-0" onClick={() => window.scrollTo(0, 0)}>
                <Logo />
              </Link>
            </div>

            {/* 70% Section - Navigation */}
            <div className="flex-[1_1_auto] w-[80%] lg:w-[70%] flex items-center justify-end lg:justify-between px-6 lg:px-8">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 bg-white/40 p-1.5 rounded-full border border-white/40 backdrop-blur-md shadow-sm">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="relative px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full overflow-hidden group"
                  >
                    <span className={`relative z-10 transition-colors duration-300 ${location.pathname === link.href ? 'text-purple-700' : 'text-gray-600 group-hover:text-purple-600'
                      }`}>
                      {link.label}
                    </span>
                    {location.pathname === link.href && (
                      <motion.div
                        layoutId="navTab"
                        className="absolute inset-0 bg-white shadow-sm"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </div>

              {/* Title / Mobile Spacer (when not scrolled or mobile) */}
              <div className="lg:hidden flex-1" />

              {/* Right Side Actions */}
              <div className="flex items-center gap-3 lg:gap-4">
                {/* CTA Button */}
                <div className="hidden lg:flex items-center">
                  <motion.button
                    onClick={handleGetStarted}
                    className="group relative px-6 py-2.5 bg-gray-900 text-white rounded-full font-bold overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-500"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <motion.button
                  className={`lg:hidden p-3 rounded-full transition-all duration-300 ${scrolled ? 'bg-purple-50 text-purple-600 shadow-sm' : 'bg-white/20 backdrop-blur-md text-gray-800 border border-white/30'
                    }`}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                      >
                        <X className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ scale: 0, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: -90 }}
                      >
                        <Menu className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay - Curvy Design */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-950/40 backdrop-blur-xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%', borderRadius: '100px 0 0 100px' }}
              animate={{ x: 0, borderRadius: '40px 0 0 40px' }}
              exit={{ x: '100%', borderRadius: '100px 0 0 100px' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-2 bottom-2 w-[85%] max-w-md bg-white shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-white/50 overflow-hidden"
            >
              <div className="flex flex-col h-full bg-gradient-to-b from-purple-50/50 to-white">
                <div className="p-8 flex items-center justify-between border-b border-purple-100/50">
                  <Logo />
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-gray-100 text-gray-500"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="flex-1 px-6 py-8 overflow-auto">
                  <div className="space-y-3">
                    {navLinks.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          className={`group flex items-center justify-between px-6 py-4 rounded-[1.5rem] transition-all duration-300 ${location.pathname === link.href
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                            : 'bg-white hover:bg-purple-50 text-gray-700 hover:text-purple-600'
                            }`}
                        >
                          <span className="text-lg font-bold">{link.label}</span>
                          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${location.pathname === link.href ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                            }`} />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={handleGetStarted}
                    className="w-full py-5 bg-gray-900 text-white rounded-full font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-gray-950/20"
                  >
                    Get Started Free
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                  <p className="text-center text-sm font-medium text-gray-400">
                    Join 50k+ developers tracking smarter.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
