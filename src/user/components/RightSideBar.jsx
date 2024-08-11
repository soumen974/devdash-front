import React from 'react'

export default function RightSideBar() {
  return (
    <>
       <aside  id="cta-button-sidebar" className={`fixed top-0 text-white  sm:right-0 -right-20 sm:z-20 z-20  h-screen transition-all ease-in-out duration-300   `} aria-label="Sidebar">
         <div className="h-full divide-y-[1px] divide-[#2d313f] flex justify-between  flex-col px-5 py-4 overflow-y-auto bg-[#14161D]">
         <ul className='mt-20'>
          <li>abc</li>
         
         </ul>
         </div>
      </aside>
    </>
  )
}
