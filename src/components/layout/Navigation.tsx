'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Settings, 
  MessageCircle,
  Bell,
  User,
  ChevronDown,
  Wallet,
  LogOut,
  ExternalLink
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNotifications, setActiveNotifications] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'Features', href: '#features', icon: BarChart3 },
    { label: 'Dashboard', href: '#dashboard', icon: Settings },
    { label: 'Community', href: '#community', icon: MessageCircle },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gods-dark bg-opacity-90 backdrop-blur-xl border-b border-gods-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gods-primary to-gods-green rounded-lg flex items-center justify-center">
                <span className="text-gods-dark font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-white">GODS</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
            >
              <Bell className="w-5 h-5" />
              {activeNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gods-green rounded-full flex items-center justify-center text-xs text-gods-dark font-bold">
                  {activeNotifications}
                </span>
              )}
            </motion.button>

            {/* Connect Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gods-primary text-gods-dark font-semibold rounded-lg hover:bg-gods-green transition-all duration-200"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </motion.button>

            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gods-card transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gods-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gods-dark" />
                </div>
                <ChevronDown className="w-4 h-4 text-gods-secondary" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gods-dark bg-opacity-95 backdrop-blur-xl border-t border-gods-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg text-gods-secondary hover:text-gods-primary hover:bg-gods-card transition-all duration-200"
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </motion.a>
              ))}
              
              <div className="pt-4 border-t border-gods-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gods-primary text-gods-dark font-semibold rounded-lg hover:bg-gods-green transition-all duration-200"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;