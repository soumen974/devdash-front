import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarView from '../components/CalendarView';

const Classtimetable = () => {
  const [file, setFile] = useState(null);
  const [timetableData, setTimetableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

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

  const syncWithGoogleCalendar = async () => {
    try {
      setSyncLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API}/api/sync-calendar`);
      
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
  }, []);

  return (
    <div className="container mx-auto p-4 text-white">
      <CalendarView/>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Upload Class Timetable</h2>
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

          {/* <div className="mt-8 bg-gray-800 p-4 rounded">
            <h4 className="text-lg font-semibold mb-2">Legend:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>DWDM - Data Warehousing and Data Mining</div>
              <div>InfoSec - Information Security</div>
              <div>DCAS - Database Cluster Administration and Security</div>
              <div>SEP - Smart Engineering Project</div>
            </div>
          </div> */}
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
