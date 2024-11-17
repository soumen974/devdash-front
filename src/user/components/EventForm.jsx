import { X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const EventForm = ({ initialData, onSuccess, onClose}) => {
  const [eventDetails, setEventDetails] = useState({
    eventname: initialData?.title || '',
    eventdesc: initialData?.description || '',
    startdate: initialData?.start ? new Date(initialData.start).toISOString().slice(0, 16) : '',
    enddate: initialData?.end ? new Date(initialData.end).toISOString().slice(0, 16) : '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (initialData) {
      setEventDetails({
        eventname: initialData.title,
        eventdesc: initialData.description || '',
        startdate: new Date(initialData.start).toISOString().slice(0, 16),
        enddate: new Date(initialData.end).toISOString().slice(0, 16),
      });
    }
  }, [initialData]);

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
      const url = initialData 
        ? `${process.env.REACT_APP_API}/calendar/update/${initialData.id}`
        : `${process.env.REACT_APP_API}/calendar/add-event`;
  
      const method = initialData ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(eventDetails),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save event');
      }
  
      setSuccessMessage(initialData ? 'Event updated successfully!' : 'Event added successfully!');
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess({ refetch: true });
        }, 1500);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full max-w-lg p-8 rounded-3xl shadow-2xl bg-gradient-to-br from-[#2A2A3D] to-[#1F1F2E] border border-[#3E3E4E]/30 backdrop-blur-xl relative">
      <button
    onClick={onClose}
    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#3E3E4E]/50 hover:bg-[#FF5F85]/20 transition-all duration-300 text-gray-400 hover:text-[#FF5F85] z-50"
  >
   <X className="h-6 w-6" />
  </button>
      <div className="relative mb-8">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
          {initialData ? 'Update Calendar Event' : 'Add Event to Calendar'}
        </h2>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full"></div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-[#FF5F85]/10 border border-[#FF5F85]/20 text-[#FF5F85] text-sm font-medium animate-fadeIn">
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 rounded-xl bg-[#28A745]/10 border border-[#28A745]/20 text-[#28A745] text-sm font-medium animate-fadeIn">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="eventname" className="block text-sm font-medium text-[#B5B5C3]">
            Event Name <span className="text-[#FF5F85]">*</span>
          </label>
          <input
            type="text"
            id="eventname"
            name="eventname"
            value={eventDetails.eventname}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#3E3E4E]/50 text-white placeholder-[#6C6C7E] focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D]/30 focus:border-[#FF5F85] transition-all duration-300"
            placeholder="Enter event name"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="eventdesc" className="block text-sm font-medium text-[#B5B5C3]">
            Event Description
          </label>
          <textarea
            id="eventdesc"
            name="eventdesc"
            value={eventDetails.eventdesc}
            onChange={handleChange}
            className="w-full p-4 rounded-xl bg-[#3E3E4E]/50 text-white placeholder-[#6C6C7E] focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D]/30 focus:border-[#FF5F85] transition-all duration-300"
            rows="4"
            placeholder="Enter event description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startdate" className="block text-sm font-medium text-[#B5B5C3]">
              Start Date & Time <span className="text-[#FF5F85]">*</span>
            </label>
            <input
              type="datetime-local"
              id="startdate"
              name="startdate"
              value={eventDetails.startdate}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#3E3E4E]/50 text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D]/30 focus:border-[#FF5F85] transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="enddate" className="block text-sm font-medium text-[#B5B5C3]">
              End Date & Time <span className="text-[#FF5F85]">*</span>
            </label>
            <input
              type="datetime-local"
              id="enddate"
              name="enddate"
              value={eventDetails.enddate}
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-[#3E3E4E]/50 text-white focus:ring-2 focus:ring-[#FF5F85] border border-[#4A4A5D]/30 focus:border-[#FF5F85] transition-all duration-300"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 transform
            ${isHovered ? 'bg-gradient-to-r from-[#FF5F85] to-[#FD356E] scale-105' : 'bg-gradient-to-r from-[#FD356E] to-[#FF5F85]'}
            hover:shadow-lg hover:shadow-[#FF5F85]/20 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A3D]`}
        >
          {initialData ? 'Update Event' : 'Add Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
