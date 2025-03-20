const mongoose = require('mongoose');

// Define schema for Event model
const eventSchema = new mongoose.Schema({
  category: {
    type: String,    // Category of the event (e.g., conference, workshop)
    required: true,  // Field is mandatory
  },
  title: {
    type: String,    // Title of the event
    required: true,  // Field is mandatory
  },
  description: {
    type: String,    // Brief description of the event
    required: true,  // Field is mandatory
  },
  date: {
    type: String,    // Date of the event (consider using Date type instead of String)
    required: true,  // Field is mandatory
  },
  location: {
    type: String,    // Location where the event will take place
    required: true,  // Field is mandatory
  },
  file: {
    type: String,    // URL to a file (e.g., event flyer, brochure)
    required: true,  // Field is mandatory
  },
});

// Create Event model using the schema
const event = mongoose.model('Event', eventSchema);

// Export the Event model
module.exports = event;
