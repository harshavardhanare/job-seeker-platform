import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './jobseeker.css';

export default function UpdateJSProfile() {
  const [jobseekerData, setJobSeekerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialJobseekerData, setInitialJobseekerData] = useState({});

  useEffect(() => {
    // Retrieve job seeker data from local storage
    const storedJobSeekerData = localStorage.getItem('jobseeker');
    if (storedJobSeekerData) {
      const parsedJobSeekerData = JSON.parse(storedJobSeekerData);
      setJobSeekerData(parsedJobSeekerData);
      setInitialJobseekerData(parsedJobSeekerData);
    }
  }, []);

  // Handle input field changes
  const handleChange = (e) => {
    setJobSeekerData({ ...jobseekerData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in jobseekerData) {
        if (jobseekerData[key] !== initialJobseekerData[key] && initialJobseekerData[key] !== '') {
          updatedData[key] = jobseekerData[key];
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        updatedData.email = jobseekerData.email;
        const response = await axios.put('https://job-seeker-platform3.onrender.com/updatejobseekerprofile', updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`https://job-seeker-platform3.onrender.com/jobseekerprofile/${jobseekerData.email}`);
        localStorage.setItem("jobseeker", JSON.stringify(res.data));
      } else {
        setMessage("No Changes in Job Seeker Profile");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <motion.div
      className="update-profile-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <h3 className="profile-title">Update Profile</h3>
      {message ? <h4 className="success-message">{message}</h4> : <h4 className="error-message">{error}</h4>}

      <motion.form
        onSubmit={handleSubmit}
        className="update-profile-form"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" id="fullname" value={jobseekerData.fullname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input type="text" id="gender" value={jobseekerData.gender} readOnly />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={jobseekerData.dateofbirth} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" id="email" value={jobseekerData.email} readOnly />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" id="password" value={jobseekerData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input type="text" id="location" value={jobseekerData.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input type="number" id="contact" value={jobseekerData.contact} onChange={handleChange} required />
        </div>
        <motion.button
          type="submit"
          className="update-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Update
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
