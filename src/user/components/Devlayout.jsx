import React from 'react'
import { Outlet } from 'react-router-dom'
import Head from "./Head";
import SideBar from "../components/SideBar";
export default function Devlayout() {
  return (
    <>
    <Head/>
      <div className="p-4 bg-[#101219] h-screen pt-20 ">
        <div className="p-0     ">
          
         <Outlet />
        </div>
      </div>
      
    </>
  )
}
