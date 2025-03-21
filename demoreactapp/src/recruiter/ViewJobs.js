import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './recruiter.css';

export default function ViewJobs() {
  // State to store recruiter data
  const [recruiterData, setRecruiterData] = useState("");
  const [jobs, setJobs] = useState([]);

  // Fetch recruiter data from local storage
  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  // Fetch jobs posted by the recruiter
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`https://job-seeker-platform3.onrender.com/${recruiterData.username}`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <motion.div 
      className="table-container"
      initial={{ opacity: 0, y: -20 }} // Fade-in and slide-down effect
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h3>Posted Jobs</h3>

      {/* Animated table for jobs */}
      <motion.table 
        className="job-table mx-auto"
        align='center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <thead>
          <tr>
            <th>JOB ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Deadline</th>
            <th>Posted Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.tr 
                key={index}
                whileHover={{ scale: 1.02 }} // Slight hover effect for rows
                transition={{ duration: 0.2 }}
              >
                <td>{job.jobid}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.deadline}</td>
                <td>{job.postedtime}</td>
              </motion.tr>
            ))
          ) : (
            <motion.tr 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <td colSpan="7">No Jobs Found</td>
            </motion.tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
