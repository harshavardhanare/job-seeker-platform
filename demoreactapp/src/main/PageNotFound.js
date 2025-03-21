import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import NotFoundImage from './notfound.png';
import './style.css';

export default function PageNotFound() {
  return (
    <motion.div
      className="not-found-container"
      initial={{ opacity: 0, y: -50 }}  // Starts hidden and slightly above
      animate={{ opacity: 1, y: 0 }}   // Smoothly fades in and moves down
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h1 className="not-found-title">Oops! Page Not Found</h1>

      {/* Animated Image */}
      <motion.img
        src={NotFoundImage}
        alt="Page Not Found"
        className="not-found-image"
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Back to Home Button */}
      <motion.a
        href="/"
        className="back-home-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Go to Home
      </motion.a>
    </motion.div>
  );
}
