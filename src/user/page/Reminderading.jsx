import React, { useState } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';

export default function ReminderAdding() {
    const [eventname, setEventName] = useState('');
    const [eventdesc, setEventDescription] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const startDateTime = new Date(startdate).toISOString();
        const endDateTime = new Date(enddate).toISOString();

        const reminderData = {
            eventname,
            eventdesc,
            startdate: startDateTime,
            enddate: endDateTime,
        };

        if (!eventname || !eventdesc || !startdate || !enddate) {
            setError('All fields are required');
            return;
        }

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/google-calendar/events`,
                reminderData,
                { withCredentials: true }
            );

            setSuccessMessage('Event added to Google Calendar successfully!');
            setEventName('');
            setEventDescription('');
            setStartDate('');
            setEndDate('');
            setError('');

            setTimeout(() => {
                queryClient.invalidateQueries(['events']);
            }, 2000);

        } catch (error) {
            console.error('Error adding event:', error);
            setError('Failed to add event. Please try again.');
        }
    };

    return (
        <>
            <div className='flex items-center justify-center bg-white'>
                <QueryClientProvider client={queryClient}>
                    <Calendar />
                </QueryClientProvider>
            </div>

            <form onSubmit={handleSubmit} className='reminder-form flex flex-col space-y-4'>
                {error && <div className="text-red-500">{error}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                
                
                <div className='form-group mb-4'>
                    <label htmlFor="eventName" className="text-white">Event Name</label>
                    <input 
                        type="text" 
                        id="eventName" 
                        className="form-control mt-3 p-1 ml-3 rounded-md" 
                        placeholder="Enter event name" 
                        value={eventname} 
                        onChange={(e) => setEventName(e.target.value)} 
                    />
                </div>

                
                <div className='form-group mb-4'>
                    <label htmlFor="eventDescription" className="text-white">Event Description</label>
                    <input 
                        type="text" 
                        id="eventDescription" 
                        className="form-control mt-3 p-1 ml-3 rounded-md" 
                        placeholder="Enter event description" 
                        value={eventdesc} 
                        onChange={(e) => setEventDescription(e.target.value)} 
                    />
                </div>

               
                <div className='form-group mb-4'>
                    <label htmlFor="startTime" className="text-white">Start Time</label>
                    <input 
                        type="datetime-local" 
                        id="startTime" 
                        className="form-control mt-3 p-1 ml-3 rounded-md" 
                        value={startdate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                </div>

                
                <div className='form-group mb-4'>
                    <label htmlFor="endTime" className="text-white">End Time</label>
                    <input 
                        type="datetime-local" 
                        id="endTime" 
                        className="form-control mt-3 p-1 ml-3 rounded-md" 
                        value={enddate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                </div>

                <button type="submit" className="bg-white text-blue-500 p-2 rounded-md mt-4 w-[28rem]">
                   Add Event
                </button>
            </form>
        </>
    );
}
