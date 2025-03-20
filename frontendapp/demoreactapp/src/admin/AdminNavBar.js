import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import './admin.css';

import AdminHome from './AdminHome';
import ViewJobSeekers from './ViewJobSeekers';
import AddRecruiter from './AddRecruiter';
import ViewRecruiters from './ViewRecruiters';
import ChangeAdminPwd from './ChangeAdminPwd';
import ViewJobSeekerProfile from './ViewJobSeekerProfile';
import AddEvent from './AddEvent';
import ViewEvents from './ViewEvents';

export default function AdminNavBar() {
  const navigate = useNavigate();

  // Function to handle admin logout
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin');
    window.location.reload();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {/* Navigation Menu */}
      <nav>
        <ul>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/adminhome">Home</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/changeadminpwd">Change Password</Link>
          </motion.li>

          {/* Job Seeker Dropdown */}
          <motion.li className="dropdown" whileHover={{ scale: 1.05 }}>
            <Link>Job Seeker</Link>
            <motion.div className="dropdown-content" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/viewjobseekers">View Job Seekers</Link>
            </motion.div>
          </motion.li>

          {/* Recruiter Dropdown */}
          <motion.li className="dropdown" whileHover={{ scale: 1.05 }}>
            <Link>Recruiter</Link>
            <motion.div className="dropdown-content" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/addrecruiter">Add Recruiter</Link>
              <Link to="/viewrecruiters">View Recruiters</Link>
            </motion.div>
          </motion.li>

          {/* Events Dropdown */}
          <motion.li className="dropdown" whileHover={{ scale: 1.05 }}>
            <Link>Events</Link>
            <motion.div className="dropdown-content" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Link to="/createevent">Add Event</Link>
              <Link to="/viewevents">View Events</Link>
            </motion.div>
          </motion.li>

          {/* Logout Button */}
          <motion.li>
            <motion.button 
              className="logoutButton" 
              onClick={handleLogout}
              whileHover={{ scale: 1.1, backgroundColor: "#d9534f" }}
              whileTap={{ scale: 0.9 }}>
              Logout
            </motion.button>
          </motion.li>
        </ul>
      </nav>

      {/* Define Routes for Admin Pages */}
      <Routes>
        <Route path="/adminhome" element={<AdminHome />} exact />
        <Route path="/viewjobseekers" element={<ViewJobSeekers />} exact />
        <Route path="/addrecruiter" element={<AddRecruiter />} exact />
        <Route path="/viewrecruiters" element={<ViewRecruiters />} exact />
        <Route path="/changeadminpwd" element={<ChangeAdminPwd />} exact />
        <Route path="/viewjobseekerprofile/:email" element={<ViewJobSeekerProfile />} exact />
        <Route path="/createevent" element={<AddEvent />} exact />
        <Route path="/viewevents" element={<ViewEvents />} exact />
      </Routes>
    </motion.div>
  );
}
