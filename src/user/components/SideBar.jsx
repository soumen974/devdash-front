import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DialogBox from '../../components/DialogBox';
import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { PencilSquareIcon,BeakerIcon,PlusIcon} from '@heroicons/react/24/outline';
import { SquarePen,Delete } from 'lucide-react';

import pagelogo from "../assets/Logo.svg";
import { Settings2,LogOut ,House  } from 'lucide-react';



const Addreminder=({className})=>{
   return (
    
   <svg className={className}width="18" height="24" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
   <path d="M5.83333 11.6667C2.61167 11.6667 0 9.05497 0 5.83333C0 2.61167 2.61167 0 5.83333 0C9.05497 0 11.6667 2.61167 11.6667 5.83333C11.6667 9.05497 9.05497 11.6667 5.83333 11.6667ZM5.83333 10.5C8.41068 10.5 10.5 8.41068 10.5 5.83333C10.5 3.256 8.41068 1.16667 5.83333 1.16667C3.256 1.16667 1.16667 3.256 1.16667 5.83333C1.16667 8.41068 3.256 10.5 5.83333 10.5ZM6.41667 5.83333H8.75V7H5.25V2.91667H6.41667V5.83333Z" />
   </svg>

    );
    

}


const Pageicon=({className})=>{
   return (
    
      <svg className={className} width="18" height="24" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6667 11.8333H1.33333C1.01117 11.8333 0.75 11.5721 0.75 11.25V0.749959C0.75 0.427796 1.01117 0.166626 1.33333 0.166626H10.6667C10.9888 0.166626 11.25 0.427796 11.25 0.749959V11.25C11.25 11.5721 10.9888 11.8333 10.6667 11.8333ZM10.0833 10.6666V1.33329H1.91667V10.6666H10.0833ZM3.08333 2.49996H5.41667V4.83329H3.08333V2.49996ZM3.08333 5.99996H8.91667V7.16663H3.08333V5.99996ZM3.08333 8.33329H8.91667V9.49996H3.08333V8.33329ZM6.58333 3.08329H8.91667V4.24996H6.58333V3.08329Z" />
      </svg>
  
   
   
    );
    

}

const Aicontent=({className})=>{
   return (
     
   <svg className={className} width="18" height="24" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
   <path d="M5.57308 9.78547C5.37626 10.2362 4.75254 10.2362 4.55575 9.78547L4.04379 8.61285C3.58818 7.56939 2.76812 6.73872 1.74519 6.28465L0.336019 5.65915C-0.112007 5.46029 -0.112006 4.80852 0.336019 4.60965L1.70118 4.00367C2.75041 3.53792 3.58518 2.67651 4.03301 1.59741L4.55161 0.347797C4.74404 -0.115932 5.38478 -0.115933 5.57722 0.347797L6.09581 1.59742C6.54363 2.67651 7.37838 3.53792 8.42762 4.00367L9.7928 4.60965C10.2408 4.80852 10.2408 5.46029 9.7928 5.65915L8.38364 6.28465C7.36071 6.73872 6.54066 7.56939 6.08501 8.61285L5.57308 9.78547ZM2.02942 5.1344C3.36283 5.72629 4.44703 6.69917 5.0644 8.0378C5.68181 6.69917 6.766 5.72629 8.09938 5.1344C6.75007 4.53545 5.66245 3.51514 5.06441 2.15272C4.46637 3.51515 3.37874 4.53545 2.02942 5.1344ZM10.6988 12.6405L10.8428 12.3105C11.0995 11.7221 11.5618 11.2537 12.1386 10.9974L12.5821 10.8003C12.822 10.6937 12.822 10.3451 12.5821 10.2385L12.1634 10.0524C11.5717 9.78955 11.1012 9.30375 10.8489 8.6954L10.701 8.3388C10.598 8.0903 10.2544 8.0903 10.1513 8.3388L10.0035 8.6954C9.75127 9.30375 9.28069 9.78955 8.68901 10.0524L8.27024 10.2385C8.03037 10.3451 8.03037 10.6937 8.27024 10.8003L8.71381 10.9974C9.29066 11.2537 9.7529 11.7221 10.0096 12.3105L10.1536 12.6405C10.2589 12.882 10.5934 12.882 10.6988 12.6405ZM10.0998 10.5154L10.4279 10.1895L10.7492 10.5154L10.4279 10.8321L10.0998 10.5154Z" />
   </svg>
   
    );
 
}




