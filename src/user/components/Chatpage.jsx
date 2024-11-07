import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";

import {IKImage } from "imagekitio-react";
import axios from "axios";
import { Loader2, ArrowRight,Sparkles } from "lucide-react";
import NewPrompt from "./NewPrompt";


const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full mb-4`}>
      <div
        className={`flex flex-col max-w-[80%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        {message.img && (
          <div className="mb-2 rounded-xl overflow-hidden group transform transition-all duration-300 hover:scale-[1.02]">
            <IKImage
              urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
              path={message.img}
              height="300"
              width="400"
              transformation={[{ height: 300, width: 400 }]}
              loading="lazy"
              lqip={{ active: true, quality: 20 }}
              className="object-cover rounded-xl"
            />
          </div>
        )}

          <div
            className={`rounded-xl px-6 py-4 backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] ${
              isUser
                ? 'bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white'
                : 'bg-[#2A2A32]/90 border-2 border-gray-700/30 text-gray-100'
            }`}
          >
                      {!isUser&& <Sparkles className=" absolute -left-10  w-5 h-5 text-[#FD356E] opacity-100 transition-opacity" />}

            <Markdown 
              className="prose prose-invert max-w-none"
            >
              {message.parts[0].text}
            </Markdown>
          </div>
        
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex items-center justify-center h-40 w-full">
    <div className="bg-[#2A2A32]/90 backdrop-blur-lg rounded-xl p-4 border-2 border-gray-700/30">
      <Loader2 className="h-8 w-8 animate-spin text-[#FD356E]" />
    </div>
  </div>
);

const ErrorState = () => (
  <div className="flex items-center justify-center h-40 w-full">
    <div className="bg-red-500/10 backdrop-blur-lg text-red-400 px-6 py-4 rounded-xl border-2 border-red-500/20">
      Something went wrong. Please try again later.
    </div>
  </div>
);

const Chatpage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_API}/api/chats/${chatId}`, {
          withCredentials: true,
        })
        .then((res) => res.data),
  });

  return (
    <div className="min-h-[91.8vh]  relative overflow-hidden">
      {/* Background Decorations */}
     
      <div className="max-w-4xl mx-auto px-4 py-6 relative">
        <div className="space-y-4 mb-24">
          {isPending ? (
            <LoadingState />
          ) : error ? (
            <ErrorState />
          ) : (
            <div className="space-y-6">
              {data?.history?.map((message, i) => (
                <MessageBubble
                  key={i}
                  message={message}
                  isUser={message.role === "user"}
                />
              ))}
            </div>
          )}
        </div>

        {data && (
          <div className="fixed bottom-8 left-0 right-0 px-4">
            <div className="max-w-2xl mx-auto">
              <NewPrompt 
                data={data}
                className="backdrop-blur-lg bg-[#2A2A32]/90 rounded-xl border-2 border-gray-700/30
                          hover:border-[#FD356E]/30 shadow-lg hover:shadow-[#FD356E]/10 
                          transition-all duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatpage;