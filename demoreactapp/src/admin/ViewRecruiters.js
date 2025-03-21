import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './admin.css'; // Import external styles

export default function ViewRecruiters() {
  const [recruiters, setRecruiters] = useState([]);

  // Function to fetch recruiters from the server
  const fetchRecruiters = async () => {
    try {
      const response = await axios.get('http://localhost:2032/viewrecruiters');
      setRecruiters(response.data);
    } catch (error) {
      console.error("Error fetching recruiters:", error.message);
    }
  };

  // Fetch recruiters when the component mounts
  useEffect(() => {
    fetchRecruiters();
  }, []);

  // Function to delete a recruiter after confirmation
  const deleteRecruiter = async (username) => {
    if (window.confirm("Are you sure you want to delete this recruiter?")) {
      try {
        await axios.delete(`https://job-seeker-platform3.onrender.com/deleterecruiter/${username}`);
        fetchRecruiters(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting recruiter:", error.message);
      }
    }
  };

  return (
    <motion.div
      className="recruiters-container"
      initial={{ opacity: 0, y: -20 }} // Animation start: hidden, slightly above
      animate={{ opacity: 1, y: 0 }} // Animation end: fully visible, normal position
      transition={{ duration: 0.6 }} // Smooth transition
    >
      <h1 align="center">Recruiters</h1>

      <motion.table
        className="recruiters-table"
        border={1}
        align="center"
        style={{ width: '90%', height: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
                initial={{ opacity: 0, x: -10 }} // Start hidden and shifted left
                animate={{ opacity: 1, x: 0 }} // Move to normal position with fade-in
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
                whileHover={{ scale: 1.02 }} // Slight scale increase on hover
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
                  <button onClick={() => deleteRecruiter(recruiter.username)} className='delete-button'>Delete</button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" align="center">No Recruiters Found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
