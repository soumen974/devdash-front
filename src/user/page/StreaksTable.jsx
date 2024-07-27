// src/components/Heatmap.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const token = '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';
const username = 'soumen974'; 

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

const StreaksTable = () => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    axios.post(
      'https://api.github.com/graphql',
      { query, variables: { username } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      const weeks = response.data.data.user.contributionsCollection.contributionCalendar.weeks;
      const days = weeks.flatMap(week => week.contributionDays);
      setContributions(days);
    }).catch((error) => console.error('Error fetching contribution data:', error));
  }, []);

  return (
    <div className="px-[50rem] bg-red-200 ">
      <h2 className="text-xl font-bold mb-4 ">GitHub Contributions</h2>
      <div className="grid grid-cols-10 -rotate-90  gap-1">
        {contributions.map((day) => (
          <div
            key={day.date}
            className="w-8 h-8 border border-gray-200"
            style={{ backgroundColor: day.color }}
            title={`${day.date}: ${day.contributionCount} contributions`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StreaksTable;
