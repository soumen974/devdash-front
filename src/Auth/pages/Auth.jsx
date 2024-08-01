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


        </div>
    </div>
  )
}
