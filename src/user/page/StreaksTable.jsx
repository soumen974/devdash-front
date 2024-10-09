import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';



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

export default function StreaksTable(Props) {
  const [contributions, setContributions] = useState([]);
  // const[trackFormShow,settrackFormShow]=useState(false);


  const [trackData, setTrackData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrackInfo = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/dev/track`, {
          withCredentials: true, // To send cookies for authentication
        });
        setTrackData(response.data.track);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setMessage('Track information not found');
        } else {
          setError('Error fetching track information');
        }
      }
    };

    fetchTrackInfo();
  }, []);


  const token = trackData?.github?.token || 'N/A';
const username = trackData?.github?.github_id || 'N/A';

// trackData.github.github_id}
//    Token: {trackData.github.token}




// github axios 
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
        return '#1D1D20';
      case '#9be9a8':
        return '#0e4429';
      case '#30a14e':
        return '#26a641';
      default:
        return color;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'MMMM do');
  };

  return (
    <div className="">
      {username?
      <div className="border overflow-auto border-gray-600 rounded-md p-3 gap-2 grid grid-cols-8">
      
      {contributions.map((day, index) => (
          <div
            key={day.date}
            className="cursor-pointer w-[2vw] h-[2vw] sm:w-[1.2vw] sm:h-[1.2vw] md:w-[0.6vw] md:h-[0.6vw]  rounded-sm"
            style={{ backgroundColor: getColorClass(day.color), gridColumn: `${Math.floor(index / 7) + 1}`, gridRow: `${(index % 7) + 1}` }}
            title={`${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${formatDate(day.date)}`}
          ></div>
        ))}
       
        
      </div>
       :
       <div className="border  border-gray-600 rounded-md p-3  grid  ">
         <div className=' w-[55vw] h-28  flex justify-center items-center text-black  '>
          <h1 onClick={()=>{Props.settrackFormShow(true)}} className='bg-green-200 p-2 rounded-sm'>Track github</h1>
          </div>
        </div>
        
        }
       
    </div>
  );
};


// {trackData ? (
//   <div className='text-white'>
//     <div className="mb-4">
//       <h2 className="font-bold">GitHub</h2>
//       <p>ID: {trackData.github.github_id}</p>
//       <p>Token: {trackData.github.token}</p>
//     </div>

//     <div className="mb-4">
//       <h2 className="font-bold">Codeforces</h2>
//       <p>ID: {trackData.codeforces.codeforces_id}</p>
//       <p>Token: {trackData.codeforces.token}</p>
//     </div>

//     <div className="mb-4">
//       <h2 className="font-bold">CodeChef</h2>
//       <p>ID: {trackData.codechef.codechef_id}</p>
//       <p>Token: {trackData.codechef.token}</p>
//     </div>

//     <div className="mb-4">
//       <h2 className="font-bold">HackerRank</h2>
//       <p>ID: {trackData.hackerrank.hackerrank_id}</p>
//       <p>Token: {trackData.hackerrank.token}</p>
//     </div>

//     <div className="mb-4">
//       <h2 className="font-bold">LeetCode</h2>
//       <p>ID: {trackData.leetcode.leetcode_id}</p>
//       <p>Token: {trackData.leetcode.token}</p>
//     </div>
//   </div>
// ) : (
//   <p>Loading...</p>
// )}