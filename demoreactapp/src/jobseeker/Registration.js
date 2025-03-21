import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

export default function Registration() {
  // State to hold form data
  const [formData, setFormData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  // State to hold success or error messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handles changes in form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Converts input text to uppercase on key up event
  const changetext = (e) => {
    const txt = e.target.value.toUpperCase();
    e.target.value = txt;
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2032/insertjobseeker', formData);
      if (response.status === 200) {
        // Reset form fields on successful submission
        setFormData({
          fullname: '',
          gender: '',
          dateofbirth: '',
          email: '',
          password: '',
          location: '',
          contact: ''
        });
      }
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <h3 align="center"><u>Job Seeker Registration</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{ color: "red" }}>{error}</h4>}

      <motion.form onSubmit={handleSubmit} initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <div>
          <label>Full Name</label>
          <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} onKeyUp={changetext} required />
        </div>
        <div>
          <label>Gender</label>
          <select id="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div>
          <label>Date of Birth</label>
          <input type="date" id="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Location</label>
          <input type="text" id="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div>
          <label>Contact</label>
          <input type="number" id="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <motion.button 
          type="submit" 
          whileHover={{ scale: 1.1 }} 
          whileTap={{ scale: 0.9 }}
        >
          Register
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
