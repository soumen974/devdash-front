import React, { useState } from 'react';
import { Calendar, Clock, FileText, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const fetchEvents = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API}/calendar/events`,
    { credentials: 'include' }
  );
  
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to fetch events');
  }

  const data = await response.json();
  return data.events.map(event => ({
    id: event.id,
    title: event.summary,
    description: event.description,
    start: new Date(event.start),
    end: new Date(event.end),
    creator: event.creator,
    status: event.status
  }));
};

const CalendarView = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: events = [], error, isLoading } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: fetchEvents,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 0, 
  });

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getEventsForDay = (day) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />);
    }

    
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      days.push(
        <div key={day} className="h-24 border border-gray-200 p-1 overflow-hidden">
          <div className="font-semibold mb-1">{day}</div>
          {dayEvents.map(event => (
            <div
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              className="text-xs bg-blue-500 text-white p-1 mb-1 rounded cursor-pointer truncate"
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error.message}
        </div>
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <h2 className="text-xl font-bold">My Calendar Events</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <span className="font-semibold">
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-0">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-semibold border border-gray-200">
              {day}
            </div>
          ))}
          {renderCalendarGrid()}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h3 className="text-xl font-bold mb-4">{selectedEvent.title}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p>Starts: {formatDate(selectedEvent.start)}</p>
                  <p>Ends: {formatDate(selectedEvent.end)}</p>
                </div>
              </div>

              {selectedEvent.description && (
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-gray-500 mt-1" />
                  <p className="whitespace-pre-wrap">{selectedEvent.description}</p>
                </div>
              )}

              {selectedEvent.creator && (
                <p className="text-sm text-gray-500">
                  Created by: {selectedEvent.creator}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;