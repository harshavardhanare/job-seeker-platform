const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Define the schema for Job Applicant model
const jobApplicantSchema = new mongoose.Schema({
    applicantId: {
        type: String,   // Unique identifier for the job applicant
        unique: true,   // Ensures no duplicate applicant IDs
        required: true, // Field is mandatory
        default: () => generateRandomId() // Generates a random applicant ID if not provided
    },
    // This value will be taken from the Job model
    jobid: {
        type: Number,   // Reference to the Job ID
        required: true  // Field is mandatory
    },
    // This value will be taken from the Job Seeker model
    jobseekeremail: {
        type: String,   // Email of the job seeker applying for the job
        required: true  // Field is mandatory
    },
    jobStatus: {
        type: String,   // Status of the job application (e.g., APPLIED, REVIEWED, SELECTED, REJECTED)
        required: true, // Field is mandatory
        default: "APPLIED" // Default status when an applicant applies
    },
    appliedTime: {
        type: String,   
        default: () => moment().tz('Asia/Kolkata').format('DD-MM-YYYY HH:mm:ss A') // Stores the application timestamp in IST
    }
});

// Create the JobApplicant model using the schema
const JobApplicant = mongoose.model('JobApplicant', jobApplicantSchema);

// Function to generate a unique applicant ID with a prefix "J" followed by a random 6-digit number
function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "J" + randomNumber;
}

// Export the JobApplicant model
module.exports = JobApplicant;
