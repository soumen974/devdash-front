import React from 'react'
import { Check ,TriangleAlert  } from 'lucide-react';

export default function MessageBox({servermessage,error}) {


  return (
    <div className={` ${error ||servermessage ? 'top-2 ':'-top-14'} w-fit max-md:left-5  right-5 transition-all duration-300 ease-out absolute  `}>
        <div className=" bg-[#1E1E24] border border-[#3C3C3C] rounded-md divide-[#3C3C3C] divide-x-[1px] px-5 py-2 flex items-center  gap-2 ">
          
          <div className={` rounded-full p-1 ${error? 'bg-[#ff1414]':'bg-[#54ff3d]'} `}>
            
            {error? <TriangleAlert  className='text-[#3C3C3C]  w-5 h-5 '/> : <Check className='text-[#3C3C3C]  w-5 h-5 '/>}
          </div>  
           <h1 className={`${error? 'text-[#ff1414]' :'text-[#54ff3d]'}  px-2 `}>  {error? error :servermessage} </h1>
        </div>
    </div>
  )
}
