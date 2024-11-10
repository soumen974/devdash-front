// src/user/page/Classtimetable.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Classtimetable = () => {
  const [file, setFile] = useState(null);
  const [timetableData, setTimetableData] = useState([]);

  // Handle file upload and parse it using XLSX
  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      // Assuming the first row contains headers, skip it
      const formattedData = parsedData.slice(1).map((row) => ({
        day: row[0],       // e.g., 'Monday'
        time: row[1],      // e.g., '10:00 AM'
        className: row[2], // e.g., 'Math'
      }));

      setTimetableData(formattedData);
    };
    reader.readAsArrayBuffer(uploadedFile);
  };

  // Handle file submission
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/schedule-timetable', { timetable: timetableData });
      alert('Timetable successfully scheduled in Google Calendar!');
    } catch (error) {
      console.error('Error scheduling timetable:', error);
      alert('Failed to schedule timetable');
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Upload Class Timetable</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {file && (
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Schedule Timetable
          </button>
        </div>
      )}
      {timetableData.length > 0 && (
        <table className="min-w-full mt-4 border">
          
          <tbody>
            {timetableData.map((entry, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{entry.day}</td>
                <td className="px-4 py-2">{entry.time}</td>
                <td className="px-4 py-2">{entry.className}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Classtimetable;
