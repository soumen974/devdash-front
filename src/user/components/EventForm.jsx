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
    <div className="">
      <div className="w-full max-w-lg p-6 rounded-2xl shadow-xl bg-[#2A2A3D] border border-[#3E3E4E]">
        <h2 className="text-3xl font-bold mb-6 text-[#FF5F85] text-center bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">Add Event to Google Calendar</h2>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-[#FF5F85]/20 border border-[#FF5F85]/30 text-[#FF5F85] text-sm font-medium animate-fadeIn">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className={`mb-4 p-3 rounded-lg bg-[#28A745]/20 border border-[#28A745]/30 text-[#28A745] text-sm font-medium animate-fadeIn ${isSuccess ? 'opacity-100' : 'opacity-0'}`}>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventname" className="block text-sm font-medium text-[#B5B5C3]">Event Name</label>
            <input
              type="text"
              id="eventname"
              name="eventname"
              value={eventDetails.eventname}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-lg bg-[#3E3E4E] text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D] focus:border-[#FF5F85] transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="eventdesc" className="block text-sm font-medium text-[#B5B5C3]">Event Description</label>
            <textarea
              id="eventdesc"
              name="eventdesc"
              value={eventDetails.eventdesc}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-lg bg-[#3E3E4E] text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D] focus:border-[#FF5F85] transition-all"
              placeholder="Optional"
            ></textarea>
          </div>

          <div>
            <label htmlFor="startdate" className="block text-sm font-medium text-[#B5B5C3]">Start Date and Time</label>
            <input
              type="datetime-local"
              id="startdate"
              name="startdate"
              value={eventDetails.startdate}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-lg bg-[#3E3E4E] text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D] focus:border-[#FF5F85] transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="enddate" className="block text-sm font-medium text-[#B5B5C3]">End Date and Time</label>
            <input
              type="datetime-local"
              id="enddate"
              name="enddate"
              value={eventDetails.enddate}
              onChange={handleChange}
              className="mt-1 w-full p-3 rounded-lg bg-[#3E3E4E] text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D] focus:border-[#FF5F85] transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FF5F85] to-[#FD356E] text-white font-medium transition-transform transform hover:scale-105 hover:shadow-lg shadow-[#FF5F85]/20"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
