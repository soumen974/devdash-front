import React, { useState } from 'react'
import pagelogo from "../assets/Logo.svg";
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import SideBar from './SideBar';
import { Search } from 'lucide-react';

export default function Head() {
 
 const [sideBar, setsideBar] = useState(true);
      
  return (
    <>
        <SideBar  isSidebarOpen={sideBar} setIsSidebarOpen={setsideBar}/>
       
        <div className=" sm:ml-64">
          <div className="">
           <div className=" pl-4 bg-[#101219] fixed w-full z-40 ">
            
            <nav aria-label="Top" className="  ">
            
              <div className="flex border-b border-gray-200 h-16 items-center">
                
                <button
                    type="button"
                    className="relative rounded-md bg-white p-2 text-gray-400 sm:hidden"
                    onClick={() => setsideBar(!sideBar)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    <div className=" flex justify-center items-center gap-3 max-lg:pr-2">
                 
                        <div className="  hover:bg-[#6e6e6e53] px-3 py-2     rounded-md   lg:hidden ">
                            <div className="w-5 p-[1px]  bg-transparent border-b-[1px] border-[#ffffff7d] my-[6px]  "></div>
                            <div className="w-5 p-px bg-transparent border-b-[1px] border-[#ffffff7d]  my-[6px] "></div>
                        </div>
                    </div>
                  </button>

                {/* search bar */}
                {/* <form className="ml-4   flex lg:ml-0">
                  
                  <button className='text-gray-200' type="submit">
                    <Search/>
                  </button>
                  <input className='border-b outline-none' type="text" name=""  placeholder='search' id="" />
                </form> */}

                <form  className=" ">
                <label htmlFor="search" className="mb-2 mr-5 text-md font-medium absolute  left-12 bottom-4  text-gray-500">
                  Search..
                </label>
                <div className="relative ">
                  <input
                    id="search"
                    type="text"
                    // value={searchTerm}
                    // onChange={handleChangeField}
                    // onKeyDown={handleChangeField}
                    className="block w-full sm:max-w-lg pl-20 px-2  py-1 bg-transparent placeholder:text-gray-500   text-md text-gray-300 border-b border-[#424242] focus:outline-none focus:ring-yellow-500"
                    
                    required
                  />
                  <button
                    // onClick={handleSearch}
                    className="absolute bg-gray-00 left-0 bottom-2 pr-2 font-medium text-sm text-gray-400"
                  >
                    <Search className=" size-6" />
                  </button>
                </div>
              </form>

               

               
              </div>
            
           </nav>
            
           </div>
          </div>
      </div>
       


       

    </>
  )
}