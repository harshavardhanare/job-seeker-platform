// Importing job seeker controller which contains all job seeker-related functions
const jobseekercontroller = require("../controllers/jobseekercontroller");

const express = require("express");
const jobseekerrouter = express.Router();

// Route to insert a new job seeker into the database
jobseekerrouter.post("/insertjobseeker", jobseekercontroller.insertjobseeker);

// Route to check job seeker login credentials
jobseekerrouter.post("/checkjobseekerlogin", jobseekercontroller.checkjobseekerlogin);

// Route to update the job seeker's profile information
jobseekerrouter.put("/updatejobseekerprofile", jobseekercontroller.updatejobseekerprofile);

// Route to fetch the job seeker's profile details using their email
jobseekerrouter.get("/jobseekerprofile/:email", jobseekercontroller.jobseekerprofile);

// Route to fetch all available job postings for job seekers
jobseekerrouter.get("/viewjobsbyjobseeker", jobseekercontroller.viewjobsbyjobseeker);

// Route to apply for a job
jobseekerrouter.post("/applyjob", jobseekercontroller.applyjob);

// Route to fetch jobs that the job seeker has already applied for
jobseekerrouter.get("/appliedjobs/:email", jobseekercontroller.appliedjobs);

// Exporting the router module to be used in other parts of the application
module.exports = jobseekerrouter;
