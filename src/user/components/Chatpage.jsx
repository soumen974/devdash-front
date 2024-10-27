import React from "react";
import NewPrompt from "./NewPrompt";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
import axios from "axios";

const Chatpage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_API}/api/chats/${chatId}`, {
          withCredentials: true, // equivalent to credentials: "include"
        })
        .then((res) => res.data),
  });

  return (
    <div className="relative w-[80%] right-43 flex flex-col items-center justify-center text-white ">
      {isPending
        ? "Loading..."
        : error
        ? "Something went wrong"
        : data?.history?.map((message, i) => (
            <>
              {message.img && (
                <IKImage
                  urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                  path={message.img}
                  height="300"
                  width="400"
                  transformation={[{ height: 300, width: 400 }]}
                  loading="lazy"
                  lqip={{ active: true, quality: 20 }}
                  className="self-end"
                />
              )}
              <div
                className={
                  message.role === "user"
                    ? "bg-[#2c2937] py-3 px-4 rounded-2xl max-w-[80%] self-end"
                    : "p-5 w-[90%]"
                }
                key={i}
              >
                <Markdown>{message.parts[0].text}</Markdown>
              </div>
            </>
          ))}
      <NewPrompt data={data}/>
    </div>
  );
};

export default Chatpage;

// <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">
//   Text message from User Lorem ipsum, dolor sit amet consectetur
//   adipisicing elit. Expedita, nostrum consequuntur amet optio iste sequi,
//   dolorem asperiores itaque quasi, totam illo distinctio laborum. Autem,
//   dolores possimus provident unde similique modi!
// </div>
// <div className="p-5 w-[60%]">
//   Text message from Ai Lorem ipsum dolor sit amet consectetur, adipisicing
//   elit. Consectetur eum deleniti ad odio praesentium fugiat sit, in
//   voluptatum assumenda iure, nisi voluptatem id voluptate porro sed,
//   possimus voluptates ab aperiam!
// </div>
