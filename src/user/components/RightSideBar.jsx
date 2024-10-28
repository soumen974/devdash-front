import React, { useState } from 'react'
import { PanelRightOpen  } from "lucide-react";
import { Link } from 'react-router-dom';
import Logo  from "../assets/Logo.svg";
import { useQuery } from "@tanstack/react-query";


export default function RightSideBar(props) {

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  // const [issidebar, setissidebar] = useState(true);
  const setissidebar=props.setissidebar;
  const issidebar=props.issidebar;
  return (
    <>
       <aside  id="cta-button-sidebar" className={` ${issidebar? " mr-0   ": " -mt-[53rem] md:-mr-80 "} w-[17rem] text-white bg-[#14161D] z-20 mt-[4rem]   max-md:h-[94vh]   max-md:absolute  max-md:right-0  `} aria-label="Sidebar">
         <div className="h-[88vh] divide-y-[1px] divide-[#2d313f] flex gap-3 flex-col px-3 py-4  ">
            <Link to="/dashboard/gemini" className='hover:bg-[#262936] rounded-lg p-3' >Create a new Chat</Link>

          <div className=' relative overflow-y-scroll py-2'>
            
                {isPending
                ? "Loading.."
                : error
                ? "Something went wrong"
                : data?.map((chat) => (
                    <Link
                    key={chat._id}
                      to={`/dashboard/gemini/chats/${chat._id}`}
                      className='flex flex-col hover:bg-[#262936] rounded-lg p-3'
                    >
                      {chat.title}
                    </Link>
                  ))}


            

          </div>

          <div className={` ${issidebar? "":"max-md:hidden"} flex fixed bottom-0 w-full `}>
            <img src={Logo} alt="" />
            <span className='p-4'>Upgrade plan</span>
          </div>
         </div>
         <span title='chat history ' onClick={()=>{setissidebar(!issidebar)}} 
         className={` hover:bg-[#2c2c2c]  cursor-pointer py-2  w-fit px-2 absolute right-8 ${!issidebar?"-bottom-14":" bottom-2"}  md:bottom-2 rounded-full`}>< PanelRightOpen className='text-[#FD356E] p-0.5' /></span>

      </aside>
      <span onClick={() => { setissidebar(false); }} className={`fixed w-full  z-10 h-screen  md:hidden  ${!issidebar ? 'hidden  ' : 'bg-[#07010459] block'}`}></span>

    </>
  )
}
