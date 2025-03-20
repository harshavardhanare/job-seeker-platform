const mongoose = require("mongoose")

// Define schema for Admin model
const adminschema = new mongoose.Schema({
    username: { 
      type: String,   // Admin username
      required: true, // Field is mandatory
      unique: true    // Username must be unique
    },
    password: { 
      type: String,   // Admin password
      required: true  // Field is mandatory
    }
  });

// Create Admin model using the schema
const admin = mongoose.model('Admin', adminschema);

// Export the Admin model
module.exports = admin;
