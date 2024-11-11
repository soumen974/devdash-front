import React, { useState } from 'react';
import StreaksTable from "./StreaksTable";
import LeetCodeStreaks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";
import TrackForm from "../components/TrackForm";

const DashHome = () => {
  const [trackFormShow, setTrackFormShow] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto group max-w-7xl overflow-auto">
        <StreaksTable setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
        {/* <LeetCodeStreaks /> */}
        {/* <HackerRankBadges /> */}
        <TrackForm setTrackFormShow={setTrackFormShow} trackFormShow={trackFormShow} />
      </div>
    </div>
  );
};

export default DashHome;