import React, { useState } from 'react';
import { MessageSquare, Camera, Code, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import pagelogo from "../assets/Logo.svg";

export default function Gemini() {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (text) => {
      return axios.post(
        `${process.env.REACT_APP_API}/api/chats`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res) => res.data);
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ['userChats'] });
      navigate(`/dashboard/gemini/chats/${id}`);
    },
  });

  const features = [
    { 
      icon: <MessageSquare className="w-8 h-8 text-[#FD356E]" />, 
      title: "Create a New Chat",
      description: "Start a new conversation" 
    },
    { 
      icon: <Camera className="w-8 h-8 text-[#FD356E]" />, 
      title: "Analyze Images",
      description: "Get insights from images" 
    },
    { 
      icon: <Code className="w-8 h-8 text-[#FD356E]" />, 
      title: "Help me with my Code",
      description: "Code assistance and review" 
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText) return;
    mutation.mutate(inputText);
    setInputText('');
  };

  return (
    <div className="min-h-[91.8vh]  flex flex-col items-center px-6 relative overflow-hidden">
      {/* Background Decorations */}
     
      {/* Logo Section */}
      <div className="flex-1 flex flex-col items-center justify-center mt-20 relative">
        <div className="flex items-center gap-5 opacity-90 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
          <div className="relative bg-white p-2 rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FD356E]/20 to-[#FF5F85]/20 blur-xl rounded-full"></div>
            <img src={pagelogo} alt="FoxDash Logo" className="w-16 h-16 relative"/>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
            FoxDash
          </h1>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-[80%] max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-44">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group flex flex-col gap-4 p-6 backdrop-blur-lg bg-[#2A2A32]/90 
                     rounded-2xl border-2 border-gray-700/30 hover:border-[#FD356E]/30
                     transition-all duration-300 cursor-pointer transform hover:scale-[1.02]
                     hover:shadow-lg hover:shadow-[#FD356E]/10"
          >
            <div className="relative w-16 h-16 group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FD356E]/10 to-[#FF5F85]/10 blur-xl rounded-full"></div>
              <div className="relative flex items-center justify-center">
                {feature.icon}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-white">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="fixed bottom-8 w-full max-w-2xl px-4">
        <form 
          onSubmit={handleSubmit} 
          className="relative backdrop-blur-lg bg-[#2A2A32]/90 rounded-2xl border-2 border-gray-700/30
                   shadow-lg hover:shadow-[#FD356E]/10 transition-all duration-300"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full h-14 px-6 bg-transparent text-white placeholder-gray-400 
                     border-none outline-none focus:ring-2 focus:ring-[#FD356E]/20 rounded-xl
                     transition-all duration-200"
            disabled={mutation.isPending}
          />
          <button 
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-3
                     bg-gradient-to-r from-[#FD356E] to-[#FF5F85] 
                     hover:from-[#FF5F85] hover:to-[#FD356E] 
                     rounded-xl transition-all duration-200 transform 
                     hover:scale-105 active:scale-95 disabled:opacity-50 
                     disabled:cursor-not-allowed"
            disabled={mutation.isPending}
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </form>

        {/* Status Messages */}
        {mutation.isPending && (
          <div className="mt-4 p-4 rounded-xl bg-[#FD356E]/10 border border-[#FD356E]/20 
                        backdrop-blur-md animate-fadeIn">
            <div className="flex items-center gap-2 text-[#FD356E]">
              <div className="w-2 h-2 rounded-full bg-[#FD356E] animate-pulse"></div>
              Processing your request...
            </div>
          </div>
        )}
        
        {mutation.error && (
          <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 
                        backdrop-blur-md animate-fadeIn">
            <div className="flex items-center gap-2 text-red-400">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              Error: {mutation.error.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}