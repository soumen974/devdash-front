import React, { useEffect, useState } from 'react';
import { AlertCircle, Calendar, Clock, Loader } from 'lucide-react';
import StreaksTable from "./StreaksTable";
import LeetCodeStreaks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";
import TrackForm from "../components/TrackForm";
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
    <div className="flex items-center justify-center">
      <div className="mx-auto group max-w-7xl overflow-auto">
        <StreaksTable setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
        <LeetCodeStreaks />
        {/* <HackerRankBadges /> */}

          {workListings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workListings.map((listing, index) => (
                  <WorkListingCard key={listing.id || index} listing={listing} />
                ))}
              </div>
            )}
        <TrackForm setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
      </div>
    </div>
  );
};

export default DashHome;

const WorkListingCard = ({ listing }) => {
  const formattedDate = new Date(listing.completion_time).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="backdrop-blur-lg bg-[#1E1E24]/90 rounded-xl border border-[#FD356E]/10 overflow-hidden 
      transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#FD356E]/20">
      <div className="relative px-6 pt-6 pb-4 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#FD356E]/10 rounded-full blur-2xl -mr-12 -mt-12" />
        <h2 className="text-xl font-bold text-white mb-2 relative truncate">{listing.task_name}</h2>
        <div className="flex items-center gap-2 text-gray-400 text-sm relative">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-4 min-h-[60px] line-clamp-3">
          {listing.task_description}
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>Due: {new Date(listing.completion_time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>
    </div>
  );
};