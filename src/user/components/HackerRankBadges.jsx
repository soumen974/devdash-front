// src/HackerRankBadges.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HackerRankBadges = () => {
  const [username, setUsername] = useState('sob99338');
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchHackerRankBadges = async (username) => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`https://www.hackerrank.com/rest/contests/master/hackers/${username}/badges`);
      setBadges(data.models);
    } catch (error) {
      console.error('Error fetching HackerRank badges:', error);
      setError('Failed to fetch badges');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHackerRankBadges(username);
  }, [username]);

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-4">HackerRank Badges</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter HackerRank username"
        className="p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={() => fetchHackerRankBadges(username)}
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded"
      >
        {loading ? 'Loading...' : 'Fetch Badges'}
      </button>

      {error && (
        <div className="text-red-500 mt-4">
          <p>Error: {error}</p>
        </div>
      )}

      {badges.length > 0 && (
        <div className="mt-4 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-2">Your Badges</h2>
          <ul className="list-disc pl-6">
            {badges.map((badge, index) => (
              <li key={index} className="flex items-center text-lg mb-2">
                <img
                  src={badge.badge_image}
                  alt={`${badge.badge_name} badge`}
                  className="w-8 h-8 mr-2"
                />
                {badge.badge_name}: {badge.stars} stars
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HackerRankBadges;
