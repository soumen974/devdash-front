import React, { useState } from 'react'
import { PanelRightOpen  } from "lucide-react";
export default function RightSideBar() {
  const [issidebar, setissidebar] = useState(true);
  return (
    <>
       <aside  id="cta-button-sidebar" className={` ${issidebar? " w-[23rem]  ": " w-0  "} text-white    max-md:left-0 z-20  max-md:absolute max-md:h-full max-md:top-0    `} aria-label="Sidebar">
         <div className="h-full divide-y-[1px] divide-[#2d313f] flex justify-between  flex-col px-5 py-4  bg-[#14161D]">
         

         <ul className='mt-3 relative'>
          <li onClick={()=>{setissidebar(!issidebar)}} className=' py-2 bg-[#2c2c2c] w-fit px-2 absolute -left-10  rounded-full'>< PanelRightOpen className='text-[#FD356E] p-0.5' /></li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>
          <li className='p-2'>Soumen Bhunia</li>

         </ul>

         <ul className=''>
          <li className='p-2'>Soumen Bhunia</li>
         </ul>
         </div>
      </aside>
    </>
  )
}
