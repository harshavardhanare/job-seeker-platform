import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

export default function DeleteJobSeeker() {
  const [jobseekers, setJobSeekers] = useState([]);

  // Function to fetch job seekers from the server
  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get("https://job-seeker-platform3.onrender.com/viewjobseekers");
      setJobSeekers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch job seekers when the component mounts
  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Function to delete a job seeker
  const deleteJobSeeker = async (email) => {
    try {
      await axios.delete(`https://job-seeker-platform3.onrender.com/deletejobseeker/${email}`);
      fetchJobSeekers(); // Refresh the job seeker list after deletion
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center' }}
    >
      {/* Page Title */}
      <h1>Job Seekers</h1>

      {/* Job Seekers Table */}
      <motion.table 
        border={1} 
        align="center" 
        style={{ width: 'auto', height: 'auto' }} 
        id='customers'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>Location</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobseekers) && jobseekers.length > 0 ? (
            jobseekers.map((jobseeker, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} // Delayed animation for rows
              >
                <td>{jobseeker.fullname}</td>
                <td>{jobseeker.gender}</td>
                <td>{jobseeker.dateofbirth}</td>
                <td>{jobseeker.email}</td>
                <td>{jobseeker.location}</td>
                <td>{jobseeker.contact}</td>
                <td>
                  <motion.button 
                    onClick={() => deleteJobSeeker(jobseeker.email)} 
                    className='button'
                    whileHover={{ scale: 1.1, backgroundColor: "#ff4d4d" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Delete
                  </motion.button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
