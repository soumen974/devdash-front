import React, { useState } from 'react'
import { PanelRightOpen  } from "lucide-react";
export default function RightSideBar(props) {
  // const [issidebar, setissidebar] = useState(true);
  const setissidebar=props.setissidebar;
  const issidebar=props.issidebar;
  return (
    <>
       <aside  id="cta-button-sidebar" className={` ${issidebar? " mr-0   ": " -mt-[53rem] md:-mr-80 "} w-[17rem] text-white bg-[#14161D] z-20 mt-[4rem]   max-md:h-[94vh]   max-md:absolute  max-md:right-0  `} aria-label="Sidebar">
         <div className="h-full divide-y-[1px] divide-[#2d313f] flex justify-between  flex-col px-3 py-4  ">
         <ul className=' relative'>
          <li className=' hover:bg-[#262936] rounded-lg p-3'>Soumen Bhunia</li>
          

         </ul>

         <ul className=''>
          <li className='p-2'>Upgrade plan</li>
         </ul>
         </div>
         <span title='chat history ' onClick={()=>{setissidebar(!issidebar)}} className={` hover:bg-[#2c2c2c]  cursor-pointer py-2  w-fit px-2 absolute right-8 ${!issidebar?"-bottom-14":" bottom-2"}  md:bottom-2 rounded-full`}>< PanelRightOpen className='text-[#FD356E] p-0.5' /></span>

      </aside>
    </>
  )
}
