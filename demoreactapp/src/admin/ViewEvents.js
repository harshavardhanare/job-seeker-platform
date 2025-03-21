import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './admin.css';
import config from '../config';

export default function ViewEvents() {
  const [events, setEvents] = useState([]);

  // Function to fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${config.url}/viewevents`);
      setEvents(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
    >
      {/* Page Title */}
      <h1 align="center">Events</h1>

      {/* Events Table */}
      <motion.table 
        border={1} 
        align="center" 
        className="styled-table"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }} // Delayed animation for rows
              >
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{event.description}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>
                  {/* Display image or link based on file type */}
                  {event.file.endsWith('.jpg') || event.file.endsWith('.jpeg') || event.file.endsWith('.png') ? (
                    <motion.img 
                      src={`${config.url}/eventimage/${event.file}`} 
                      alt="Event" 
                      className="event-image"
                      whileHover={{ scale: 1.1 }}
                    />
                  ) : (
                    <a href={`${config.url}/eventimage/${event.file}`} className="event-link">Click Here</a>
                  )}
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" align="center">No events found</td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}
