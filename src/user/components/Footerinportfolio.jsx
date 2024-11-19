import React from 'react'
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaUpwork } from "react-icons/fa6";
import { Sendsocialdat  } from "./SocialMediaCRUD";

export default function Footerinportfolio() {
    const { socials } = Sendsocialdat();
    const { isLoading } = Sendsocialdat();

   
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[250px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-zinc-800 rounded mb-4"></div>
            <div className="h-4 w-48 bg-zinc-800 rounded"></div>
          </div>
        </div>
      );
    }
    
    if (!Array.isArray(Object.values(socials)) || Object.values(socials).length === 0) {
        return <div>No social media </div>;
      }
  return (
    <div>
        <footer className='py-5' >
          <h2 className='flex justify-center text-xl text-white font-light py-6'>Follow me </h2>
          {Object.values(socials).map((social) => (
            <div className=" flex justify-evenly px-0 sm:px-32">
                <a href={social.github}><FaGithub className='h-6 w-6 text-white '/></a>
                <a href={social.linkedin}><FaLinkedin className='h-6 w-6 text-white'/></a>
                <a href={social.x}><RiTwitterXFill className='h-6 w-6 text-white'/></a>
                <a href={social.insta}><FaInstagram className='h-6 w-6 text-white'/></a>
                <a href={social.upwork}><FaUpwork className='h-6 w-6 text-white'/></a>
            </div>
            ))}
        </footer>
    </div>
  )
}


