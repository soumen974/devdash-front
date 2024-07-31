import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../assets/Logo.svg";
import { Menu,X ,Github  } from 'lucide-react';
import google from "../assets/google-logo-9808.png";


  
export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='bg-[#19191C] overflow-hidden  h-screen '>
      <div className=" z-20  relative mx-auto max-w-7xl  ">
            <div className="text-white  relative lg:pt-40 md:pt-32 pt-24 ">

                <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
                >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#fd356e] to-[#5f56d2] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                    clipPath:
                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                />
                </div>
                <div className="text-white px-5   ">
                    <div className="  isolate   ">
                        <div className="lg:flex  ">
                            <div className="mx-auto  ">
                                <div className="mb-6 md:mb-8 flex max-md:justify-center  ">
                                    <div className="relative rounded-full px-2 sm:px-3 sm:py-1 text-[2.8vw] sm:text-sm leading-6 text-gray-200 ring-1 ring-[#FD356E] bg-[#e7507b33] hover:shadow-md hover:shadow-[#fd356e5d]">
                                    Get your free portfolio page upon deployment  &nbsp;
                                    <a href="#" className="font-semibold text-[#fd356e]">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        Grab now <span aria-hidden="true">&rarr;</span>
                                    </a>
                                    </div>
                                </div>
                                
                                <div className="md:text-start text-center  pb-6">
                                    <h1 className="text-4xl font-bold tracking-tight text-gray-00 sm:text-6xl">
                                    A developer dashboard for all your needs
                                    </h1>
                                    <p className="mt-6 text-lg leading-8 text-gray-600">
                                    An all-encompassing solution for incident notifications, secure document archiving, intuitive portfolio creation, effortless no-code deployment, and additional advanced features.                           
                                    </p>
                                    <div className="mt-10 flex items-center justify-center md:justify-start gap-x-6">
                                    <a
                                        href="/dashboard"
                                        className="rounded-md bg-[#fd356e] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Get started
                                    </a>
                                    <a href="#" className="text-sm font-semibold leading-6 text-gray-300">
                                        Learn more <span aria-hidden="true">→</span>
                                    </a>
                                    </div>

                                    <div className="md:mt-10 mt-7 flex justify-center md:justify-start gap-5">
                                        <button className='border sm:text-sm text-[3vw] items-center backdrop-blur-sm  border-[#5e5e5e7a] rounded-full px-2 py-2 sm:pr-5 flex gap-2'>
                                            <img className='w-6 h-6 ' src={google} alt="" />
                                        <h1 className=''>Sign in With Google</h1> 
                                        </button>
                                        <button className='border sm:text-sm text-[3vw] items-center backdrop-blur-sm  border-[#5e5e5e7a] rounded-full px-2 py-2 sm:pr-5 flex gap-2'>
                                        <Github className='h-6 w-6' />
                                            <h1 className=''>Sign in Github </h1>
                                        </button>
                                    </div>

                                    
                                </div>
                            </div>
                            <div className="relative hidden  lg:block bg-red-20 ">
                                <div className="    max-md:absolute max-md:top-1/2 max-md:right-20 ">
                                    <div className=" overflow-hidden  w-[25rem] md:w-[30rem] h-[35rem]   ">
                                    </div>
                                </div>
                            </div>

                            <div className="lg:relative  ">
                                <div className="w-[92vw]  md:w-[38rem] md:h-[55rem]  lg:absolute md:top-30 md:-right-40 ">
                                    <div className=" overflow-hidden p-2 md:p-3 border-[0.41px] md:w-[86rem]  rounded-[1.2rem] md:rounded-[1.4rem] backdrop-blur-2xl bg-gradient-to-b border-[#5e5e5e7a] from-inherit bg-zinc-800/30 ">
                                    <img className='rounded-xl' src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png" alt="" />
                                    </div>
                                </div>
                            </div>

                        </div>

                            
                        
                    </div>
                    
                </div>

                <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        >
                        <div
                            style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#fd356e] to-[#5f56d2] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
            </div>

            
            
            </div>
     </div>
    </div>
  )
}
