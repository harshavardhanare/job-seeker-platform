import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeleteRecruiter() {
  const [recruiters, setRecruiters] = useState([]);

  const fetchRecruiters = async () => {
    try {
      const response = await axios.get("http://localhost:2032/viewrecruiters");
      setRecruiters(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const deleteRecruiter = async (username) => {
    try {
      await axios.delete(`http://localhost:2032/deleterecruiter/${username}`);
      fetchRecruiters();
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Recruiters</h1>
      
      <table border={1} align="center" style={{ width: 'auto', height: 'auto' }} id='customers'>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Company</th>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {Array.isArray(recruiters) && recruiters.length > 0 ? (
    recruiters.map((recruiter, index) => (
      <tr key={index}>
        <td>{recruiter.fullname}</td>
        <td>{recruiter.gender}</td>
        <td>{recruiter.dateofbirth}</td>
        <td>{recruiter.company}</td>
        <td>{recruiter.username}</td>
        <td>{recruiter.email}</td>
        <td>{recruiter.address}</td>
        <td>{recruiter.contact}</td>
        <td>
          <button onClick={() => deleteRecruiter(recruiter.username)} className='button'>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">Data Not Found</td>
    </tr>
  )}
</tbody>
        </table>
    </div>
  );
}
