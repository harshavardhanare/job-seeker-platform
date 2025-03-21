import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';

// Styled components for better UI
const Container = styled(motion.div)`
  text-align: center;
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
  width: 250px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

export default function AdminHome() {
  const [adminData, setAdminData] = useState("");
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Retrieve admin data from local storage
    const storedAdminData = localStorage.getItem('admin');
    if (storedAdminData) {
      const parsedAdminData = JSON.parse(storedAdminData);
      setAdminData(parsedAdminData);
      fetchCounts();
    }
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await axios.get(`http://localhost:2032/analysis`);
      setCounts(response.data);
    } catch (error) {
      setError('Failed to fetch counts');
    }
  };

  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {adminData && (
        <>
          <h4>Welcome, {adminData.username}</h4>
          {counts ? (
            <Row>
              {Object.entries(counts).map(([key, value]) => (
                <Card key={key} whileHover={{ scale: 1.05 }}>
                  <h3>{key.replace(/([A-Z])/g, ' $1')}</h3>
                  <p>{value}</p>
                </Card>
              ))}
            </Row>
          ) : (
            <p>Loading counts...</p>
          )}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </Container>
  );
}
