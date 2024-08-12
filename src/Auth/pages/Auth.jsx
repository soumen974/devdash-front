import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import MessageBox from "../../components/MessageBox";
import axios from 'axios';
import LoaderSpin from "../../components/LoaderSpin";
import VerifyMail from "../components/VerifyMail";
import AdData from "../components/AdData";
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

  return (
    <div className="bg-[#19191C] h-screen flex justify-center items-center text-white">
        <div className=' mx-auto max-w-xl'>

        <MessageBox servermessage={message } error={error} />

        {!isCodeSend?
            <div className=" z-10 px-10 ">
                <form onSubmit={handleSubmit} className='border border-[#3C3C3C] p-14 rounded-2xl' >
                    <h1 className="text-4xl font-bold tracking-tight text-gray-00 sm:text-5xl">
                    Create a account
                    </h1>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-400">Email</label>
                        <input  type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required className="mt-1  block w-full px-3 py-2 text-white bg-[#1E1E24] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent" />
                    </div>
                    
                    
                    <div className="mt-6">
                    <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FD356E] hover:bg-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                        loading ? 'cursor-wait' : ''
                    }`}
>                         {loading ? <LoaderSpin /> :"Sign up"}
                        </button>
                    </div>
                    
                </form>
            </div>
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
  )
}
