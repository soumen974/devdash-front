import React, { useState ,useEffect} from 'react'
import axios from "axios";
import pagelogo from "../assets/Logo.svg";
import { useNavigate } from 'react-router-dom';
import DialogBox from '../../components/DialogBox';
import SideBar from './SideBar';
import RightSideBar from "./RightSideBar";
import { Search } from 'lucide-react';
import {User ,ChevronDown  } from 'lucide-react';




const Notification=({className})=>{
  return (
     <svg width="11" height="13" viewBox="0 0 11 13"  xmlns="http://www.w3.org/2000/svg" className={className}>
<path d="M1.16667 9.33333H9.33333V5.26832C9.33333 3.00304 7.50517 1.16667 5.25 1.16667C2.99484 1.16667 1.16667 3.00304 1.16667 5.26832V9.33333ZM5.25 0C8.14952 0 10.5 2.3587 10.5 5.26832V10.5H0V5.26832C0 2.3587 2.35051 0 5.25 0ZM3.79167 11.0833H6.70833C6.70833 11.8887 6.05541 12.5417 5.25 12.5417C4.44459 12.5417 3.79167 11.8887 3.79167 11.0833Z" />
</svg>

   );

}


export default function Head({sideBar, setsideBar}) {
 
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

  if (loading) {
    return <div className='bg-[#19191C] z-50 fixed w-full h-full flex justify-center items-center'>
      <div role="status">
      <svg aria-hidden="true" class="w-8 h-8  animate-spin text-gray-800 fill-[#FD356E]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
    </div>;
  }

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
              
              <nav aria-label="Top" className=" h-16 items-center flex mr-[20rem] justify-between ">
              
                <div className="flex justify-around gap-20 ">
                  
                  <div className=" flex md:hidden     gap-4 justify-start  ">
                    <button   onClick={() => setsideBar(!sideBar)} className="  flex justify-center items-center  p-2   text-sm text-gray-300 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                      </svg>
                    </button>

                    <div className=" justify-center items-center  flex lg:ml-0">
                      
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

                  <form  className={`  transition-all ease-in-out duration-500 flex items-center`}>
                  
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
                      className="sm:absolute max-sm:hidden  bg-gray-00 left-0 bottom-2 pr-2 font-medium text-sm text-gray-400"
                    >
                      <Search className=" size-5" />
                    </button>

                   
                    
                  </div>
                  </form>


                </div>
                
                <div className="text-white flex gap-2 relative">

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
                      <div className="flex  group   items-center gap-1">
                        <div className="  rounded-full  ">
                          {/* <User/> */}
                          <img className='w-9 h-9 rounded-full' src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-focus-face.jpg?auto=avif,webp&format=jpg&width=950" alt="" />
                        </div>
                        <div className="relative">
                          <ChevronDown className='h-4 w-4 ' />
                          <div className="absolute group-hover:block hidden top-10 bg-gray-500 p-5  -right-5">
                          <p className='text-white'><strong>Username:</strong> {developerData.username}</p>
                          <p className='text-white'><strong>ID:</strong> {developerData.id}</p>
                          <p className='text-white'><strong>Email:</strong> {developerData.email}</p>

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