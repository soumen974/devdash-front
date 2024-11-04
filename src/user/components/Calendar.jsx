import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const fetchEvents = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API}/calendar/show`, { withCredentials: true });
    return response.data.events.map(event => ({
        title: event.summary,
        start: new Date(event.start.dateTime || event.start.date),
        end: new Date(event.end.dateTime || event.end.date),
        // allDay: !event.start.dateTime, 
    }));
};

const Calendar = () => {
    const { data: events = [], isLoading, isError, error } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
        refetchInterval: 120000,  // Refresh events every 2 minutes
    });

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Error fetching events: {error.message}</p>;

    return (
        <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="month"
        />
    );
};

export default Calendar;
