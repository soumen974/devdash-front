import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarView from '../components/CalendarView';

const Classtimetable = () => {
  const [file, setFile] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [headers, setHeaders] = useState(['TIME', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const currentMonth = new Date().getMonth();
  const [startMonth, setStartMonth] = useState(currentMonth);
  const [endMonth, setEndMonth] = useState(currentMonth + 4);
  
  const years = Array.from({length: 6}, (_, i) => currentYear + i);

  axios.defaults.withCredentials = true;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
        selectedFile.type === 'application/vnd.ms-excel')) {
      setFile(selectedFile);
    } else {
      alert('Please select a valid Excel file (.xlsx or .xls)');
    }
  };

  const handleStartMonthChange = (e) => {
    const newStartMonth = parseInt(e.target.value);
    setStartMonth(newStartMonth);
    if (newStartMonth > endMonth) {
      setEndMonth(newStartMonth);
    }
  };

  const handleEndMonthChange = (e) => {
    const newEndMonth = parseInt(e.target.value);
    setEndMonth(newEndMonth);
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('startMonth', startMonth);
      formData.append('endMonth', endMonth);
      formData.append('year', selectedYear);

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

  const syncWithGoogleCalendar = async () => {
    try {
      setSyncLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API}/api/sync-calendar`, {
        startMonth,
        endMonth,
        year: selectedYear
      });
      
      if (response.data.success) {
        alert('Timetable successfully synced with Google Calendar!');
      }
    } catch (error) {
      alert('Failed to sync with Google Calendar. Please ensure you are connected to Google Calendar.');
    } finally {
      setSyncLoading(false);
    }
  };

  const fetchTimetableData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/api/timetable-data`);
      
      if (response.data.success) {
        // Ensure we're setting valid data
        setHeaders(response.data.headers || []);
        setTimetableData(response.data.timetableData || []);
      }
    } catch (error) {
      console.error('Error fetching timetable data:', error);
      // Set empty arrays on error
      setHeaders([]);
      setTimetableData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, []);

  return (
    <div className="container mx-auto p-4 text-white">
      <CalendarView/>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload Class Timetable</h2>
        
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Year</label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="bg-gray-700 p-2 rounded"
            >
              {years.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Start Month</label>
            <select 
              value={startMonth} 
              onChange={handleStartMonthChange}
              className="bg-gray-700 p-2 rounded"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Month</label>
            <select 
              value={endMonth} 
              onChange={handleEndMonthChange}
              className="bg-gray-700 p-2 rounded"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i} value={i} disabled={i < startMonth}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
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

          {timetableData.length > 0 && (
            <button
              className={`bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition duration-200 ${
                syncLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={syncWithGoogleCalendar}
              disabled={syncLoading}
            >
              {syncLoading ? 'Syncing...' : 'Sync with Google Calendar'}
            </button>
          )}
        </div>
      </div>

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
