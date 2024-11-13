import React, { useEffect, useState } from 'react';

const LeetCodeStats = () => {
  const [username, setUsername] = useState('sob99338');
  const [streaks, setStreaks] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [missedStreaks, setMissedStreaks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const getContributions = async (username) => {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
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
      const currentDate = new Date(parseInt(date) * 1000);
      if (previousDate) {
        const previousDateDt = new Date(previousDate * 1000);
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
    if (data) {
      const { streaks, maxStreak, missedStreaksFlag } = calculateStreaks(data.submissionCalendar);
      setStreaks(streaks);
      setLongestStreak(maxStreak);
      setCurrentStreak(streaks[streaks.length - 1]);
      setMissedStreaks(missedStreaksFlag);
      setProfileData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchStreaks();
  }, []);

  return (
    <div className="">
      <div className="  rounded-xl">
        {/* Search Bar */}
        <div className="flex gap-2 mt-6 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
            placeholder="Enter LeetCode username"
          />
          <button
            onClick={handleFetchStreaks}
            disabled={loading}
            className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
          >
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {profileData && (
          <div className="space-y-6">
            {/* Main Stats Card */}
            <div className="bg-[#2A2A32] rounded-xl p-6 ">
              <div className="flex items-center justify-between mb-6">
                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white">@{username}</h2>
                  <p className="text-gray-400">LeetCode Profile</p>
                </div>
                <div className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-sm">
                  {profileData.acceptanceRate}% acceptance
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4  bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-md opacity-60  rounded-lg">
                  <div className="text-2xl font-bold text-white">{currentStreak}</div>
                  <div className="text-gray-400 text-sm">Current Streak</div>
                </div>
                <div className="text-center p-4  bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-md opacity-60  rounded-lg">
                  <div className="text-2xl font-bold text-white">{longestStreak}</div>
                  <div className="text-gray-400 text-sm">Longest Streak</div>
                </div>
                <div className="text-center p-4  bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-md opacity-60  rounded-lg">
                  <div className="text-2xl font-bold text-white">{profileData.totalSolved}</div>
                  <div className="text-gray-400 text-sm">Problems Solved</div>
                </div>
              </div>
            </div>

            {/* Problem Stats Card */}
            <div className="bg-[#2A2A32] rounded-xl p-6  0">
              <h3 className="text-lg font-semibold text-white mb-4">Problem Solving Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Easy</span>
                    <span className="text-white">{profileData.easySolved}/{profileData.totalEasy}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-400 rounded-full"
                      style={{width: `${(profileData.easySolved/profileData.totalEasy) * 100}%`}}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">Medium</span>
                    <span className="text-white">{profileData.mediumSolved}/{profileData.totalMedium}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{width: `${(profileData.mediumSolved/profileData.totalMedium) * 100}%`}}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">Hard</span>
                    <span className="text-white">{profileData.hardSolved}/{profileData.totalHard}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-400 rounded-full"
                      style={{width: `${(profileData.hardSolved/profileData.totalHard) * 100}%`}}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Streak History */}
            {streaks.length > 0 && (
              <div className="bg-[#2A2A32] rounded-xl p-6 ">
                <h3 className="text-lg font-semibold text-white mb-4">Streak History</h3>
                <div className="space-y-3">
                  {streaks.map((streak, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-3  bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-md opacity-60  "
                    >
                      <span className="text-gray-400">Streak #{index + 1}</span>
                      <span className="text-white font-medium">{streak} days</span>
                    </div>
                  ))}
                </div>
                {missedStreaks && (
                  <div className="mt-4 text-yellow-400 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    You have missed streaks in the past
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeetCodeStats;