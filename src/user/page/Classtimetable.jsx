import React, { useState } from 'react';
import axios from 'axios';

export default function ClassTimetable() {
  // const [file, setFile] = useState(null);
  // const [message, setMessage] = useState('');

 
  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  
  // const handleUpload = async () => {
  //   if (!file) {
  //     setMessage('Please select a file first.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   try {
  //     const response = await axios.post('/api/excel/upload', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage('Failed to upload file.');
  //     console.error(error);
  //   }
  // };
  return (
    <>
    <div className='p-40  flex items-center justify-center bg-yellow-400 '>Classtimetable</div>
    {/* <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300"
      />
      
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      
      {message && <p className="mt-4 text-lg text-green-600">{message}</p>} */}
    </>
  )
}
