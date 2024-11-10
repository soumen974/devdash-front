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

const ReminderAdding = () => {
  const [calendarEmail, setCalendarEmail] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryClient = new QueryClient();

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
      // Clean up URL parameters silently
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

  return (
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        <div className="text-lg font-medium mb-4">
          {isConnected && calendarEmail ? (
            <div className="flex items-center space-x-2">
              <span className="text-green-600">✓</span>
              <span>Calendar Connected to: {calendarEmail}</span>
              <button 
                onClick={checkCalendarStatus}
                className="ml-4 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Refresh
              </button>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isConnected ? 'Reconnect to Google Calendar' : 'Connect to Google Calendar'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <QueryClientProvider client={queryClient}>
          <CalendarView />
        </QueryClientProvider>
      </div>

      {isConnected && calendarEmail && <EventForm />}
    </div>
  );
};

export default ReminderAdding;