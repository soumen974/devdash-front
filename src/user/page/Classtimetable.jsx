// src/user/page/Classtimetable.jsx
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const Classtimetable = () => {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
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

      // Extract headers from the first row
      const fileHeaders = parsedData[0];
      setHeaders(fileHeaders);

      // Extract data, excluding the header row
      const formattedData = parsedData.slice(1).map((row) => {
        const rowData = {};
        fileHeaders.forEach((header, index) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

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
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 border-b">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetableData.map((entry, index) => (
              <tr key={index} className="border-t">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-4 py-2">{entry[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Classtimetable;
