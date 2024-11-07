// components/Hero.tsx
"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRocket, FaCheckCircle, FaUsers } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-24 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
      {/* Overlay for subtle background enhancement */}
      <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white">
            Streamline Your Code Reviews
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300">
            Collaborate seamlessly with your team, provide feedback, and improve code quality effortlessly.
          </p>

          {/* Features Icons */}
          <div className="mt-8 flex justify-center lg:justify-start space-x-6">
            <div className="flex items-center space-x-2">
              <FaRocket className="text-blue-500" size={24} />
              <span className="text-gray-300">Fast Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCheckCircle className="text-green-500" size={24} />
              <span className="text-gray-300">Reliable</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUsers className="text-purple-500" size={24} />
              <span className="text-gray-300">Team Collaboration</span>
            </div>
          </div>

          {/* Call to Action */}
          <motion.button
            className="mt-10 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-300 font-semibold text-lg flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Handle button click, e.g., navigate to signup
            }}
          >
            <span>Get Started</span>
            <FiArrowRight className="h-5 w-5" />
          </motion.button>


        </motion.div>

        {/* Image Content */}
        <motion.div
          className="mt-12 lg:mt-0 lg:ml-12 w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <div className="relative w-full max-w-md">
            <Image
              src="/hero-illustration.png" // Replace with a high-quality illustration or image
              alt="Hero Illustration"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;
