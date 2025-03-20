import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled Components for better styling
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f4f4f4;
`;

const Form = styled(motion.form)`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #0056b3;
  }
`;

export default function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post('http://localhost:2032/checkadminlogin', formData);

      if (response.data) {
        onAdminLogin();
        localStorage.setItem('admin', JSON.stringify(response.data));
        navigate("/adminhome");
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <motion.h3 align="center" initial={{ y: -10 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
        <u>Admin Login</u>
      </motion.h3>

      {message && <h4 align="center" style={{ color: 'green' }}>{message}</h4>}
      {error && <h4 align="center" style={{ color: 'red' }}>{error}</h4>}

      <Form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <label>Username</label>
        <Input type="text" name="username" value={formData.username} onChange={handleChange} required />

        <label>Password</label>
        <Input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <Button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          Login
        </Button>
      </Form>
    </Container>
  );
}
