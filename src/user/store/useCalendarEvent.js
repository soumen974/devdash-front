import { useQuery } from '@tanstack/react-query';

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

export const useCalendarEvents = () => {
  return useQuery({
    queryKey: ['calendar-events'],
    queryFn: fetchEvents,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 0
  });
};

export const useDeleteEvent = () => {
  const deleteEvent = async (eventId) => {
    const response = await fetch(`${process.env.REACT_APP_API}/calendar/delete/${eventId}`, {
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

    return data;
  };

  return { deleteEvent };
};
