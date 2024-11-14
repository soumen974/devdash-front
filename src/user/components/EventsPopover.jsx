import React from 'react';

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

export default EventsPopover;
