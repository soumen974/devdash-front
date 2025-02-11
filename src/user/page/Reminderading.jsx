import { useEffect, useState } from 'react';
import CalendarView from '../components/CalendarView';
import EventForm from '../components/EventForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const log = {
  error: (message) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`❌ Calendar: ${message}`);
    }
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

const ReminderAdding = () => {
  const [calendarEmail, setCalendarEmail] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  // const queryClient = new QueryClient();

  const checkCalendarStatus = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/google/status`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.status}`);
      }

      const data = await response.json();
      setCalendarEmail(data.email);
      setIsConnected(data.connected);
      setError(null);
    } catch (error) {
      log.error(error.message);
      setError('Failed to check calendar status');
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkCalendarStatus();

    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, '', window.location.pathname);
    }

    const intervalId = setInterval(checkCalendarStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleConnectToCalendar = () => {
    try {
      window.location.href = `${process.env.REACT_APP_API}/google/connect`;
    } catch (error) {
      log.error('Connection attempt failed');
      setError('Failed to connect to Google Calendar');
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // const handleEventFormSuccess = () => {
  //   setShowEventForm(false);
  //   // Invalidate and refetch calendar events
  //   queryClient.invalidateQueries(['calendar-events']);
  // };


  return (
    <div className="relative p-6 space-y-8 bg-[#1E1E24] rounded-lg shadow-xl text-white">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          {/* Left Column */}
          <div className="text-lg font-medium mb-6">
            {isConnected && calendarEmail ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span>Calendar Connected to: {calendarEmail}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-600">!</span>
                <span>No calendar connected</span>
              </div>
            )}
          </div>

          <button
            onClick={handleConnectToCalendar}
            className="w-fit px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
          >
            {isConnected ? 'Choose another Google Calendar' : 'Connect to Google Calendar'}
          </button>
        </div>

        <div className="flex flex-col items-end justify-between">
          {/* Right Column */}
          {isConnected && (
            <button
              onClick={() => setShowEventForm((prev) => !prev)}
              className="px-6 py-4 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A32] transition-all"
            >
              {showEventForm ? 'Hide Event Form' : 'Add Event'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Overlay Event Form */}
      {showEventForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* <div className="relative bg-[#2D2F3C] p-8 rounded-lg shadow-lg w-full max-w-fit">
          
          </div> */}
          <EventForm 
            onClose={() => setShowEventForm(false)}
            onSuccess={({ refetch }) => {
              setShowEventForm(false);
              queryClient.invalidateQueries(['calendar-events']);
            }}
          />
        </div>
      )}

      <div className="rounded-lg shadow">
        <QueryClientProvider client={queryClient}>
          <CalendarView />
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default ReminderAdding;