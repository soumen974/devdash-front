import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../components/Navbar";
export default function Layout() {
  return (
    <div className='bg-[#18181B] '>
    <nav className=' z-40 fixed w-full'><Navbar/></nav>
    <div className=" z-20 h-screen relative mx-auto max-w-7xl">
          <Outlet />
    </div>
    <footer></footer>
    </div>
  )
}
