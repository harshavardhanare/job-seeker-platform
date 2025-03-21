import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './jobseeker.css';
import { motion } from 'framer-motion'; // Import Framer Motion for animations

import JobSeekerHome from './JobSeekerHome';
import JobSeekerProfile from './JobSeekerProfile';
import ViewJobsPosted from './ViewJobsPosted';
import ViewAppliedJobs from './ViewAppliedJobs';
import UpdateJSProfile from './UpdateJSProfile';

export default function JobSeekerNavBar() {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem('isJobSeekerLoggedIn');
    localStorage.removeItem('jobseeker');

    navigate('/jobseekerlogin');
    window.location.reload(); // Reload page to clear any session data
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ y: -50 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <ul>
          <li><Link to="/jobseekerhome">Home</Link></li>
          <li className="dropdown">
            <Link>Profile</Link>
            <div className="dropdown-content">
              <Link to="/jobseekerprofile">View Profile</Link>
              <Link to="/updatejobseekerprofile">Update Profile</Link>
            </div>
          </li>
          <li><Link to="/viewjobsposted">View Jobs</Link></li>
          <li><Link to="/viewappliedjobs">Applied Jobs</Link></li>
          <li>
            <motion.button 
              className="logoutButton" 
              onClick={handleLogout}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Logout
            </motion.button>
          </li>
        </ul>
      </motion.nav>

      {/* Routes for different job seeker pages */}
      <Routes>
        <Route path="/jobseekerhome" element={<JobSeekerHome />} exact />
        <Route path="/jobseekerprofile" element={<JobSeekerProfile />} exact />
        <Route path="/updatejobseekerprofile" element={<UpdateJSProfile />} exact />
        <Route path="/viewjobsposted" element={<ViewJobsPosted />} exact />
        <Route path="/viewappliedjobs" element={<ViewAppliedJobs />} exact />
      </Routes>
    </motion.div>
  );
}
