import React from 'react'
import CreateWorkListingForm  from "../components/CreateWorkListingForm ";
import WorkListings from "../components/WorkListings";

export default function WorkListing() {
  return (
    <div className='  flex items-center justify-center min-h-[92vh]  '>
      <div className="">
      
      {/* <CreateWorkListingForm /> */}
      <WorkListings />
      </div>
     
    </div>
  )
}
