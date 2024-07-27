import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'

export default function Auth() {

    const handlesignUp= async(e)=>{
        e.preventDefault();
        try{
         const response=   await fetch('http://localhost:5000/auth/register',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(''),
            });
            const responseData=await response.json();
            if(response.ok){

            }else{

            }
        }catch(error){
            if(error.response){
                console.log(error.response.data.error?.[0]?.msg|| error.response.data.error|| 'failed register');

            }else{
                console.log('unknown issue , registrestion failed');
            }
        }
    }

  return (
    <div className="bg-[#19191C] h-screen flex justify-center items-center text-white">
        <div className=' mx-auto max-w-xl'>

            {/* <div className=" z-0 fixed  right-0 bottom-0">
                        <svg width="727" height="832" viewBox="0 0 727 832" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_12_324)">
                <ellipse cx="717.811" cy="546.004" rx="32.412" ry="256.973" transform="rotate(-122.672 717.811 546.004)" fill="#FD356E"/>
                </g>
                <defs>
                <filter id="filter0_f_12_324" x="0.7789" y="-95.4007" width="1434.06" height="1282.81" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_12_324"/>
                </filter>
                </defs>
                </svg>

            </div> */}

            <div className=" z-10 px-10 ">
                <form className='border border-[#3C3C3C] p-14 rounded-2xl' >
                    <h1 className="text-4xl font-bold tracking-tight text-gray-00 sm:text-5xl">
                    Create a account
                    </h1>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input type="email" className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent" />
                    </div>
                    
                    
                    <div className="mt-6">
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FD356E] hover:bg-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800">
                        Sign in
                        </button>
                    </div>
                </form>
            </div>

{/* 
            <div className="z-0 absolute left-0 bottom-0">
                <svg width="871" height="701" viewBox="0 0 871 701" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_f_12_323)">
                <ellipse cx="269.389" cy="626.581" rx="32.412" ry="158.563" transform="rotate(38.1242 269.389 626.581)" fill="#FD356E"/>
                </g>
                <defs>
                <filter id="filter0_f_12_323" x="-331.793" y="0.230469" width="1202.36" height="1252.7" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_12_323"/>
                </filter>
                </defs>
                </svg>
            </div> */}
        </div>
    </div>
  )
}
