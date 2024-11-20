import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserImage } from './PersonalDataList';

const query = `
  query ($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

const GitStreaksPublic = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { myusername } = useUserImage();
  const [trackData, setTrackData] = useState(null);

  const fetchTrackData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/dev/track/${myusername}`);
      setTrackData(response.data);
    } catch (err) {
      const errorMessage = err.response && err.response.status === 404
        ? 'Track information not found'
        : 'An error occurred while fetching the data.';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const fetchGitHubContributions = async (token, username) => {
    try {
      const response = await axios.post(
        'https://api.github.com/graphql',
        { query, variables: { username } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks;
      const days = weeks.flatMap(week => week.contributionDays);
      setContributions(days);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contribution data:', error);
      setError('Failed to fetch GitHub contributions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrackData();
  }, [myusername]);

  useEffect(() => {
    if (trackData?.github_token && trackData?.github_id) {
      fetchGitHubContributions(trackData.github_token, trackData.github_id);
    }
  }, [trackData]);

  const getColorClass = (color) => {
    const colorMap = {
      '#ebedf0': '#1D1D20',
      '#9be9a8': '#0e4429',
      '#30a14e': '#26a641',
    };
    return colorMap[color] || color;
  };

  if (loading) {
    return (
      <div className="h-[11vh] border border-gray-600 rounded-md p-3 flex justify-center items-center">
        <span className="pl-2">Loading..</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-500 rounded-md p-3 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="border border-neutral-800 from-inherit overflow-auto rounded-md p-3 gap-1 grid grid-cols-8">
      {contributions.map((day, index) => (
        <div
          key={day.date}
          className="w-[2vw] h-[2vw] sm:w-[1.2vw] sm:h-[1.2vw] md:w-[1vw] md:h-[1vw] lg:w-[0.54rem] lg:h-[0.5rem] rounded-sm"
          style={{ 
            backgroundColor: getColorClass(day.color), 
            gridColumn: `${Math.floor(index / 7) + 1}`, 
            gridRow: `${(index % 7) + 1}` 
          }}
          title={`${day.date}: ${day.contributionCount} contributions`}
        ></div>
      ))}
    </div>
  );
};

export default GitStreaksPublic;