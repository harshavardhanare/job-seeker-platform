import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './jobseeker.css'; // Import external styles

export default function JobSeekerHome() {
  const [jobseekerData, setJobSeekerData] = useState("");

  useEffect(() => {
    // Retrieve job seeker data from local storage
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      // Parse JSON data and set it to state
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData);
    }
  }, []);

  return (
    <motion.div
      className="jobseeker-home-container"
      initial={{ opacity: 0, y: -20 }} // Animation start: hidden, slightly above
      animate={{ opacity: 1, y: 0 }} // Animation end: fully visible, normal position
      transition={{ duration: 0.6 }} // Smooth transition
    >
      {jobseekerData && (
        <motion.div
          className="welcome-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h4>Welcome, {jobseekerData.fullname}! 🎉</h4>
        </motion.div>
      )}
    </motion.div>
  );
}
