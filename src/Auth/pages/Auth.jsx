import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import MessageBox from "../../components/MessageBox";
import axios from 'axios';
import LoaderSpin from "../../components/LoaderSpin";
import VerifyMail from "../components/VerifyMail";
import AdData from "../components/AdData";
import { Link } from 'react-router-dom';
import google from "../../user/assets/google-logo-9808.png";
import Logo from "../../components/assets/Logo.svg";
import github from "../assets/github-mark-white.png";



export default function Auth() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const[loading,setLoading] = useState(false);
    const[isCodeSend,setIsCodeSend] = useState(false);
    const [isoktoProceed, setIisoktoProceed] = useState(false);

  
    const handleSubmit = async (e) => {
        setLoading(true);
      e.preventDefault();
      setMessage('');
      setError('');
  
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, { email });
        setMessage(response.data.message);
        setLoading(false);
        setIsCodeSend(true);
       
        setError('');
      } catch (err) {
        setLoading(false);
        setMessage('');
        if (err.response && err.response.data && err.response.data.errors) {
          setError(err.response.data.errors.map(e => e.msg).join(', '));
        } else if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    };

    const handleOAuthGoogleLogin = () => {
      // setLoading(true);
      window.location.href = `${process.env.REACT_APP_API}/auth/google`;
    };

  return (
    <div className="bg-[#19191C] h-screen text-white">
        <div className=' '>

        <MessageBox servermessage={message } error={error} />
        

        <div className=" md:grid rounded grid-cols-[50%,50%]    xl:grid-cols-[60%,40%] h-screen  ">
           <div className=" overflow-hidden relative  hidden md:block  bg-[#FD356E]  p-20 lg:p-40"></div>

           <div className="w-full relative overflow-hidden  bg-red-00 h-screen flex justify-center items-center p-4 md:p-12">
           <div className="bg-[#FD356E] block md:hidden p-5 absolute w-full top-0  right-0"></div>
           <img src={Logo} className='bg-[#3C3C3C] border-[#3C3C3C] border md:hidden rounded-full p-2 absolute top-5  right-5' alt="" />

           {!isCodeSend?
            
            <form onSubmit={handleSubmit} className=' grid   gap-10 z-10  backdrop-blur-4xl   p-8 md:p-[8vw] w-full  rounded-2xl' >
                  
                <div className="">
                    <h1 className="text-4xl  tracking-tight text-gray-00 ">
                  Register
                  </h1>
                  <h1 className=" mt-2 font-thin tracking-tight text-gray-00 text-xl">
                  Create your account
                  </h1>
                </div>

                <div className="">

                  <div className=" ">
                      <label className="block text-sm font-medium text-gray-400">Email</label>
                      <input  type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                          className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                          />
                  </div>
                  
                  
                  <div className="mt-6">
                  <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#FD356E] hover:bg-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                      loading ? 'cursor-wait' : ''
                  }`}
  >                         {loading ? <LoaderSpin /> :"Create"}
                      </button>

                  </div>

                  <div className="divide-y-[1px] relative  divide-[#2d313f] text-white ">
                    <div className="p-4 after:-ml-5 after:content-['OR'] after:text-sm after:absolute after:left-1/2  after:top-3 after:bg-[#19191C] after:p-4 after:pb-2   after:text-[#5c5c5e] "></div>
                    <div className=""></div>
                  </div>

                  <div className=" mt-6 grid gap-2">
                    <div
                      onClick={handleOAuthGoogleLogin}
                      disabled={loading}
                      className={`w-full flex gap-3 items-center text-[0.8rem] rounded-md justify-center py-2 cursor-pointer  px-4 border border-transparent  shadow-sm  text-white bg-[#3030306d] hover:bg-[#303030] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                        loading ? 'cursor-wait' : ''
                      }`}
                    >
                      <img src={google} className='w-5 h-5' alt="" />
                      Register with Google
                    </div>
                    
                    <div
                        onClick={handleOAuthGoogleLogin}
                        disabled={loading}
                        className={`w-full flex gap-3 items-center text-[0.8rem] rounded-md justify-center py-2 cursor-pointer  px-4 border border-transparent  shadow-sm  text-white bg-[#3030306d] hover:bg-[#303030] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                          loading ? 'cursor-wait' : ''
                        }`}
                      >
                        <img src={github} className='w-5 h-5' alt="" />
                        Register with Github
                      </div>
                  </div>

                </div>
                
                

                <div className="  grid text-center justify-center text-base  text-[#5c5c5e] ">
                <Link className='px-5 group text-sm' to='/auth/login'>Already registered? <span className='text-[#FD356E] group-hover:underline'> Sign in</span></Link>


                </div>
                
            </form>
            :
            !isoktoProceed?
            <VerifyMail 
            email={email}
              isCodeSend={isCodeSend}
               setIsLoading={setLoading}
                setIsCodeSend={setIsCodeSend}
                setMessagetoAuth={setMessage}
                 setIisoktoProceed={setIisoktoProceed}/>
                 :
                 <div className="">
                  <AdData
                   email={email}
                   setMessagetoAuth={setMessage}/>
                 </div>
        }
           </div>
        </div>

        


        </div>
    </div>
  )
}
