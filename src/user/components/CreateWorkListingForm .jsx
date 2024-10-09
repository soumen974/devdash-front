import React, { useState } from 'react';
import axios from 'axios';

const CreateWorkListingForm = () => {
  const [formData, setFormData] = useState({
    task_name: '',
    task_description: '',
    completion_time: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {

      const response = await axios.post(`${process.env.REACT_APP_API}/work/createWorkListing`,
        formData,
        {
            withCredentials: true,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Server error');
      } else {
        setError('Error submitting the form');
      }
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Create Work Listing</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task_name">
            Task Name
          </label>
          <input
            id="task_name"
            name="task_name"
            type="text"
            value={formData.task_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="task_description">
            Task Description
          </label>
          <textarea
            id="task_description"
            name="task_description"
            value={formData.task_description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="completion_time">
            Completion Time
          </label>
          <input
            id="completion_time"
            name="completion_time"
            type="text"
            value={formData.completion_time}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkListingForm;
