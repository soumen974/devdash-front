import React, { useState } from 'react'
import StreaksTable from "./StreaksTable";
import LeetCodestreeks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";
import TrackForm from "../components/TrackForm";

export default function DashHome() {
  const[trackFormShow,settrackFormShow]=useState(false);

  return (
    <div className='  flex items-center justify-center  '>
      <div className="mx-auto group max-w-7xl overflow-auto">
        <StreaksTable settrackFormShow={settrackFormShow} trackFormShow={trackFormShow} />
        {/* <LeetCodestreeks/> */}
        {/* <HackerRankBadges/> */}
        <TrackForm settrackFormShow={settrackFormShow} trackFormShow={trackFormShow}/>

        </div>
    
    </div>
  )
}
