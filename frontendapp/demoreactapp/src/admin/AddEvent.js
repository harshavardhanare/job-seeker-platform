import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import config from '../config';
import styled from 'styled-components';

const FormContainer = styled(motion.div)`
  max-width: 500px;
  margin: auto;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled(motion.button)`
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    background: #0056b3;
  }
`;

export default function AddEvent() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    date: '',
    location: '',
    file: null
  });
 
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('file', formData.file);

      const response = await axios.post(`${config.url}/createevent`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setFormData({ category: '', title: '', description: '', date: '', location: '', file: null });
        fileInputRef.current.value = '';
      }
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <h3 align="center" style={{ color: '#007bff' }}><u>Add Event</u></h3>
      {message ? <h4 align="center" style={{ color: 'green' }}>{message}</h4> : null}
      {error ? <h4 align="center" style={{ color: 'red' }}>{error}</h4> : null}
      <FormContainer
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>Category</label>
          <Input type="text" id="category" value={formData.category} onChange={handleChange} required />
          <label>Title</label>
          <Input type="text" id="title" value={formData.title} onChange={handleChange} required />
          <label>Description</label>
          <TextArea id="description" value={formData.description} onChange={handleChange} required />
          <label>Date</label>
          <Input type="date" id="date" value={formData.date} onChange={handleChange} required />
          <label>Location</label>
          <Input type="text" id="location" value={formData.location} onChange={handleChange} required />
          <label>Image</label>
          <Input type="file" id="file" ref={fileInputRef} onChange={handleFileChange} required />
          <Button type="submit" whileHover={{ scale: 1.1 }}>Add</Button>
        </form>
      </FormContainer>
    </motion.div>
  );
}
