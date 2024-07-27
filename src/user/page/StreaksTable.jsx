// src/StreaksTable.js
import React, { useState } from 'react';
import axios from 'axios';

const StreaksTable = () => {
  const [username, setUsername] = useState('');
  const [streaks, setStreaks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContributions = async (username) => {
    const url = `https://api.github.com/users/${username}/events`;
    const response = await axios.get(url);
    return response.data;
  };

  const calculateStreaks = (events) => {
    const contributions = {};

    events.forEach((event) => {
      if (['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)) {
        const date = event.created_at.slice(0, 10);
        contributions[date] = (contributions[date] || 0) + 1;
      }
    });

    const dates = Object.keys(contributions).sort();
    const streaks = [];
    let currentStreak = 0;
    let previousDate = null;

    dates.forEach((date) => {
      const currentDate = new Date(date);
      if (previousDate) {
        const previousDateDt = new Date(previousDate);
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
    const events = await getContributions(username);
    const streaks = calculateStreaks(events);
    setStreaks(streaks);
    setLoading(false);
  };

  return (
    <div>
      <h1>GitHub Contribution Streaks</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleFetchStreaks} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Streaks'}
      </button>
      {streaks.length > 0 && (
        <div>
          <h2>Longest Streak: {Math.max(...streaks)}</h2>
          <table>
            <thead>
              <tr>
                <th>Streak Number</th>
                <th>Days</th>
              </tr>
            </thead>
            <tbody>
              {streaks.map((streak, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StreaksTable;
