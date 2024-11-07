import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Loader2, PanelRightOpen, Trash2 } from 'lucide-react'; // Import Trash icon
import Logo from '../assets/Logo.svg';
import { useQuery } from '@tanstack/react-query';

export default function RightSideBar(props) {
  const { isPending, error, data } = useQuery({
    queryKey: ['userChats'],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API}/api/userchats`, {
        credentials: 'include',
      }).then((res) => res.json()),
  });

  const { setissidebar, issidebar } = props;
  const location = useLocation();

  // Function to handle delete
  const handleDelete = (chatId) => {
    // Implement your delete functionality here, like an API call to delete chat
    console.log(`Delete chat with ID: ${chatId}`);
  };

  return (
    <>
      <aside
        id="cta-button-sidebar"
        className={`${
          issidebar ? 'mr-0' : '-top-[80rem] md:-mr-80'
        } w-[17rem] text-white bg-[#14161D] z-20 mt-[4rem] max-md:h-[93.2vh] max-md:absolute max-md:right-0`}
        aria-label="Sidebar"
      >
        <div className="h-[88vh] divide-y-[1px] divide-[#2d313f] flex gap-3 flex-col px-3 py-4">
          <Link
            to="/dashboard/gemini"
            className={`hover:bg-[#262936] rounded-lg p-3 ${
              location.pathname === '/dashboard/gemini' ? 'bg-[#262936]' : ''
            }`}
          >
            Create a new Chat
          </Link>
          <div className="relative flex flex-col-reverse overflow-y-scroll py-2">
            {isPending ? (
              <Loader2 className="relative left-28 size-8 animate-spin" />
            ) : error ? (
              <p>Something went wrong</p>
            ) : (
              data.map((chat) => (
                <div
                  key={chat._id}
                  className="relative flex items-center hover:bg-[#262936] rounded-lg group"
                >
                  <Link
                    onClick={() => {
                      setissidebar(false);
                    }}
                    to={`/dashboard/gemini/chats/${chat._id}`}
                    className={`flex-grow ${
                      location.pathname === `/dashboard/gemini/chats/${chat._id}`
                        ? 'bg-[#262936] p-3 rounded-lg'
                        : 'p-3'
                    }`}
                  >
                    {chat.title}
                  </Link>

                  {/* Delete button, shown when link is active or on hover */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the link click
                      handleDelete(chat._id);
                    }}
                    className={`ml-2 opacity-0 group-hover:opacity-100 text-red-500 absolute right-2 top-1/2 transform -translate-y-1/2 ${
                      location.pathname === `/dashboard/gemini/chats/${chat._id}`
                        ? 'opacity-100'
                        : ''
                    }`}
                    title="Delete chat"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className={`${issidebar ? '' : 'max-md:hidden'} flex fixed bottom-0 w-full`}>
            <img src={Logo} alt="" />
            <span className="p-4">Upgrade plan</span>
          </div>
        </div>
        <span
          title="chat history"
          onClick={() => {
            setissidebar(!issidebar);
          }}
          className={`hover:bg-[#2c2c2c] cursor-pointer py-2 w-fit px-2 fixed bottom-0 right-8 ${
            !issidebar ? '-bottom-14' : 'bottom-2'
          } md:bottom-2 rounded-full`}
        >
          <PanelRightOpen className="text-[#FD356E] p-0.5" />
        </span>
      </aside>
      <span
        onClick={() => {
          setissidebar(false);
        }}
        className={`fixed w-full z-10 h-screen md:hidden ${
          !issidebar ? 'hidden' : 'bg-[#07010459] block'
        }`}
      ></span>
    </>
  );
}
