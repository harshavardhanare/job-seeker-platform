// Importing recruiter controller which contains all recruiter-related functions
const recruitercontroller = require("../controllers/recruitercontroller");

const express = require("express");
const recruiterrouter = express.Router();

// Route to check recruiter login credentials
recruiterrouter.post("/checkrecruiterlogin", recruitercontroller.checkrecruiterlogin);

// Route to add a new job posting
recruiterrouter.post("/addjob", recruitercontroller.addjob);

// Route to fetch all jobs posted by a specific recruiter
recruiterrouter.get("/viewjobs/:runame", recruitercontroller.viewjobs);

// Route to fetch job applicants for jobs posted by a recruiter
recruiterrouter.get("/viewjobapplicants/:runame", recruitercontroller.viewjobapplicants);

// Route to update the job application status of an applicant
recruiterrouter.post("/changejobstatus", recruitercontroller.changejobstatus);

// Exporting the router module to be used in other parts of the application
module.exports = recruiterrouter;
