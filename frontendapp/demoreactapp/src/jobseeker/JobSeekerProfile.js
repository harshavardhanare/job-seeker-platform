import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './jobseeker.css'; // Import external styles

export default function JobSeekerProfile() {
  const [jobseekerData, setJobSeekerData] = useState(null);

  useEffect(() => {
    // Retrieve job seeker data from local storage
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData);
    }
  }, []);

  return (
    jobseekerData ? (
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, scale: 0.9 }} // Animation start: hidden & slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Animation end: fully visible & normal size
        transition={{ duration: 0.6, ease: 'easeOut' }} // Smooth transition
      >
        <h2 className="profile-title">Job Seeker Profile</h2>
        <p><strong>Full Name:</strong> {jobseekerData.fullname}</p>
        <p><strong>Gender:</strong> {jobseekerData.gender}</p>
        <p><strong>Date of Birth:</strong> {jobseekerData.dateofbirth}</p>
        <p><strong>Email:</strong> {jobseekerData.email}</p>
        <p><strong>Location:</strong> {jobseekerData.location}</p>
        <p><strong>Contact:</strong> {jobseekerData.contact}</p>
      </motion.div>
    ) : (
      <motion.p
        className="no-data"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        No Job Seeker Data Found
      </motion.p>
    )
  );
}
