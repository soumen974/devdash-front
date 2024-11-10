import React, { useState, useEffect } from 'react';

const EventForm = () => {
  const initialState = {
    eventname: '',
    eventdesc: '',
    startdate: '',
    enddate: '',
  };

  const [eventDetails, setEventDetails] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (successMessage) {
      setIsSuccess(true);
      timeoutId = setTimeout(() => {
        setIsSuccess(false);
        setTimeout(() => {
          setSuccessMessage('');
        }, 300); 
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [successMessage]);

  const handleChange = (e) => {
    setEventDetails({
      ...eventDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    
    if (!eventDetails.eventname || !eventDetails.startdate || !eventDetails.enddate) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/calendar/add-event`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(eventDetails),
        }
      );

      if (response.status === 201) {
        setSuccessMessage('Event added successfully!');
        setEventDetails(initialState);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error adding event. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Event to Google Calendar</h2>

      {errorMessage && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div 
          className={`mb-4 p-2 bg-green-500 text-white rounded transition-opacity duration-300 ${
            isSuccess ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="eventname" className="block text-sm font-medium text-gray-700">
            Event Name
          </label>
          <input
            type="text"
            id="eventname"
            name="eventname"
            value={eventDetails.eventname}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="eventdesc" className="block text-sm font-medium text-gray-700">
            Event Description
          </label>
          <textarea
            id="eventdesc"
            name="eventdesc"
            value={eventDetails.eventdesc}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg shadow-sm"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="startdate" className="block text-sm font-medium text-gray-700">
            Start Date and Time
          </label>
          <input
            type="datetime-local"
            id="startdate"
            name="startdate"
            value={eventDetails.startdate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="enddate" className="block text-sm font-medium text-gray-700">
            End Date and Time
          </label>
          <input
            type="datetime-local"
            id="enddate"
            name="enddate"
            value={eventDetails.enddate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-lg shadow-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;