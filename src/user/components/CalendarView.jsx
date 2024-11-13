import React, { useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import EventForm from './EventForm';

const EventsPopover = ({ events, position, onClose, onEventClick }) => {
  return (
    <div 
      className="absolute z-50 bg-[#2A2A32] rounded-lg shadow-xl border border-[#FD356E]/20 p-2 min-w-[200px]"
      style={{ top: position.y, left: position.x }}
    >
      <div className="flex flex-col gap-1">
        {events.map(event => (
          <div
            key={event.id}
            onClick={() => onEventClick(event)}
            className="p-2 hover:bg-[#FD356E]/10 rounded cursor-pointer text-sm text-white"
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-gray-400">
              {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const fetchEvents = async () => {
  const statusResponse = await fetch(`${process.env.REACT_APP_API}/google/status`, {
    credentials: 'include'
  });
  
  const statusData = await statusResponse.json();
  
  if (!statusData.connected) {
    return []; 
  }

  const response = await fetch(`${process.env.REACT_APP_API}/calendar/events`, {
    credentials: 'include'
  });

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

const CalendarView = ({ variant = 'full' }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [activePopover, setActivePopover] = useState(null);
  const queryClient = useQueryClient();

  const { data: events = [], error, isLoading } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: fetchEvents,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 0
  });

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/calendar/delete/${selectedEvent.id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete event');
        }

        queryClient.invalidateQueries(['calendar-events']);
        setSelectedEvent(null);
      } catch (error) {
        console.error('Delete operation failed:', error.message);
      }
    }
  };

  const handleUpdateClick = (event) => {
    setEventToEdit({
      id: event.id,        
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end
    });
    setShowEventForm(true);
    setSelectedEvent(null);
  };

  const handleFormSuccess = () => {
    setShowEventForm(false);
    setEventToEdit(null);
    queryClient.invalidateQueries(['calendar-events']);
  };

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const formatDate = (date) => new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);

  const getEventsForDay = (day) => events.filter(event => {
    const eventDate = new Date(event.start);
    return eventDate.getDate() === day && 
           eventDate.getMonth() === currentDate.getMonth() && 
           eventDate.getFullYear() === currentDate.getFullYear();
  });

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div 
          key={`empty-${i}`} 
          className={`${
            variant === 'compact' 
              ? 'h-8' 
              : 'h-24'
          } bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 opacity-20 rounded-lg`} 
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDay(day);
      const hasEvents = dayEvents.length > 0;

      days.push(
        <div 
          key={day} 
          className={`${
            variant === 'compact' 
              ? 'h-8 p-1' 
              : 'h-24 p-2'
          } border border-gray-600 bg-gradient-to-r from-[#23242A] via-[#2F2F3B] to-[#23242A] rounded-lg shadow-lg relative`}
        >
          <div className={`font-semibold ${hasEvents ? 'text-[#FD356E]' : 'text-[#A0AEC0]'} ${
            variant === 'compact' ? 'text-xs text-center' : 'mb-1'
          }`}>
            {day}
          </div>
          {variant !== 'compact' && dayEvents.length > 0 && (
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (dayEvents.length === 1) {
                  setSelectedEvent(dayEvents[0]);
                } else {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setActivePopover({
                    events: dayEvents,
                    position: {
                      x: rect.left,
                      y: rect.bottom + window.scrollY
                    }
                  });
                }
              }}
              className="text-xs bg-[#FD356E] text-white p-1 rounded-md cursor-pointer truncate hover:bg-[#FF5F85]"
            >
              {dayEvents[0].title} {dayEvents.length > 1 && `+${dayEvents.length - 1} more`}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => setCurrentDate(prev => {
    const newDate = new Date(prev);
    newDate.setMonth(prev.getMonth() + direction);
    return newDate;
  });

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin h-12 w-12 border-b-4 border-[#FD356E] rounded-full"></div>
    </div>;
  }

  return (
    <div className={`p-6 bg-[#1E1E24] rounded-2xl shadow-2xl border border-[#FD356E]/10 relative ${
      variant === 'compact' ? 'w-[300px]' : ''
    }`}>
      {error && (
        <div className="mb-4 p-4 bg-[#FD356E]/10 text-[#FD356E] rounded-lg">{error.message}</div>
      )}

      <div className="mb-6">
        <div className={`flex items-center justify-between mb-4 ${
          variant === 'compact' ? 'text-sm' : ''
        }`}>
          <div className="flex items-center gap-2 text-[#FF5F85]">
            <Calendar className="h-6 w-6" />
            <h2 className="text-2xl font-semibold text-[#E2E8F0]">My Calendar Events</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigateMonth(-1)} className="p-2 text-[#FD356E] hover:bg-[#FD356E]/10 rounded">
              ←
            </button>
            <span className="text-lg font-semibold text-[#CBD5E0]">
              {new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate)}
            </span>
            <button onClick={() => navigateMonth(1)} className="p-2 text-[#FD356E] hover:bg-[#FD356E]/10 rounded">
              →
            </button>
          </div>
        </div>

        <div className={`grid grid-cols-7 gap-0 text-gray-400 ${
          variant === 'compact' ? 'text-xs' : ''
        }`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium border-b border-[#2A2A32]">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 mt-2">{renderCalendarGrid()}</div>
      </div>

      {variant !== 'compact' && selectedEvent && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="p-6 max-w-md w-full bg-[#1E1E24] rounded-xl border border-[#FD356E]/10 text-[#E2E8F0] shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <X 
                onClick={() => setSelectedEvent(null)} 
                className="text-gray-400 cursor-pointer hover:text-[#FD356E]" 
              />
            </div>
            
            <p className="text-sm text-gray-300 mb-2">{selectedEvent.description}</p>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Calendar className="h-4 w-4" />
              {formatDate(selectedEvent.start)}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Clock className="h-4 w-4" />
              {formatDate(selectedEvent.end)}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleUpdateClick(selectedEvent)}
                className="px-4 py-2 text-sm bg-[#FD356E] text-white rounded hover:bg-[#FF5F85]"
              >
                Update
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {variant !== 'compact' && showEventForm && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative">
            <EventForm 
              initialData={eventToEdit}
              onSuccess={handleFormSuccess}
              onClose={() => {
                setShowEventForm(false);
                setEventToEdit(null);
              }}
            />
          </div>
        </div>
      )}

      {activePopover && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setActivePopover(null)} 
          />
          <EventsPopover 
            events={activePopover.events}
            position={activePopover.position}
            onClose={() => setActivePopover(null)}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setActivePopover(null);
            }}
          />
        </>
      )}
    </div>
  );
};

export default CalendarView;
