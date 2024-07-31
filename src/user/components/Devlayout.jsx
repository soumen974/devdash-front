import React from 'react'
import { Outlet } from 'react-router-dom'
import Head from "./Head";
export default function Devlayout() {
  return (
    <>
    <Head/>
      <div className="p-4 bg-[#101219] h-screen pt-20 ">
        <div className="p-0  mx-auto max-w-[5rem] md:max-w-[65rem] lg:max-w-[92rem]   ">
         <Outlet />
        </div>
      </div>
      
    </>
  )
}