const Classtimetable=({className})=>{
   return (
   
   <svg className={className} width="18" height="24" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
   <path d="M2.91667 1.16667V0H4.08333V1.16667H7.58333V0H8.75V1.16667H11.0833C11.4055 1.16667 11.6667 1.42784 11.6667 1.75V4.66667H10.5V2.33333H8.75V3.5H7.58333V2.33333H4.08333V3.5H2.91667V2.33333H1.16667V10.5H4.66667V11.6667H0.583333C0.26117 11.6667 0 11.4055 0 11.0833V1.75C0 1.42784 0.26117 1.16667 0.583333 1.16667H2.91667ZM8.75 6.41667C7.46136 6.41667 6.41667 7.46136 6.41667 8.75C6.41667 10.0386 7.46136 11.0833 8.75 11.0833C10.0386 11.0833 11.0833 10.0386 11.0833 8.75C11.0833 7.46136 10.0386 6.41667 8.75 6.41667ZM5.25 8.75C5.25 6.81701 6.81701 5.25 8.75 5.25C10.683 5.25 12.25 6.81701 12.25 8.75C12.25 10.683 10.683 12.25 8.75 12.25C6.81701 12.25 5.25 10.683 5.25 8.75ZM8.16667 7V8.99162L9.50419 10.3291L10.3291 9.50419L9.33333 8.50838V7H8.16667Z" />
   </svg>
   
    );
 
}

const Worklist=({className})=>{
   return (
     
    <svg width="18" height="24" viewBox="0 0 11 12" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.91667 11.6667H0.583333C0.26117 11.6667 0 11.4055 0 11.0833V0.583333C0 0.26117 0.26117 0 0.583333 0H9.91667C10.2388 0 10.5 0.26117 10.5 0.583333V11.0833C10.5 11.4055 10.2388 11.6667 9.91667 11.6667ZM9.33333 10.5V1.16667H1.16667V10.5H9.33333ZM2.91667 2.91667H7.58333V4.08333H2.91667V2.91667ZM2.91667 5.25H7.58333V6.41667H2.91667V5.25ZM2.91667 7.58333H7.58333V8.75H2.91667V7.58333Z" />
   </svg>

    
    );
}




