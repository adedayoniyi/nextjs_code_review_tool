
// src/components/Hero.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRocket, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-b from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full bg-[url('/path-to-star-pattern.png')] opacity-20"></div> {/* Replace with star pattern image */}
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Text Content */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-100 leading-tight">
            Streamline Your Code Reviews
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            Collaborate seamlessly with your team, provide feedback, and improve code quality effortlessly.
          </p>

          {/* Features Icons */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center space-x-2">
              <FaRocket className="text-indigo-400" size={28} />
              <span className="text-gray-300 text-lg">Fast Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-400" size={28} />
              <span className="text-gray-300 text-lg">Reliable</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-purple-400" size={28} />
              <span className="text-gray-300 text-lg">Team Collaboration</span>
            </div>
          </div>

          {/* Call to Action */}
          <motion.button
            className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 font-semibold text-xl mx-auto flex items-center space-x-3"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Handle button click, e.g., navigate to signup
            }}
          >
            <span>Get Started</span>
            <FiArrowRight className="h-6 w-6" />
          </motion.button>
        </motion.div>

        {/* Image Content */}
        <motion.div
          className="mt-16 w-full flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="w-full max-w-3xl rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <Image
              src="/hero-illustration.png" // Replace with a high-quality illustration or image
              alt="Hero Illustration"
              width={1200}
              height={800}
              className="rounded-xl border border-gray-700 shadow-[0px_0px_30px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
