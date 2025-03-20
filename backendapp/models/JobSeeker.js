const mongoose = require("mongoose")

// Define the schema for Job Seeker model
const jobseekerschema = new mongoose.Schema({
    fullname: {
      type: String, // Full name of the job seeker
      required: true
    },
    gender: {
      type: String, // Gender selection
      required: true,
      enum: ['male', 'female', 'others'] // Restricts values to predefined options
    },
    dateofbirth: {
      type: String, // Date of birth in string format (consider Date type for better validation)
      required: true
    },
    email: {
      type: String, // Unique email of the job seeker
      required: true,
      unique: true // Ensures no duplicate emails exist in the database
    },
    password: {
      type: String, // Password for authentication
      required: true
    },
    location: {
      type: String, // Current location of the job seeker
      required: true
    },
    contact: {
        type: String, // Contact number
        required: true,
        unique: true // Ensures no duplicate contact numbers exist
    },
});

// Create a JobSeeker model using the schema
const jobseeker = mongoose.model('jobseeker', jobseekerschema);

// Export the JobSeeker model
module.exports = jobseeker;
