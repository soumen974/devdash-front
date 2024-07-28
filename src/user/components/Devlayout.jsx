import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Head from "./Head";
export default function Devlayout() {
  return (
    <>
    <Head/>
      <div className="p-4  pt-20 sm:ml-64">
        <div className="p-0 bg-[#101219]">
        <Outlet />
        </div>
      </div>
      
    </>
  )
}
