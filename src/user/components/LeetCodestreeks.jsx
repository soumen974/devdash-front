// src/StreaksTable.js
import React, { useState } from 'react';
import axios from 'axios';

const LeetCodestreeks = () => {
  const [username, setUsername] = useState('');
  const [streaks, setStreaks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContributions = async (username) => {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    const response = await axios.get(url);
    return response.data;
  };

  const calculateStreaks = (submissionCalendar) => {
    const contributions = {};

    for (let date in submissionCalendar) {
      contributions[date] = submissionCalendar[date];
    }

    const dates = Object.keys(contributions).sort();
    const streaks = [];
    let currentStreak = 0;
    let previousDate = null;

    dates.forEach((date) => {
      const currentDate = new Date(parseInt(date) * 1000); // Convert from UNIX timestamp
      if (previousDate) {
        const previousDateDt = new Date(previousDate * 1000); // Convert from UNIX timestamp
        const difference = (currentDate - previousDateDt) / (1000 * 60 * 60 * 24);
        if (difference === 1) {
          currentStreak += 1;
        } else {
          streaks.push(currentStreak);
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      previousDate = date;
    });

    streaks.push(currentStreak);
    return streaks;
  };

  const handleFetchStreaks = async () => {
    setLoading(true);
    const data = await getContributions(username);
    const streaks = calculateStreaks(data.submissionCalendar);
    setStreaks(streaks);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold mb-4">LeetCode Contribution Streaks</h1>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Enter LeetCode username"
      className="p-2 mb-4 border border-gray-300 rounded"
    />
    <button
      onClick={handleFetchStreaks}
      disabled={loading}
      className="bg-blue-500 text-white p-2 rounded"
    >
      {loading ? 'Loading...' : 'Fetch Streaks'}
    </button>
    {streaks.length > 0 && (
      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Longest Streak: {Math.max(...streaks)}</h2>
        <table className="table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-700 text-white">Streak Number</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-700 text-white">Days</th>
            </tr>
          </thead>
          <tbody>
            {streaks.map((streak, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>  
  );
};

export default LeetCodestreeks;
