import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './recruiter.css';

export default function ViewJobApplicants() {
  // State to store recruiter data
  const [recruiterData, setRecruiterData] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [jobApplicants, setJobApplicants] = useState([]);

  // Fetch recruiter data from local storage when component mounts
  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  // Fetch job applicants for the recruiter
  const fetchJobApplicants = async () => {
    try {
      const response = await axios.get(`http://localhost:2032/viewjobapplicants/${recruiterData.username}`);
      setJobApplicants(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data || "Error fetching job applicants");
    }
  };

  // Fetch job applicants when the component mounts
  useEffect(() => {
    fetchJobApplicants();
  }, []); 

  // Handle status change for job applicants
  const handleStatusChange = async (applicantId, status) => {
    try {
      const response = await axios.post('http://localhost:2032/changejobstatus', { applicantId, status });
      fetchJobApplicants(); // Refresh job applicants after status change
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data || "Error updating job status");
      setMessage('');
    }
  };

  return (
    <motion.div 
      className="table-container"
      initial={{ opacity: 0, y: -20 }} // Fade-in and slide down effect
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3>Job Applicants</h3>

      {message ? (
        <motion.h4 
          align="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {message}
        </motion.h4>
      ) : (
        <motion.h4 
          align="center" 
          style={{ color: "red" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.h4>
      )}

      {/* Animated table for job applicants */}
      <motion.table 
        className="job-table mx-auto"
        align='center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <thead>
          <tr>
            <th>Applicant ID</th>
            <th>Job ID</th>
            <th>Status</th>
            <th>Applied Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobApplicants) && jobApplicants.length > 0 ? (
            jobApplicants.map((applicant, index) => (
              <motion.tr 
                key={index} 
                whileHover={{ scale: 1.02 }} // Slight hover effect for rows
              >
                <td>{applicant.applicantId}</td>
                <td>{applicant.jobid}</td>
                <td 
                  style={{ 
                    backgroundColor: applicant.jobStatus === 'SELECTED' ? 'green' : 'red', 
                    color: "white", 
                    fontWeight: "bold" 
                  }}
                >
                  {applicant.jobStatus === 'SELECTED' ? 'SELECTED' : 'REJECTED'}
                </td>
                <td>{applicant.appliedTime}</td>
                <td>
                  {/* Buttons with smooth hover effects */}
                  <motion.button 
                    className='selected' 
                    onClick={() => handleStatusChange(applicant.applicantId, "SELECTED")}
                    whileHover={{ scale: 1.1 }}
                  >
                    SELECTED
                  </motion.button>
                  <motion.button 
                    className='rejected' 
                    onClick={() => handleStatusChange(applicant.applicantId, "REJECTED")}
                    whileHover={{ scale: 1.1 }}
                  >
                    REJECTED
                  </motion.button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Job Applications found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
