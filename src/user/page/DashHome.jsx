import React, { useState } from 'react';
import StreaksTable from "./StreaksTable";
import LeetCodeStreaks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";
import TrackForm from "../components/TrackForm";
import CalendarView from '../components/CalendarView';

const DashHome = () => {
  const [trackFormShow, setTrackFormShow] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="flex items-center justify-center">
        <div className="mx-auto group max-w-7xl overflow-auto">
          <StreaksTable setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
          {/* <LeetCodeStreaks /> */}
          {/* <HackerRankBadges /> */}
          <TrackForm setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
        </div>
        <div className="fixed bottom-4 right-20">
        <CalendarView variant="dashboard"/>
      </div>
      </div>
    </div>
  );
};

export default DashHome;
