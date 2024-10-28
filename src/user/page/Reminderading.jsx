import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReminderAdding() {
    const [eventname, setEventName] = useState('');
    const [eventdesc, setEventDescription] = useState('');
    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [calendarEvents, setCalendarEvents] = useState([]);

   
    const fetchCalendarEvents = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API}/calendar/show`, 
                { withCredentials: true }
            );
            setCalendarEvents(response.data.events); 
        } catch (error) {
            console.error('Error fetching calendar events:', error);
            setError('Failed to fetch calendar events. Please try again.');
        }
    };

    useEffect(() => {
        fetchCalendarEvents();
    }, []);

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

            // Fetch updated calendar events after adding a new one
            fetchCalendarEvents();

        } catch (error) {
            console.error('Error adding event:', error);
            setError('Failed to add event. Please try again.');
        }
    };

    return (
        <>
            <div className='p-10 flex items-center justify-center bg-blue-400'>
            <div className="mt-8">
                <h2 className="text-white">Your Google Calendar Events</h2>
                {calendarEvents.length > 0 ? (
                    <ul className="mt-4">
                        {calendarEvents.map((event, index) => (
                            <li key={index} className="bg-white p-2 mb-2 rounded-md">
                                <strong>{event.summary}</strong><br />
                                <span>{new Date(event.start.dateTime).toLocaleString()}</span> - 
                                <span>{new Date(event.end.dateTime).toLocaleString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-white mt-4">No events found.</div>
                )}
            </div>
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
                    Submit
                </button>
            </form>
        </>
    );
}
