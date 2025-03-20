// Importing the admin controller, which contains all admin-related functions
const admincontroller = require("../controllers/admincontroller");

const express = require("express");
const adminrouter = express.Router();

// Route to view all job seekers
adminrouter.get("/viewjobseekers", admincontroller.viewjobseekers);

// Route to delete a job seeker by email
adminrouter.delete("/deletejobseeker/:email", admincontroller.deletejobseeker);

// Route to check admin login credentials
adminrouter.post("/checkadminlogin", admincontroller.checkadminlogin);

// Route to add a new recruiter
adminrouter.post("/addrecruiter", admincontroller.addrecruiter);

// Route to view all recruiters
adminrouter.get("/viewrecruiters", admincontroller.viewrecruiters);

// Route to delete a recruiter by username
adminrouter.delete("/deleterecruiter/:username", admincontroller.deleterecruiter);

// Route to change the admin password
adminrouter.put("/changeadminpwd", admincontroller.changeadminpwd);

// Route to get analysis data (e.g., statistics, reports)
adminrouter.get("/analysis", admincontroller.analysis);

// Route to view a job seeker's profile by email
adminrouter.get("/viewjobseekerprofile/:email", admincontroller.viewjobseekerprofile);

// Routes for uploading and displaying events with images

// Route to create a new event
adminrouter.post("/createevent", admincontroller.createevent);

// Route to view all events
adminrouter.get("/viewevents", admincontroller.viewevents);

// Route to fetch an event image by filename
adminrouter.get("/eventimage/:filename", admincontroller.eventimage);

// Exporting the router module to be used in other parts of the application
module.exports = adminrouter;
