import React, {Fragment, useRef, useState ,useEffect} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import MessageBox from '../../components/MessageBox';
import { useNavigate } from 'react-router-dom';
import login_svg from "../assets/login_svg.svg";
import Logo from "../../components/assets/Logo.svg";
import { Link } from 'react-router-dom';

// import google from "../assets/google-logo-9808.png";
import google from "../../user/assets/google-logo-9808.png";



export default function AuthLogin() {
  const cancelButtonRef1 = useRef(null);
  const cancelButtonRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const [developerData, setDeveloperData] = useState({});


 useEffect(() => {
    const fetchData = async () => {
      try {
         await axios.get(`${process.env.REACT_APP_API}/auth/protected`, { withCredentials: true });
        navigate('/dashboard');
      } catch (error) {
        // setLoading(true);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  

  const loginAuth = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        email,
        password,
      },{
        withCredentials: true,
      });
      setResponseMessage(response.data.message); 
      setError(''); 
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Login failed'); 
      setResponseMessage('');
    } finally {
      setLoading(false);
    }
  };

  const [SignInopen, setOpenSignIn] = useState(true)

  const handleOAuthGoogleLogin = () => {
    // setLoading(true);
    window.location.href = `https://foxdashapi.onrender.com/auth/google`;
  };


  return (
    <div className="bg-[#19191C] h-screen ">
             <MessageBox servermessage={responseMessage} error={error} />


        <div className=" md:grid rounded grid-cols-[50%,50%]   xl:grid-cols-[60%,40%] h-screen  ">

           <div className=" overflow-hidden relative  hidden md:block  bg-[#FD356E]  p-20 lg:p-40">


          

           
            <h1 className='text-gray-900 text-5xl py-4 font-semibold z-10'>Dashboard for Developers</h1>
            <h1 className='text-gray-800 text-xl font-light xl:w-[30rem] '>See the analytics and access the features with no code,for anyone!</h1>

            <img className='rounded-xl absolute -rotate-12 -bottom-20   h-[50rem]' src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png" alt="" />
            <img src={Logo} className='bg-black rounded-full p-2 absolute top-5 left-5' alt="" />
            {/* <h1 className='text-[11rem] font-bold absolute -left-80 z-0 bottom-0  -rotate-90'>FOXDASH</h1> */}

          </div>


          <div className=" relative overflow-hidden  bg-red-00 h-screen flex justify-center items-center p-4 md:p-12">
           <img src={Logo} className='hover:bg-[#3C3C3C] border-[#3C3C3C] border md:hidden rounded-full p-2 absolute top-5  right-5' alt="" />

              

              <form onSubmit={loginAuth} className=" grid gap-10 z-10  backdrop-blur-4xl   p-8 md:p-[5vw] w-full rounded-2xl">
               <h1 className="text-4xl font-semibold tracking-tight text-gray-100 sm:text-4xl">Sign in</h1>
                 <div className="">
                    <div className="mt-6">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-400 after:text-red-400 after:ml-1 after:text-base after:content-['*']">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                      />
                    </div>

                    <div className="mt-6">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-400 after:text-red-400 after:ml-1 after:text-base after:content-['*']">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                        className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                      />
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-3 font-bold px-4 border border-transparent rounded-md shadow-sm text-md text-white bg-[#ef205a] hover:bg-[#d73966] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                          loading ? 'cursor-wait' : ''
                        }`}
                      >
                        {loading ? 'Loading..' : 'Sign in'}
                      </button>
                    </div>

                    <div className="divide-y-[1px] relative  divide-[#2d313f] text-white ">
                      <div className="p-4 after:-ml-5 after:content-['OR'] after:text-sm after:absolute after:left-1/2  after:top-3 after:bg-[#19191C] after:p-4 after:pb-2   after:text-[#5c5c5e] "></div>
                      <div className=""></div>
                    </div>

                    <div className="mt-6">
                    <div
                      onClick={handleOAuthGoogleLogin}
                      disabled={loading}
                      className={`w-full flex gap-3 items-center text-sm justify-center py-3 cursor-pointer font-bold px-4 border border-transparent rounded-md shadow-sm text-md text-white bg-[#303030] hover:bg-[#474646] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                        loading ? 'cursor-wait' : ''
                      }`}
                    >
                      <img src={google} className='w-5 h-5' alt="" />
                      Sign in with Google
                    </div>
                   </div>

                   <div className="mt-6 divide-x-[1px] divide-[#2d313f] flex justify-center text-base  text-[#5c5c5e] ">
                    <Link className='px-5  text-sm' to='/register'>Forget Password?</Link>
                    <Link className='px-5  text-sm' to='/auth/register'>SignUp</Link>


                   </div>
                  </div>
                 
                  
            </form> 
          </div>
          
            

        </div>
     
    </div>
  );
}






    //  <Transition.Root show={SignInopen  } as={Fragment}>
    //   <Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef1} onClose={setOpenSignIn}>
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div id='Login' className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //     </Transition.Child>

    //     <div className=" fixed inset-0  w-screen overflow-y-auto z-0">
    //       <div className=" flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //           enterTo="opacity-100 translate-y-0 sm:scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //           leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         >
    //           <Dialog.Panel className="bg-white py-10 px-5  relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
    //           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    //         <img
    //           className="mx-auto h-12 w-auto rounded-full"
    //           src={''}
    //           alt="Your Company"
    //         />
    //         <h2 className="mt-10 capitalize text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    //           Sign in to your account
    //         </h2>
    //          </div>
             
    //       <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
    //         <form  className="space-y-6" >
    //           <div>
    //             <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
    //               Email address
    //             </label>
    //             <div className="mt-2">
    //               <input
    //                 id="email"
    //                 name="email"
    //                 // value={SignInemail}
    //                 // onChange={(e) => setSignInEmail(e.target.value)}
    //                 type="email"
    //                 autoComplete="email"
    //                 required
    //                 className="block w-full rounded-md border-0 py-1.5 px-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               />
    //             </div>
    //           </div>
  
    //           <div>
    //             <div className="flex items-center justify-between">
    //               <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    //                 Password
    //               </label>
    //               <div className="text-sm">
    //                 <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">
    //                   Forgot password?
    //                 </a>
    //               </div>
    //             </div>
    //             <div className="mt-2">
    //               <input
    //                 id="password"
    //                 name="password"
    //                 // value={SignInpassword}
    //                 // onChange={(e) => setSignInPassword(e.target.value)}
    //                 type="password"
    //                 autoComplete="current-password"
    //                 required
    //                 className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    //               />
    //             </div>
    //           </div>
  
    //           <div>
    //             <button
    //               type="submit"
    //               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             >
    //               Sign in
    //             </button>
    //           </div>
              
    //         </form>
    //         <div>
    //             <button
    //               // onClick={handleOAuthGoogleLogin}
    //               className="flex w-full justify-center  mt-3 px-3 py-1.5 text-sm font-semibold  text-gray-700    "
    //             >
    //                Login with Google
    //             </button>
    //           </div>
  
    //         <p className="mt-10 text-center flex text-sm text-gray-500">
    //           Not a member ?
    //           <div className="cursor-pointer font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
    //             Create account
    //           </div>
    //         </p>
           
    //       </div> 

           

                
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition.Root> 