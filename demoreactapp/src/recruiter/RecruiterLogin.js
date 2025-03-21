import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './recruiter.css'; // Import CSS file for styling

export default function RecruiterLogin({ onRecruiterLogin }) {
  // State for storing user login details
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // State for displaying messages and errors
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // React Router navigation hook
  const navigate = useNavigate();

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:2032/checkrecruiterlogin', formData);

      // If login is successful
      if (response.data != null) {
        onRecruiterLogin(); // Call the login callback function
        localStorage.setItem('recruiter', JSON.stringify(response.data)); // Store recruiter data in localStorage
        navigate("/recruiterhome"); // Redirect to recruiter home page
      } else {
        setMessage("Login Failed"); // Display failure message
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.message); // Display error message
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }} // Fade-in and slide-down effect
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Title with animation */}
      <motion.h3 
        align="center"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <u>Recruiter Login</u>
      </motion.h3>

      {/* Display login messages or errors */}
      {message ? (
        <motion.h4 className="message" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          {message}
        </motion.h4>
      ) : (
        <motion.h4 className="error" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
          {error}
        </motion.h4>
      )}

      {/* Login Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="login-form"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Username Field */}
        <motion.div initial={{ x: -20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        {/* Password Field */}
        <motion.div initial={{ x: 20 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </motion.div>

        {/* Animated Login Button */}
        <motion.button 
          type="submit"
          className="login-button"
          whileHover={{ scale: 1.1, backgroundColor: "#218838" }} // Button hover effect
          whileTap={{ scale: 0.9 }} // Button click effect
        >
          Login
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