const SideBar = (Props) => {
  const isSidebarOpen=Props.isSidebarOpen
  const setIsSidebarOpen = Props.setIsSidebarOpen;
  const [Dialogopen, setDialogopenOpen] = useState(false);
  const [Loading, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
   localStorage.removeItem('SellerToken');
   localStorage.removeItem('ShopId');
   localStorage.removeItem('isAdmin');
   localStorage.removeItem('note');
   // navigate('/seller/categoriesadd');
   setLoader(true);
   setTimeout(() => {
     navigate('/seller/Login')
   }, 1500);
   
   
 };

//  ----

const authLogout = async () => {
   try {
     // Make a request to the backend to clear the cookie and log out
     await axios.post(`${process.env.REACT_APP_API}/auth/logout`,{}, { withCredentials: true });
   //   alert('Logout successful');
   setTimeout(() => {
      // navigate('/');
      window.location.reload();

   }, 1000);
   } catch (error) {
     console.error('Logout failed:', error);
   }
 };




//  ----new order count ---
  const [orderItems, setOrderItems] = useState([]);

  const navLinks=[
   { title: 'Dashboard', path: '/dashboard' },
   { title: 'Add to work list', path: '/dashboard/worklist' },
   { title: 'Add Reminder', path: '/dashboard/reminder' },
   { title: 'Add class Time table', path: '/dashboard/classtimetable' },
   { title: 'Your Portfolio', path: '/dashboard/portfolio' },
   { title: 'Try Gemini', path: '/dashboard/gemini'}
  ]

  const navLink_bottom=[
   { title: 'Settings', path: '/', icon: <Settings2 className=' w-5 h-5' /> },
   { title: 'Logout', path: '/', icon: <LogOut className=' w-5 h-5' /> }

  ]

  return (
    <>
      <aside  id="cta-button-sidebar" className={`fixed top-0 left-0 z-40  w-64 h-screen transition-transform ${!isSidebarOpen? "translate-x-0  md:translate-x-0": " -translate-x-full  md:translate-x-0  "} `} aria-label="Sidebar">
         <div className="h-full divide-y-[1px] divide-[#2d313f] flex justify-between  flex-col px-3 py-4 overflow-y-auto bg-[#14161D]">
           
            <div className="">
               <div className="flex items-center gap-4 justify-start pb-5 ">
                  <button  onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} className=" flex justify-center items-center  p-2  ms-3 text-sm text-gray-300 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                     <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                     <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                     </svg>
                  </button>

                 
               </div>
               
               <ul className="space-y-2 font-medium">
                 
 
               {navLinks.map((link) => (
               <li onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} key={link.title}>
                  <NavLink
                  title={link.title}
                     to={link.path}
                     end={link.path === '/dashboard'}
                     className={({ isActive }) =>
                     `flex items-center ${isActive ? 'text-[#FD356E]' : 'text-white'} 
                     ${!isSidebarOpen ? 'py-3 pl-6 rounded-md' : 'p-3 flex rounded-lg justify-start'} 
                     hover:bg-[#262936] dark:hover:bg-gray-700 group`
                     }
                  >
                     <div className={({ isActive }) =>`flex-shrink-0  text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white `}>
                     {link.title==='Dashboard' ? <House className={({ isActive }) =>`${isActive ? 'text-[#FD356E]' : 'text-white'} transition-all ease-in-out duration-500   w-5 h-5`}/>
                      : link.title==='Add to work list' ? <Worklist className={({ isActive }) =>`${isActive ?'fill-[#FD356E]':'fill-white'} transition-all ease-in-out duration-500  w-5 h-5`} /> 
                      : link.title==='Add Reminder' ? <Addreminder className={({ isActive }) =>`${isActive ?'fill-[#FD356E]':'fill-white'} transition-all ease-in-out duration-500  w-5 h-5`} />
                      : link.title==='Add class Time table' ? <Classtimetable className={({ isActive }) =>`${isActive ?'fill-[#FD356E]':'fill-white'} transition-all ease-in-out duration-500  w-5 h-5`}/> 
                       : link.title==='Your Portfolio' ? <Pageicon className={({ isActive }) =>`${isActive ?'fill-[#FD356E]':'fill-white'} transition-all ease-in-out duration-500  w-5 h-5`}/>
                       : link.title==='Try Gemini' ? <Aicontent className={({ isActive }) =>`${isActive ?'fill-[#FD356E]':'fill-white'} transition-all ease-in-out duration-1000   w-5 h-5`}/>  
                       : null}
                     </div>
                     <span className={`${!isSidebarOpen ? "" : ""} text-start transition-left ease-in-out duration-500 ms-3`}>
                     {link.title}
                     </span>
                  </NavLink>
               </li>
               ))}
                 
                  
               
               </ul>
            </div>

            <ul className="space-y-2 pt-2 font-medium">
            {/* navigation.categories.slice(0, 1) */}
            {navLink_bottom.slice(0, 1).map((links) => (
               <li onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}} key={links.title}>
               <Link to={links.path} title={links.title} className={`flex items-center ${!isSidebarOpen? 'py-3 pl-6  rounded-full':'p-3 flex rounded-lg justify-start'}   text-white hover:bg-[#262936] dark:hover:bg-gray-700 group`}>
               <div  className="flex-shrink-0  text-gray-500   dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                  {links.icon}</div>
                  <span className={`    transition-left ease-in-out duration-500  ms-3`}>{links.title}</span>
               </Link>
               </li>
            ))}

         {navLink_bottom.slice(1, 2).map((links) => (
                        <li onClick={authLogout} key={links.title}>
                        <Link to={links.path} title={links.title} className={`flex items-center ${!isSidebarOpen? 'py-3 pl-6  rounded-full':'p-3 flex rounded-lg justify-start'}   text-white hover:bg-[#262936] dark:hover:bg-gray-700 group`}>
                        <div  className="flex-shrink-0  text-gray-500   dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" >
                           {links.icon}</div>
                           <span className={`    transition-left ease-in-out duration-500  ms-3`}>{links.title}</span>
                        </Link>
                        </li>
            ))}
                  
            </ul>


            
         </div>
      </aside>
      <span onClick={() => { setIsSidebarOpen(true); }} className={`fixed w-full  z-44 h-screen  ${!isSidebarOpen ? 'sm:hidden flex' : 'max-sm:hidden'}`}></span>
            <DialogBox 
               open={Dialogopen}
               setOpen={setDialogopenOpen} 
               title={"Session Logout"}
               message={"Are you sure you want to Logout your account ,then you have to Login agin to access your account."}
               ActionButtonName={"Logout"}
               ActionButtonColorRed={true}
               IconName={false}
               handleLogic={handleLogout}
               Loading={Loading}
               />


    </>
  );
};

export default SideBar;