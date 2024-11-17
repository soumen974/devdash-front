import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarView from '../components/CalendarView';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

const Classtimetable = () => {
  const [file, setFile] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calendarEmail, setCalendarEmail] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);

  axios.defaults.withCredentials = true;

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
      console.error(error.message);
      setError('Failed to check calendar status');
      setIsConnected(false);
    }
  };

  const handleConnectToCalendar = () => {
    try {
      window.location.href = `${process.env.REACT_APP_API}/google/connect`;
    } catch (error) {
      console.error('Connection attempt failed');
      setError('Failed to connect to Google Calendar');
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        selectedFile.type === 'application/vnd.ms-excel')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${process.env.REACT_APP_API}/api/upload-timetable`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        fetchTimetableData();
        alert('Timetable uploaded successfully!');
        setFile(null);
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to upload timetable');
    } finally {
      setLoading(false);
    }
  };

  const fetchTimetableData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/api/timetable-data`);
      
      if (response.data.success) {
        setHeaders(response.data.headers);
        setTimetableData(response.data.timetableData);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
      alert('Failed to fetch timetable data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
    checkCalendarStatus();

    const intervalId = setInterval(checkCalendarStatus, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto p-4 text-white">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Upload Class Timetable</h2>
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm">Connected to: {calendarEmail}</span>
              </div>
            ) : (
              <button
                onClick={handleConnectToCalendar}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-all"
              >
                Connect to Google Calendar
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange}
            className="bg-gray-700 p-2 rounded cursor-pointer" 
          />
          
          {file && (
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload Timetable'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <QueryClientProvider client={queryClient}>
        <CalendarView />
      </QueryClientProvider>

      {timetableData.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <h3 className="text-xl font-semibold mb-4">Current Timetable</h3>
          <table className="min-w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                {headers.map((header, index) => (
                  <th key={index} className="px-4 py-3 border-b border-gray-700 text-left font-bold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timetableData.map((entry, index) => (
                <tr 
                  key={index} 
                  className={`border-t border-gray-700 hover:bg-gray-700 transition duration-150 ${
                    index % 2 === 0 ? 'bg-gray-800' : ''
                  }`}
                >
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 whitespace-pre-line">
                      {entry[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {timetableData.length === 0 && !loading && (
        <div className="text-center py-8 text-gray-400 bg-gray-800 rounded">
          <p className="text-lg">No timetable data available.</p>
          <p className="text-sm mt-2">Upload an Excel file to view your class schedule.</p>
        </div>
      )}
    </div>
  );
};

export default Classtimetable;
