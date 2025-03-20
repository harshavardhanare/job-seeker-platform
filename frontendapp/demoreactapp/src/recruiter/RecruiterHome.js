import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RecruiterHome() {
  const [recruiterData, setRecruiterData] = useState("");

  useEffect(() => {
    const storedRecruiterData = localStorage.getItem('recruiter');
    if (storedRecruiterData) {
      const parsedRecruiterData = JSON.parse(storedRecruiterData);
      setRecruiterData(parsedRecruiterData);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {recruiterData && (
        <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
          <motion.h4 whileHover={{ scale: 1.1 }}>Welcome {recruiterData.fullname}</motion.h4>
        </motion.div>
      )}
    </motion.div>
  );
}
