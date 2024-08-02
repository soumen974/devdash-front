import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

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

  const getColorClass = (color) => {
    switch (color) {
      case '#ebedf0':
        return '#27272a4d';
      case '#c6e48b':
        return 'var(--contribution-color-1)';
      case '#7bc96f':
        return 'var(--contribution-color-2)';
      case '#239a3b':
        return 'var(--contribution-color-3)';
      case '#196127':
        return 'var(--contribution-color-4)';
      default:
        return color;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM do');
  };

  return (
    <div className="bg-red-20">
      <div className="border overflow-auto border-gray-600 rounded-md p-3 gap-1 grid grid-cols-8">
        {contributions.map((day, index) => (
          <div
            key={day.date}
            className="cursor-pointer w-[2vw] h-[2vw] sm:w-[1.2vw] sm:h-[1.2vw] md:w-[1vw] md:h-[1vw] lg:w-[0.54rem] lg:h-[0.5rem] rounded-sm"
            style={{ backgroundColor: getColorClass(day.color), gridColumn: `${Math.floor(index / 7) + 1}`, gridRow: `${(index % 7) + 1}` }}
            title={`${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${formatDate(day.date)}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StreaksTable;
