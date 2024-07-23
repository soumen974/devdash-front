import React from 'react'
import Logo from "../assets/Logo.svg";
import { Menu } from 'lucide-react';
export default function Navbar() {
  return (
    <>
    <div className="text-white items-center px-3 lg:px-9 py-4 border-b-[1px] border-[#434343c4] backdrop-blur-2xl bg-gradient-to-b border-neutral-100 from-inherit bg-zinc-800/30 ">
      <div className="mx-auto max-w-7xl ">

          <div className="text-white flex justify-between items-center  ">
            <div className="flex  items-center">
              <img src={Logo} className='h-6 w-6 md:h-6 md:w-6 ' alt="" />
              <h1 className='font-bold text-xl md:text-3xl text-[#fd356e]'>Dash</h1>
            </div>
              <div className="hidden  lg:flex gap-5">
                  {["Product", "Features","Sign in"].map((item, index) => (<a key={index} href="#" className={`text-md font-semibold  ${index==2? 'ml-8  text-[#fd356e]':'ml-0 text-gray-300'}`}>{item}</a>))}
              </div>
              <div className="block lg:hidden">
                <Menu/>
              </div>
          </div>
      </div>
    </div>
    </>
  )
}
