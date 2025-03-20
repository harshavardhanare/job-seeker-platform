const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Define the schema for Job model
const jobschema = new mongoose.Schema({
    jobid: {
        type: Number,   // Unique job ID
        unique: true,   // Ensures no duplicate job IDs
        required: true, // Job ID is mandatory
        default: () => generateRandomId() // Generates a random job ID if not provided
    },
    title: {
        type: String,   // Job title
        required: true  // Field is mandatory
    },
    description: {
        type: String,   // Job description
        required: true  // Field is mandatory
    },
    company: {
        type: String,   // Name of the company
        required: true  // Field is mandatory
    },
    roles: {
        type: [String], // List of roles and responsibilities
        required: true  // Field is mandatory
    },
    location: {
        type: String,   // Job location
        required: true  // Field is mandatory
    },
    salary: {
        type: Number,   // Salary offered for the job
        required: true, // Field is mandatory
        validate: {
            validator: function(value) {
              return value >= 1000; // Salary must be at least 1000
            },
            message: 'Salary must be at least 1000'
          }
    },
    jobtype: { 
        type: String,   // Job type (e.g., Full-time, Part-time, Remote)
        required: true  // Field is mandatory
    },
    educationqualifications: { 
        type: String,   // Required educational qualifications
        required: true  // Field is mandatory
    },
    requirements: {
        type: String,   // Additional job requirements
        required: true  // Field is mandatory
    },
    email: {
        type: String,   // Recruiter's email for job applications
        required: true  // Field is mandatory
    },
    deadline: {
        type: String,   // Application deadline for the job
        required: true  // Field is mandatory
    },
    postedtime: {
        type: String,   
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A') // Stores the job posting timestamp in IST
    },
    recruiter: {
        type: Object,   // Recruiter details (username, company, etc.)
        required: true  // Field is mandatory
    }
});

// Create the Job model using the schema
const job = mongoose.model('Job', jobschema);

// Function to generate a random 6-digit job ID
function generateRandomId() {
    return Math.floor(Math.random() * 900000) + 100000;
}

// Export the Job model
module.exports = job;
