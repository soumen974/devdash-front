import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkListings = () => {
  const [workListings, setWorkListings] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkListings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/work/workListings`, {
            withCredentials: true,
        });
        setWorkListings(response.data.workListings);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Error fetching work listings');
        } else {
          setError('Error fetching work listings');
        }
      }
    };

    fetchWorkListings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Work Listings</h1>
      {error && <div className="text-red-500">{error}</div>}
      {!error && workListings.length === 0 && <div>No work listings found</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workListings.map((listing, index) => (
          <div key={index} className="bg-white shadow-md rounded px-4 py-6">
            <h2 className="text-xl font-bold mb-2">{listing.task_name}</h2>
            <p className="text-gray-700 mb-2">{listing.task_description}</p>
            <p className="text-sm text-gray-500">Completion Time: {listing.completion_time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkListings;
