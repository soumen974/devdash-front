import React, { useState } from 'react'

export default function Layout() {
    const [issidebaropen, setissidebaropen] = useState(false);
  return (
    <div>
          <div className=" h-screen ">
            <div className=" flex rounded  h-screen  ">
                <div className={` ${issidebaropen? ' transition-all ease-in-out delay-150 duration-300 -ml-60 left-40   flex':'hidden  -ml-0 md:block'} max-md:absolute bg-red-400  h-screen w-[24rem]`}>
                    <div className="flex justify-end">
                        <div onClick={()=>{setissidebaropen(!issidebaropen)}} className={`bg-red-100 w-full p-12 flex gap-2 `}>
                        <div className="logo">logo</div>
                        <div className="logo">Name</div>

                        </div>
                        <div onClick={()=>{setissidebaropen(!issidebaropen)}} className={`bg-red-700 w-fit p-12 `}>cut</div>
                    </div>

                    <div className="flex ">
                        <div onClick={()=>{setissidebaropen(!issidebaropen)}} className={`bg-red-600 w-full p-12 `}>cut</div>
                    </div>
                </div>

                <div className="bg-green-300 h-screen w-full">
                    <div className="bg-green-400 p-12 flex justify-between ">
                        <div className="">jh</div>
                        <div className=" flex justify-between gap-2">
                            <div className=""> not</div>
                            <div className=""> user</div>
                        </div>

                    </div>
                    <div className="">PAge</div>
                </div>

            </div>
          </div>
    </div>
  )
}
