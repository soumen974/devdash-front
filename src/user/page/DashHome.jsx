import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, Clock, ChevronRight } from 'lucide-react';

import StreaksTable from "./StreaksTable";
import LeetCodeStreaks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";
import TrackForm from "../components/TrackForm";
import CalendarView from '../components/CalendarView';
// import {workdata  } from "../components/WorkListings";

const DashHome = () => {
  // return {workListings} = workdata();
  const [trackFormShow, setTrackFormShow] = useState(false);

  const [workListings, setWorkListings] = useState([]);
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWorkListings = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/work/workListings`, {
          credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch work listings');
        }

        setWorkListings(data.workListings);
      } catch (error) {
        setStatus({
          type: 'error',
          message: error.message || 'Error fetching work listings'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkListings();
  }, []);

  return (
    <div className="flex items-center justify-center max-md:px-2">
      <div className="mx-auto group max-w-7xl overflow-auto">
         <div className="mb-8 mt-10">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
           Dashboard 
          </h1>
          <p className="text-gray-400">
          Monitor your key metrics and performance insights
          </p>
        </div>
        <StreaksTable setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
        <LeetCodeStreaks />
        {/* <HackerRankBadges /> */}
          <table className="w-full border-collapse bg-gradient-to-r from-[#1E1E24] to-[#2A2A32] rounded-xl overflow-hidden">
            <thead>
            <tr className="border-b border-[#FD356E]/10">
              <th className="p-4 text-left text-gray-400 font-medium">Task</th>
              <th className="p-4 text-left text-gray-400 font-medium">Status</th>
              <th className="p-4 text-left text-gray-400 font-medium">Description</th>
              <th className="p-4 text-left text-gray-400 font-medium">Time</th>
              <th className="p-4 text-left text-gray-400 font-medium">Actions</th>
            </tr>
            </thead>
            {workListings.length > 0 && (
            <tbody>
             
         
            {workListings.map((listing, index) => (
              <WorkListingTable key={listing.id || index} listing={listing} />
            ))}
         
       
            </tbody> )}
          </table>
        <TrackForm setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
      </div>
      <div>
          <CalendarView variant="compact" />
        </div>
    </div>
  );
};

export default DashHome;

const WorkListingTable = ({ listing }) => {  // Changed from listings to listing
  const formattedDate = new Date(listing.completion_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(listing.completion_time).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <tr className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg hover:bg-gray-800/50 transition-colors">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="font-medium text-white truncate">
          {listing.task_name}
        </span>
      </div>
    </td>
    
    <td className="p-4">
      <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
        <AlertCircle className="mr-1 h-4 w-4" />
        Active
      </span>
    </td>
    
    <td className="p-4 max-w-md">
      <p className="text-sm text-gray-400 line-clamp-2">
        {listing.task_description}
      </p>
    </td>
    
    <td className="p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{formattedTime}</span>
        </div>
      </div>
    </td>
    
    <td className="p-4">
      <button className="flex items-center gap-1 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-400 transition-colors hover:border-gray-600 hover:text-white hover:bg-gray-800/50">
        View Details
        <ChevronRight className="h-4 w-4" />
      </button>
    </td>
  </tr>
  );
};
