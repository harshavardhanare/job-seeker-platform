import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeleteJobSeeker() {
  const [jobseekers, setJobSeekers] = useState([]);

  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get("http://localhost:2032/viewjobseekers");
      setJobSeekers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  const deleteJobSeeker = async (email) => {
    try {
      await axios.delete(`http://localhost:2032/deletejobseeker/${email}`);
      fetchJobSeekers();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Job Seekers</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }} id='customers'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(jobseekers) && jobseekers.length > 0 ? (
    jobseekers.map((jobseeker, index) => (
      <tr key={index}>
        <td>{jobseeker.fullname}</td>
        <td>{jobseeker.gender}</td>
        <td>{jobseeker.dateofbirth}</td>
        <td>{jobseeker.email}</td>
        <td>{jobseeker.location}</td>
        <td>{jobseeker.contact}</td>
        <td>
          <button onClick={() => deleteJobSeeker(jobseeker.email)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}
