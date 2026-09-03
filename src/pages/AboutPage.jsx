// src/pages/AboutPage.jsx
// ============================================
// ABOUT PAGE - CINEMATIC 3D (LIGHT VERSION)
// ============================================

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  ShoppingBag, Users, Award, TrendingUp, 
  Shield, Truck, Heart, Star, ArrowRight,
  Globe, Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 1.2]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.5]);
  const heroY = useTransform(smoothProgress, [0, 0.2], [0, -80]);

  const stats = [
    { icon: ShoppingBag, value: '10K+', label: 'Products Sold' },
    { icon: Users, value: '5K+', label: 'Happy Customers' },
    { icon: Award, value: '4.8★', label: 'Average Rating' },
    { icon: TrendingUp, value: '50+', label: 'Brands' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your data and transactions are always protected with industry-standard security.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'We partner with reliable logistics to ensure your orders arrive on time.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We\'re here to help 24/7.',
    },
    {
      icon: Star,
      title: 'Quality Products',
      description: 'Every product is handpicked and vetted for quality and value.',
    },
  ];

  const team = [
    {
      name: 'Daniel Ivera',
      role: 'Founder & CEO',
      bio: 'Passionate about building products that make people\'s lives better.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Jane Smith',
      role: 'Head of Design',
      bio: 'Crafting beautiful, intuitive experiences that users love.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Michael Johnson',
      role: 'Lead Developer',
      bio: 'Building scalable, reliable systems that power ShopVerse.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    },
    {
      name: 'Sarah Williams',
      role: 'Customer Success',
      bio: 'Ensuring every customer has a seamless shopping experience.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    },
  ];

  const timeline = [
    {
      year: '2024',
      title: 'The Beginning',
      description: 'ShopVerse was founded with a simple mission: make online shopping easier and more enjoyable for everyone.'
    },
    {
      year: '2025',
      title: 'First Product Launch',
      description: 'We launched our platform with a curated selection of premium products across electronics, fashion, and home categories.'
    },
    {
      year: '2026',
      title: 'Growing Community',
      description: 'Today, ShopVerse serves thousands of happy customers and continues to grow every day.'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-x-hidden">

     {/* ===== HERO - CINEMATIC WITH SHOPPING MALL BACKGROUND ===== */}
<section className="relative h-screen w-full overflow-hidden">
  <motion.div 
    className="absolute inset-0 z-0"
    style={{
      scale: heroScale,
      opacity: heroOpacity,
      y: heroY,
    }}
  >
    <div 
      className="w-full h-full bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1600)',
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
  </motion.div>

  {/* Content - Left aligned on desktop, centered on mobile */}
  <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-16">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="max-w-2xl text-center md:text-left"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
          Building the Future
        </span>
        <span className="block">of E-Commerce</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto md:mx-0 mb-8">
        ShopVerse was born from a simple idea: create a shopping experience that's 
        seamless, secure, and enjoyable for everyone.
      </p>
      <div className="flex flex-wrap justify-center md:justify-start gap-4">
        <Link
          to="/"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
        >
          Shop Now →
        </Link>
        <Link
          to="#mission"
          className="border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  </div>

  {/* Scroll indicator - centered */}
  <motion.div 
    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 text-sm flex flex-col items-center gap-1"
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    <span>Scroll</span>
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </motion.div>
</section>

      {/* ===== MISSION ===== */}
      <section id="mission" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To make shopping simple, secure, and delightful — connecting people 
              with products they love, from brands they trust.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-600">To become the most trusted and loved e-commerce platform in the world.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-purple-50 rounded-2xl p-8 border border-purple-100"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Our Promise</h3>
              <p className="text-gray-600">Quality products, secure payments, and exceptional customer service.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-4"
          >
            What We Stand For
          </motion.h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            These are the principles that guide everything we do at ShopVerse.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 flex items-start gap-4 hover:shadow-md transition"
              >
                <div className="bg-indigo-100 p-3 rounded-full flex-shrink-0">
                  <value.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{value.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAM ===== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-4"
          >
            Meet the Team
          </motion.h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
            The passionate people behind ShopVerse.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="font-bold text-gray-800">{member.name}</h4>
                  <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-800 text-center mb-12"
          >
            Our Story
          </motion.h2>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4 items-start"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {index + 1}
                </div>
                <div>
                  <span className="text-sm text-indigo-600 font-semibold">{item.year}</span>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-8">
            Join thousands of happy customers who have discovered the ShopVerse experience.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}