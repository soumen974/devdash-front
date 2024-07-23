import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../assets/Logo.svg";
import { Menu,X  } from 'lucide-react';


  
export default function Hero() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="text-white  relative lg:pt-40 pt-32 ">

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
        <div className="text-white px-5  ">
            <div className="  isolate   ">
                <div className="lg:flex  ">
                    <div className="mx-auto  ">
                        <div className=" mb-8 flex  ">
                            <div className="relative rounded-full px-2 sm:px-3 sm:py-1 text-[3vw] md:text-sm leading-6 text-gray-200 ring-1 ring-[#FD356E] bg-[#e7507b33] hover:shadow-md hover:shadow-[#FD356E]">
                            Announcing our next round of funding  &nbsp;
                            <a href="#" className="font-semibold text-[#fd356e]">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                            </div>
                        </div>
                        
                        <div className="text-start pb-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-00 sm:text-6xl">
                            Data to enrich your online business
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                            fugiat veniam occaecat fugiat aliqua.
                            </p>
                            <div className="mt-10 flex items-center justify-start gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-[#fd356e] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-gray-300">
                                Learn more <span aria-hidden="true">→</span>
                            </a>
                            </div>
                        </div>
                    </div>
                    <div className="relative hidden lg:block bg-red-20 ">
                        <div className="    max-md:absolute max-md:top-1/2 max-md:right-20 ">
                            <div className=" overflow-hidden  w-[25rem] md:w-[30rem] h-[35rem]   ">
                            </div>
                        </div>
                    </div>

                    <div className="lg:relative  ">
                        <div className="w-[92vw]  md:w-[35rem] md:h-[25rem]  lg:absolute md:top-40 md:-right-40 ">
                            <div className=" overflow-hidden p-3 border-[0.41px] md:w-[55rem] h-fit  rounded-[1.4rem] backdrop-blur-2xl bg-gradient-to-b border-[#5e5e5e7a] from-inherit bg-zinc-800/30 ">
                            <img className='rounded-xl' src="https://img.freepik.com/free-vector/infographic-dashboard-user-panel_52683-30026.jpg?w=1380&t=st=1721667026~exp=1721667626~hmac=c743502cec671922c506e5b531ee500f2758b0064966e5812500c024cfc8da86" alt="" />
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
  )
}
