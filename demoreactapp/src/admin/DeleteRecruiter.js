import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

export default function DeleteRecruiter() {
  const [recruiters, setRecruiters] = useState([]);

  // Function to fetch recruiters from the server
  const fetchRecruiters = async () => {
    try {
      const response = await axios.get("https://job-seeker-platform3.onrender.com/viewrecruiters");
      setRecruiters(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch recruiters when the component mounts
  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Function to delete a recruiter
  const deleteRecruiter = async (username) => {
    try {
      await axios.delete(`https://job-seeker-platform3.onrender.com/deleterecruiter/${username}`);
      fetchRecruiters(); // Refresh the recruiters list after deletion
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
      <h1>Recruiters</h1>

      {/* Recruiters Table */}
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
            <th>Company</th>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(recruiters) && recruiters.length > 0 ? (
            recruiters.map((recruiter, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} // Delayed animation for rows
              >
                <td>{recruiter.fullname}</td>
                <td>{recruiter.gender}</td>
                <td>{recruiter.dateofbirth}</td>
                <td>{recruiter.company}</td>
                <td>{recruiter.username}</td>
                <td>{recruiter.email}</td>
                <td>{recruiter.address}</td>
                <td>{recruiter.contact}</td>
                <td>
                  <motion.button 
                    onClick={() => deleteRecruiter(recruiter.username)} 
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
              <td colSpan="9">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
