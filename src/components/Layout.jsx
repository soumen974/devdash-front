import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../user/components/Navbar";
import Footer from "../components/Footer";
export default function Layout() {
  return (
    <div className='bg-[#19191C]  '>
    <nav className=' z-40 fixed w-full'><Navbar/></nav>
    <div className='bg-[#19191C]  '>
      <div className=" z-20  relative  ">
            <Outlet />
      </div>
    </div>
    <footer>
      <Footer/>
    </footer>
    </div>
  )
}
