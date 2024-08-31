import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Head from "./Head";
import SideBar from "../components/SideBar";
import RightSideBar from "../components/RightSideBar";
export default function Devlayout() {
  const [sideBar, setsideBar] = useState(false);
  

  return (
    <>
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
  <div className="flex h-screen overflow-hidden">
    <SideBar  isSidebarOpen={sideBar} setIsSidebarOpen={setsideBar}/>

    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <Head sideBar={sideBar} setsideBar={setsideBar}/>

      <main>
        <div className="mx-auto max-w-screen-2xl mt-20">
        <Outlet />
        </div>
      </main>
    </div>
  </div>
 
  </div>
      
    </>
  )
}








