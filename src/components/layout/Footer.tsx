'use client';

import { motion } from 'framer-motion';
import { 
  Twitter, 
  Github, 
  MessageCircle, 
  Mail, 
  ArrowUpRight,
  Globe,
  Shield,
  Book,
  FileText,
  Users,
  Zap,
  Hash
} from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    platform: [
      { label: 'Dashboard', href: '#dashboard', icon: Globe },
      { label: 'Analytics', href: '#analytics', icon: Zap },
      { label: 'Portfolio', href: '#portfolio', icon: Users },
      { label: 'Settings', href: '#settings', icon: Shield },
    ],
    resources: [
      { label: 'Documentation', href: '#docs', icon: Book },
      { label: 'API Reference', href: '#api', icon: FileText },
      { label: 'Whitepaper', href: '#whitepaper', icon: FileText },
      { label: 'Blog', href: '#blog', icon: MessageCircle },
    ],
    community: [
      { label: 'Discord', href: '#discord', icon: Hash },
      { label: 'Twitter', href: '#twitter', icon: Twitter },
      { label: 'GitHub', href: '#github', icon: Github },
      { label: 'Telegram', href: '#telegram', icon: MessageCircle },
    ],
    legal: [
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Disclaimer', href: '#disclaimer' },
    ],
  };

  const socialLinks = [
    { label: 'Twitter', href: '#twitter', icon: Twitter },
    { label: 'Discord', href: '#discord', icon: Hash },
    { label: 'GitHub', href: '#github', icon: Github },
    { label: 'Telegram', href: '#telegram', icon: MessageCircle },
  ];

  return (
    <footer className="relative bg-gods-dark border-t border-gods-border">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-gods-dark via-gods-dark to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.05),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-gods-primary to-gods-green rounded-lg flex items-center justify-center">
                    <span className="text-gods-dark font-bold text-lg">G</span>
                  </div>
                  <span className="text-2xl font-bold text-white">GODS</span>
                </div>
                <p className="text-gods-secondary text-sm mb-6 max-w-md">
                  The most advanced DeFi platform for arbitrage trading, MEV protection, and yield optimization. 
                  Built with cutting-edge technology for maximum efficiency and security.
                </p>
                
                {/* Newsletter Signup */}
                <div className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gods-card border border-gods-border rounded-lg text-white placeholder-gods-secondary focus:ring-2 focus:ring-gods-primary focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gods-primary text-gods-dark font-semibold rounded-lg hover:bg-gods-green transition-all duration-200 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Platform Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-white font-semibold mb-4">Platform</h3>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="flex items-center gap-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Resources Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="flex items-center gap-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-auto" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Community Links */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-white font-semibold mb-4">Community</h3>
                <ul className="space-y-3">
                  {footerLinks.community.map((link, index) => (
                    <li key={index}>
                      <motion.a
                        href={link.href}
                        className="flex items-center gap-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
                        whileHover={{ x: 4 }}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 ml-auto" />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-8 border-t border-gods-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gods-secondary text-sm"
            >
              © 2024 GODS DeFi. All rights reserved.
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center gap-4"
            >
              {footerLinks.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gods-secondary hover:text-gods-primary transition-colors duration-200 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-2 text-gods-secondary hover:text-gods-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;