import React from 'react'
import StreaksTable from "./StreaksTable";
import LeetCodestreeks from "../components/LeetCodestreeks";
import HackerRankBadges from "../components/HackerRankBadges";

export default function DashHome() {
  return (
    <div className='  flex items-center justify-center  '>
      <div className="mx-auto group max-w-7xl overflow-auto">
        <StreaksTable/>
        {/* <LeetCodestreeks/> */}
        {/* <HackerRankBadges/> */}
        </div>
    
    </div>
  )
}
