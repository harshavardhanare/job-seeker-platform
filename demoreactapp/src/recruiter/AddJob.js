import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './recruiter.css'; // Import CSS file for styling

export default function AddJob() {
  // State for storing recruiter data
  const [recruiterData, setRecruiterData] = useState("");

  // Fetch recruiter data from localStorage
  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  // State for job form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    roles: [], 
    location: '',
    salary: '',
    jobtype: '', 
    educationqualifications: '', 
    requirements: '',
    email: '',
    deadline: '',
    recruiter:''
  });

  // Message and error states
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle multiple selection input (roles)
  const handleRolesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, roles: selectedOptions });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to add a job
      const response = await axios.post('http://localhost:2032/addjob', { 
        ...formData, 
        recruiter: recruiterData, 
        company: recruiterData.company 
      });

      // Reset form and show success message
      if (response.status === 200) {
        setFormData({
          title: '',
          description: '',
          company: '',
          roles: [],
          location: '',
          salary: '',
          jobtype: '',
          educationqualifications: '',
          requirements: '',
          email: '',
          deadline: '',
          recruiter: ''
        });
      }
      setMessage(response.data);
      setError('');
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <motion.div
      className="add-job-container"
      initial={{ opacity: 0, y: -50 }} // Animation starts with element hidden
      animate={{ opacity: 1, y: 0 }} // Smoothly fades in
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h3 className="title"><u>Post a New Job</u></h3>

      {/* Message or error display */}
      {message ? <h4 className="message">{message}</h4> : <h4 className="error">{error}</h4>}

      <motion.form
        className="job-form"
        onSubmit={handleSubmit}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <label>Title</label>
        <input type="text" id="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea id="description" value={formData.description} onChange={handleChange} required />

        <label>Roles</label>
        <select id="roles" value={formData.roles} onChange={handleRolesChange} multiple required>
          <option value="Software Engineer">Software Engineer</option>
          <option value="System Engineer">System Engineer</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Testing">Testing</option>
          <option value="Others">Others</option>
        </select>

        <label>Job Type</label>
        <select id="jobtype" value={formData.jobtype} onChange={handleChange} required>
          <option value="">---Select---</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Location</label>
        <input type="text" id="location" value={formData.location} onChange={handleChange} required />

        <label>Salary</label>
        <input type="number" id="salary" value={formData.salary} onChange={handleChange} required />

        <label>Education Qualifications</label>
        <textarea id="educationqualifications" value={formData.educationqualifications} onChange={handleChange} required />

        <label>Requirements (Skills)</label>
        <textarea id="requirements" value={formData.requirements} onChange={handleChange} required />

        <label>Contact Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required />

        <label>Deadline</label>
        <input type="date" id="deadline" value={formData.deadline} onChange={handleChange} required />

        {/* Animated Button */}
        <motion.button 
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Post Job
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
