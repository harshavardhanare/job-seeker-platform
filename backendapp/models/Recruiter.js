const mongoose = require("mongoose")

// Define schema for the Recruiter model
const recruiterschema = new mongoose.Schema({
    fullname: {
      type: String, // Full name of the recruiter
      required: true,
    },
    gender: {
      type: String, // Gender of the recruiter
      required: true,
      enum: ['male', 'female', 'others'] // Restricts gender values to these options
    },
    dateofbirth: {
      type: String, // Date of birth in string format (consider using Date type for better validation)
      required: true
    },
    company: {
        type: String, // Company name where the recruiter works
        required: true
      },
    username: {
        type: String, // Unique username for the recruiter
        required: true,
        unique: true
      },  
    email: {
      type: String, // Unique email ID of the recruiter
      required: true,
      unique: true
    },
    password: {
      type: String, // Password for authentication
      required: true,
      default: "klef1234" // Default password assigned at account creation
    },
    address: {
      type: String, // Address of the recruiter
      required: true 
    },
    contact: {
        type: String, // Contact number of the recruiter
        required: true,
        unique: true // Ensures no duplicate contact numbers exist
      },
});

// Create a Recruiter model using the schema
const recruiter = mongoose.model('recruiter', recruiterschema);

// Export the Recruiter model
module.exports = recruiter;
