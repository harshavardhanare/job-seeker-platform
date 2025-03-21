import React, { useState } from 'react';
import './jobseeker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importing Framer Motion for animations

export default function JobSeekerLogin({ onJobSeekerLogin }) {
  // State to store form data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State for login messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2032/checkjobseekerlogin', formData);
      if (response.data != null) {
        onJobSeekerLogin();
        localStorage.setItem('jobseeker', JSON.stringify(response.data));
        navigate("/jobseekerhome");
      } else {
        setMessage("Login Failed");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="login-container"
    >
      <h3 align="center"><u>Job Seeker Login</u></h3>
      {
        message ? <h4 align="center" className="success-message">{message}</h4> : <h4 align="center" className="error-message">{error}</h4>
      }
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ scale: 0.9 }} 
        animate={{ scale: 1 }} 
        transition={{ duration: 0.3 }}
        className="login-form"
      >
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
        >
          <label>Email</label>
          <input type="email" id="email" value={formData.email} onChange={handleChange} required />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.4 }}
        >
          <label>Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} required />
        </motion.div>
        <motion.button 
          type="submit" 
          className="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
   