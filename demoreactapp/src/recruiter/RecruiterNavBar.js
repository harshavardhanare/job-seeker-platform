import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './recruiter.css';
import RecruiterHome from './RecruiterHome';
import RecruiterProfile from './RecruiterProfile';
import AddJob from './AddJob';
import ViewJobs from './ViewJobs';
import ViewJobApplicants from './ViewJobApplicants';

export default function RecruiterNavBar() {
  const navigate = useNavigate();

  // Handle logout function
  const handleLogout = () => {
    localStorage.removeItem('isRecruiterLoggedIn'); // Remove login state
    localStorage.removeItem('recruiter'); // Remove recruiter data
    navigate('/recruiterlogin'); // Redirect to login page
    window.location.reload(); // Reload page to clear state
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }} // Fade-in and slide-down animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Navigation Bar */}
      <motion.nav
        className="navbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ul className="nav-links">
          {/* Home Link */}
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/recruiterhome">Home</Link>
          </motion.li>

          {/* Recruiter Profile Link */}
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/recruiterprofile">Recruiter Profile</Link>
          </motion.li>

          {/* Jobs Dropdown Menu */}
          <motion.li className="dropdown" whileHover={{ scale: 1.1 }}>
            <Link>Jobs</Link>
            <motion.div 
              className="dropdown-content"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/addjob">Post a Job</Link>
              <Link to="/viewjobs">View Jobs</Link>
            </motion.div>
          </motion.li>

          {/* Job Applicants Link */}
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/viewjobapplicants">Job Applicants</Link>
          </motion.li>

          {/* Logout Button with Animation */}
          <motion.li>
            <motion.button
              className="logoutButton"
              onClick={handleLogout}
              whileHover={{ scale: 1.1, backgroundColor: "#d9534f" }} // Change color on hover
              whileTap={{ scale: 0.9 }} // Press animation
            >
              Logout
            </motion.button>
          </motion.li>
        </ul>
      </motion.nav>

      {/* Routes for different pages */}
      <Routes>
        <Route path="/recruiterhome" element={<RecruiterHome />} exact />
        <Route path="/recruiterprofile" element={<RecruiterProfile />} exact />
        <Route path="/addjob" element={<AddJob />} exact />
        <Route path="/viewjobs" element={<ViewJobs />} exact />
        <Route path="/viewjobapplicants" element={<ViewJobApplicants />} exact />
      </Routes>
    </motion.div>
  );
}
