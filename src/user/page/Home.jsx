import { useState } from 'react'
import Hero from "../components/Hero";

export default function Home() {

  return (
   <>
   <div className="h-screen max-md:overflow-hidden ">
        <Hero/>
   </div>
   
   </>
  )
}