import React from 'react'
import Logo from "../assets/Logo.svg";
export default function Navbar() {
  return (
    <>
    <div className="text-white items-center  py-4 border backdrop-blur-2xl bg-gradient-to-b border-neutral-800 from-inherit bg-zinc-800/30 ">
    <div className="mx-auto max-w-7xl ">

        <div className="text-white flex justify-between items-center  ">
           <div className="flex  items-center">
            <img src={Logo} className='h-8 w-8 ' alt="" />
            <h1 className='font-bold text-3xl text-[#fd356e]'>Dash</h1>
           </div>
            <div className=" flex gap-5">
                {["Product", "Features","Sign in"].map((item, index) => (<a key={index} href="#" className={`text-md font-semibold  ${index==2? 'ml-8  text-[#fd356e]':'ml-0 text-gray-300'}`}>{item}</a>))}
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
