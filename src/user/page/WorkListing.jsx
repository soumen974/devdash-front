import React from 'react'
import CreateWorkListingForm  from "../components/CreateWorkListingForm ";
import WorkListings from "../components/WorkListings";

export default function WorkListing() {
  return (
    <div className='p-40  flex items-center justify-center bg-red-400 '>
      <div className="">
      
      <CreateWorkListingForm />
      <WorkListings />
      </div>
     
    </div>
  )
}
