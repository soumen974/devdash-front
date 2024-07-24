import React from 'react'
import Logo from "../assets/Logo.svg";
import { Menu } from 'lucide-react';
export default function Navbar() {
  return (
    <>
    <div className="text-white items-center px-3 lg:px-9 py-3 border-b border-[#5e5e5e7a]   backdrop-blur-sm    ">
      <div className="mx-auto max-w-7xl ">

          <div className="text-white flex justify-between items-center  ">
            <div className="flex  items-center">
              <img src={Logo} className='h-6 w-6 md:h-6 md:w-6 ' alt="" />
              <h1 className='font-bold text-xl md:text-3xl text-[#fd356e]'>FoxDash</h1>
            </div>
              <div className=" flex justify-center items-center gap-3 max-lg:pr-2">
                  {["Product", "Features","Sign in"].map((item, index) => (<a key={index} href="#" className={`text-md font-semibold   ${index==2? ' lg:text-[#fd356e] hover:shadow-md max-lg:bg-[#fd356e] max-lg:hover:shadow-[#fd356e52] py-2 px-4  rounded-md ':'ml-0 text-gray-300 hidden lg:block'}`}>{item}</a>))}
                 
                  <div className="  hover:bg-[#6e6e6e53] px-3 py-2     rounded-md   lg:hidden ">
                    <div className="w-5 p-[1px]  bg-transparent border-b-[1px] border-[#ffffff7d] my-[6px]  "></div>
                    <div className="w-5 p-px bg-transparent border-b-[1px] border-[#ffffff7d]  my-[6px] "></div>
                  </div>
              </div>
              
          </div>
      </div>
    </div>
    </>
  )
}
