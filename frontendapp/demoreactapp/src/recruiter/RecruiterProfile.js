import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './recruiter.css';

export default function RecruiterProfile() {
  const [recruiterData, setRecruiterData] = useState(null);

  // Fetch recruiter data from localStorage when component mounts
  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  return (
    recruiterData ? (
      // Animated profile card with fade-in effect
      <motion.div 
        className='profile-card'
        initial={{ opacity: 0, scale: 0.9 }} // Start invisible and slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Fade-in and scale to normal size
        transition={{ duration: 0.7, ease: "easeOut" }} // Smooth transition
      >
        <motion.p whileHover={{ scale: 1.05 }}><strong>Full Name:</strong> {recruiterData.fullname}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Gender:</strong> {recruiterData.gender}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Date of Birth:</strong> {recruiterData.dateofbirth}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Company:</strong> {recruiterData.company}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Email:</strong> {recruiterData.email}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Address:</strong> {recruiterData.address}</motion.p>
        <motion.p whileHover={{ scale: 1.05 }}><strong>Contact:</strong> {recruiterData.contact}</motion.p>
      </motion.div>
    ) : (
      // If no recruiter data found, show a message with fade-in effect
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        No Recruiter Data Found
      </motion.p>
    )
  );
}
