// src/StreaksTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeetCodestreeks = () => {
  const [username, setUsername] = useState('sob99338');
  const [streaks, setStreaks] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [missedStreaks, setMissedStreaks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

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
    let maxStreak = 0;
    let missedStreaksFlag = false;

    dates.forEach((date) => {
      const currentDate = new Date(parseInt(date) * 1000); // Convert from UNIX timestamp
      if (previousDate) {
        const previousDateDt = new Date(previousDate * 1000); // Convert from UNIX timestamp
        const difference = (currentDate - previousDateDt) / (1000 * 60 * 60 * 24);
        if (difference === 1) {
          currentStreak += 1;
        } else {
          streaks.push(currentStreak);
          maxStreak = Math.max(maxStreak, currentStreak);
          currentStreak = 1;
          if (difference > 1) {
            missedStreaksFlag = true;
          }
        }
      } else {
        currentStreak = 1;
      }
      previousDate = date;
    });

    streaks.push(currentStreak);
    maxStreak = Math.max(maxStreak, currentStreak);
    return { streaks, maxStreak, missedStreaksFlag };
  };

  const handleFetchStreaks = async () => {
    setLoading(true);
    const data = await getContributions(username);
    const { streaks, maxStreak, missedStreaksFlag } = calculateStreaks(data.submissionCalendar);
    setStreaks(streaks);
    setLongestStreak(maxStreak);
    setCurrentStreak(streaks[streaks.length - 1]);
    setMissedStreaks(missedStreaksFlag);
    setProfileData(data);
    setLoading(false);
  };

  useEffect(() => {
    handleFetchStreaks();
  }, []);

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
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {profileData && (
        <div className="mt-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-2 text-white">LeetCode Profile Summary</h2>
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-semibold">
              Solved: {profileData.totalSolved}/{profileData.totalQuestions}
            </p>
            <p className="text-lg">Acceptance Rate: {profileData.acceptanceRate}%</p>
            <p className="text-lg">Beats: {profileData.easySolved}/{profileData.totalEasy} Easy, {profileData.mediumSolved}/{profileData.totalMedium} Medium, {profileData.hardSolved}/{profileData.totalHard} Hard</p>
          </div>
        </div>
      )}

      {streaks.length > 0 && (
        <div className="mt-4 w-full max-w-lg text-white">
          <h2 className="text-2xl font-bold mb-2">Current Streak: {currentStreak} days</h2>
          <h2 className="text-2xl font-bold mb-2">Longest Streak: {longestStreak} days</h2>
          {missedStreaks && (
            <p className="text-red-500 font-semibold">You have missed streaks in the past!</p>
          )}
          <table className="table-auto border-collapse border border-gray-200 mt-4">
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
