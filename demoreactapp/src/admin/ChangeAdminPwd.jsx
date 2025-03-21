import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangeAdminPwd() {
  const [adminData, setAdminData] = useState("");

  // Retrieve admin data from localStorage when the component mounts
  useEffect(() => {
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
    }
  }, []);

  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:2032/changeadminpwd', { 
        ...formData, 
        "username": adminData.username 
      });

      if (response.data != null) {
        // Clear admin session and redirect to login
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('admin');
        navigate('/adminlogin');
        window.location.reload();
      } else {
        setMessage("Old Password is Incorrect");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.response.data);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="change-password-container"
    >
      {/* Page Title */}
      <h3 align="center"><u>Change Password</u></h3>

      {/* Display Messages */}
      {message ? (
        <motion.h4 align="center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {message}
        </motion.h4>
      ) : (
        <motion.h4 align="center" style={{ color: "red" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {error}
        </motion.h4>
      )}

      {/* Password Change Form */}
      <motion.form onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Old Password Field */}
        <motion.div whileFocus={{ scale: 1.05 }}>
          <label>Old Password</label>
          <input type="password" id="oldpassword" value={formData.oldpassword} onChange={handleChange} required />
        </motion.div>

        {/* New Password Field */}
        <motion.div whileFocus={{ scale: 1.05 }}>
          <label>New Password</label>
          <input type="password" id="newpassword" value={formData.newpassword} onChange={handleChange} required />
        </motion.div>

        {/* Submit Button */}
        <motion.input 
          type="submit" 
          value="Change" 
          className="button"
          whileHover={{ scale: 1.1, backgroundColor: "#4CAF50" }}
          whileTap={{ scale: 0.9 }}
        />
      </motion.form>
    </motion.div>
  );
}
