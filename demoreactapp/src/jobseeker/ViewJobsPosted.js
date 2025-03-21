import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jobseeker.css';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

export default function ViewJobsPosted() 
{
  const [jobseekerData, setJobSeekerData] = useState("");

  useEffect(() => {
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData)
    }
  }, []);

  const [jobs, setJobs] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const fetchJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:2032/viewjobsbyjobseeker/`);
      setJobs(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchJobs();
  }, []); // Added dependency array to avoid infinite re-renders

  const applyJob = async (jobid, jobseekeremail) => {
    try 
    {
      const response = await axios.post('http://localhost:2032/applyjob', { jobid, jobseekeremail });
      fetchJobs();
      setMessage(response.data);
      setError('');
    } 
    catch (error) 
    {
      setError(error.response.data);
      setMessage('');
    }
  }
  
  return (
    <motion.div 
      className="table-container"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h3>Posted Jobs</h3>
      {
        message ? <h4 align="center" style={{ color: "green" }}>{message}</h4> : <h4 align="center" style={{ color: "red" }}>{error}</h4>
      }
      <motion.table 
        className="job-table mx-auto" 
        align='center'
        initial={{ y: -20 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <thead>
          <tr>
            <th>JOB ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Deadline</th>
            <th>Posted By</th>
            <th>Posted Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job, index) => (
              <motion.tr 
                key={index} 
                whileHover={{ scale: 1.02 }}
              >
                <td>{job.jobid}</td>
                <td>{job.title}</td>
                <td>{job.company}</td>
                <td>{job.location}</td>
                <td>{job.salary}</td>
                <td>{job.deadline}</td>
                <td>{job.recruiter.fullname}</td>
                <td>{job.postedtime}</td>
                <td>
                  <motion.button 
                    className='button' 
                    onClick={() => applyJob(job.jobid, jobseekerData.email)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Apply
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
