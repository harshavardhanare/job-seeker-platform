import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './admin.css';

export default function ViewJobSeekers() {
  const navigate = useNavigate();
  const [jobseekers, setJobSeekers] = useState([]);

  // Function to fetch job seekers from the server
  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get('http://localhost:2032/viewjobseekers');
      setJobSeekers(response.data);
    } catch (error) {
      console.error("Error fetching job seekers:", error.message);
    }
  };

  // Fetch job seekers when the component mounts
  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Function to delete a job seeker by email
  const deleteJobSeeker = async (email) => {
    try {
      await axios.delete(`http://localhost:2032/deletejobseeker/${email}`);
      fetchJobSeekers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting job seeker:", error.message);
    }
  };

  // Function to navigate to the job seeker's profile page
  const viewJobSeeker = (email) => {
    navigate(`/viewjobseekerprofile/${email}`);
  };

  return (
    <motion.div
      className="jobseekers-container"
      initial={{ opacity: 0, y: -20 }} // Animation start: invisible, slightly above
      animate={{ opacity: 1, y: 0 }} // Animation end: fully visible, normal position
      transition={{ duration: 0.6 }} // Smooth transition
    >
      <h1 align="center">Job Seekers</h1>

      <motion.table
        className="jobseekers-table"
        border={1}
        align="center"
        style={{ width: 'auto', height: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
                initial={{ opacity: 0, x: -10 }} // Start hidden and shifted left
                animate={{ opacity: 1, x: 0 }} // Move to normal position with fade-in
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered effect
                whileHover={{ scale: 1.02 }} // Slight scale increase on hover
              >
                <td>{jobseeker.fullname}</td>
                <td>{jobseeker.gender}</td>
                <td>{jobseeker.dateofbirth}</td>
                <td>{jobseeker.email}</td>
                <td>{jobseeker.location}</td>
                <td>{jobseeker.contact}</td>
                <td>
                  <button onClick={() => viewJobSeeker(jobseeker.email)} className='view-button'>View</button>
                  <button onClick={() => deleteJobSeeker(jobseeker.email)} className='delete-button'>Delete</button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" align="center">No Job Seekers Found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
