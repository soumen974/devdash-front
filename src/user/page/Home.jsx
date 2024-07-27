import { useState } from 'react'
import Hero from "../components/Hero";
import StreaksTable from '../page/StreaksTable';
import LeetCodestreeks from "../components/LeetCodestreeks";

export default function Home() {

  return (
   <>
   <div className="h-screen  ">
        <Hero/>
        <StreaksTable/>
        <LeetCodestreeks/>
        
   </div>
   
   </>
  )
}