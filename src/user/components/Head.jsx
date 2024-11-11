import React, { useState ,useEffect} from 'react'
import axios from "axios";
import pagelogo from "../assets/Logo.svg";
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import SideBar from './SideBar';
import RightSideBar from "./RightSideBar";
import { Search } from 'lucide-react';
import {User ,ChevronDown ,Mail ,SunMoon } from 'lucide-react';
import { useUserImage } from './PersonalDataList';




const Notification=({className})=>{
  return (
     <svg width="11" height="13" viewBox="0 0 11 13"  xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M1.16667 9.33333H9.33333V5.26832C9.33333 3.00304 7.50517 1.16667 5.25 1.16667C2.99484 1.16667 1.16667 3.00304 1.16667 5.26832V9.33333ZM5.25 0C8.14952 0 10.5 2.3587 10.5 5.26832V10.5H0V5.26832C0 2.3587 2.35051 0 5.25 0ZM3.79167 11.0833H6.70833C6.70833 11.8887 6.05541 12.5417 5.25 12.5417C4.44459 12.5417 3.79167 11.8887 3.79167 11.0833Z" />
</svg>

   );

}


export default function Head({sideBar, setsideBar}) {
  const { imageUrl } = useUserImage();
//  const [] = useState(false);

 const [message, setMessage] = useState('');
  const [developerData, setDeveloperData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/auth/protected`, { withCredentials: true });
        setMessage(response.data.message);
        setDeveloperData(response.data.developer_data);
        setLoading(false);
        setError('');
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching data');
        setLoading(true);
        navigate('/auth/login');
      }
    };

    fetchData();
  }, []);



  // if (error) {
  //   return <p className="text-red-500">{error}</p>;
  // }
      
  return (
    <>
    <div className="">
        {/* <SideBar  isSidebarOpen={sideBar} setIsSidebarOpen={setsideBar}/> */}
        {/* <RightSideBar/> */}

       
        <div className="  ">
          <div className=" bg-[#101219]   fixed w-screen z-40">
            <div className="  ">
              
              <nav aria-label="Top" className=" h-16 items-center flex md:mr-[20rem] justify-between ">
              
                <div className="flex justify-around  ">
                  
                  <div className=" flex md:hidden     gap-4 justify-start  ">
                    <button   onClick={() => setsideBar(!sideBar)} className="  flex justify-center items-center ml-4  p-2   text-sm text-gray-300 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                      </svg>
                    </button>

                    <div className=" justify-center items-center  flex ">
                      
                      <a href="/" className='flex justify-center items-center gap-3 '>
                      <span className="sr-only">Your Company</span>
                      <img
                          className="h-7  w-7 rounded-full"
                          src={pagelogo}
                          alt=""
                      />
                        <h1 className='text-white text-xl font-semibold '>FoxDash</h1>

                      

                      </a>
                    </div>
                  </div>

                  <form  className={` ml-5 transition-all ease-in-out duration-500 flex items-center`}>
                  
                  <div className="relative ">
                    <input
                      id="search"
                      type="text"
                      // value={searchTerm}
                      // onChange={handleChangeField}
                      // onKeyDown={handleChangeField}
                      className="sm:block w-full hidden sm:max-w-lg pl-8 px-2  py-1 bg-transparent placeholder:text-gray-500   text-md text-gray-300  focus:outline-none "
                      placeholder='Type to search...'
                      required
                    />
                    <button
                      // onClick={handleSearch}
                      className="sm:absolute max-sm:hidden  bg-gray-00 left-0 bottom-2 pr-2 font-medium text-sm text-gray-400 hover:text-gray-300"
                    >
                      <Search className=" size-5" />
                    </button>

                   
                    
                  </div>
                  </form>


                </div>
                
                <div className="text-white flex gap-2 relative ">

                  <button
                      // onClick={handleSearch}
                      className="sm:hidden  pr-2 font-medium text-sm text-gray-400"
                    >
                      <Search className=" size-6" />
                    </button>

                    <div className="text-white flex items-center   gap-2 relative">
                  
                      <div className=" items-center flex rounded-full p-2  before:w-2 before:h-2 h-full w-fit before:absolute before:left-7 before:opacity-75 before:animate-ping  before:top-0 before:bg-red-500 before:rounded-full     after:w-2 after:h-2 after:absolute after:left-7   after:top-0 after:bg-red-500 after:rounded-full ">
                        <Notification className="w-6 h-6 p  fill-white" />
                      </div>
                      <div className="flex  group    items-center gap-1">
                        <div className="   ">
                          
                          {imageUrl ? <img className='w-9 h-9 rounded-full' src={imageUrl} alt="User" />
                          : <div className="bg-gray-700  rounded-full p-2"> <User className='w-6 h-6  ' /></div>
                          }
                        </div>
                        <div className="relative">
                          <ChevronDown className='h-4 w-4 ' />
                          <div className="absolute   group-hover:grid hidden items-center gap-1  shadow-md  top-8 bg-[#1A1B21] rounded-md p-5  -right-5">
                            <p className='text-white flex gap-2 text-md'><User className='h-5 w-5'/> {developerData.username}</p>
                            <p className='text-white flex gap-2  '><Mail className='h-5 w-5' /> {developerData.email}</p>
                            {/* <p className='text-white'>{developerData.id}</p> */}
                            <p className='text-white flex gap-2'><SunMoon className='h-5 w-5' />Appearance</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                
                              
            </nav>
              
            </div>
          </div>
        </div>

     </div>
       


       

    </>
  )
}