import React from "react";
import Image from '../assets/image.png'
import Chat from '../assets/chat.png'
import Code from '../assets/code.png'
import Arrow from '../assets/arrow.png'
import pagelogo from "../assets/Logo.svg";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Gemini() {

  const queryClient = useQueryClient();

  const navigate = useNavigate();

const mutation = useMutation({
  mutationFn: (text) => {
    return axios.post(
      `${process.env.REACT_APP_API}/api/chats`,
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // equivalent to credentials: "include"
      }
    ).then((res) => res.data);
  },
  onSuccess: (id) => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['userChats'] });
    navigate(`/dashboard/gemini/chats/${id}`);
  },
});

const handleSubmit = async (e) => {
  e.preventDefault();
  const text = e.target.text.value;
  if(!text) return;

  mutation.mutate(text);

//   await axios.post(
//   "http://localhost:5000/api/chats",
//   { text },
//   {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     withCredentials: true,
//   }
// );

}

  return (
    <div className="h-[100%] flex flex-col items-center text-white">
      <div className="flex-1 flex flex-col mt-[15%] items-center justify-center w-1/2 gap-12">
        <div className="flex items-center gap-5 opacity-20 ">
          <img src={pagelogo} alt="" className="size-16" />
          <h1 className="text-[64px] font-medium bg-gradient-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent max-xl:text-6xl">
          FoxDash          
          </h1>
        </div>
      </div>
      <div className="w-[70%] pb-20 flex items-center justify-between gap-12">
        <div className="flex-1 flex flex-col gap-2 font-medium text-lg p-5 border-[1px] border-solid border-[#555] rounded-lg">
          <img src={Chat} alt="" className="size-16 object-cover"/>
          <span>Create a New Chat</span>
        </div>
        <div className="flex-1 flex flex-col gap-2 font-medium text-lg p-5 border-[1px] border-solid border-[#555] rounded-lg">
          <img src={Image} alt=""  className="size-16 object-cover"/>
          <span>Analyze Images</span>
        </div>
        <div className="flex-1 flex flex-col gap-2 font-medium text-lg p-5 border-[1px] border-solid border-[#555] rounded-lg">
          <img src={Code} alt=""  className="size-16 object-cover"/>
          <span>Help me with my Code</span>
        </div>
      </div>
      <div className="flex mt-auto w-1/2 h-[4vw] bg-[#2c2937] rounded-2xl">
        <form onSubmit={handleSubmit} className="w-[100%] h-[100%] flex items-center justify-between gap-5 mb-2">
          <input type="text" name="text" placeholder="Ask me Anything" className="flex-1 p-4 bg-transparent border-none outline-none"/>
          <button className="bg-[#605e68] rounded-full border-none cursor-pointer p-3 flex items-center justify-center mr-4">
            <img src={Arrow} alt="" className="size-4"/>
          </button>
        </form>
      </div>
    </div>
  );
}




// <div className="relative right-44 flex flex-col items-center justify-center text-white ">
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
// <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
// <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
// <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//     Text message from User Lorem ipsum, dolor sit amet consectetur
//     adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//     dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//     dolores possimus provident unde similique modi!
//   </div>
//   <div className="p-5 w-[60%]">
//     Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//     elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//     voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//     possimus voluptates ab aperiam!
//   </div>
//   <NewPrompt />
// </div>