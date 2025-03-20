import React from "react";
import { motion } from "framer-motion";
import "./style.css";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="home-container"
    >
      {[
        { title: "Admin", items: ["Admin Login", "Change Password", "Add Recruiter", "View Recruiters", "View Job Seekers", "Delete Job Seeker"] },
        { title: "Recruiter", items: ["Recruiter Login", "Post a New Job", "View Posted Jobs", "View Job Applicants", "Change Job Status"] },
        { title: "Job Seeker", items: ["Registration", "Job Seeker Login", "View Profile", "Update Profile", "Apply for a Job", "View Applied Jobs", "Check Job Status"] },
      ].map((section, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
          className="section-card"
        >
          <h3>{section.title}</h3>
          <ul>
            {section.items.map((item, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.1, color: "#4f46e5" }}
                className="list-item"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
}
