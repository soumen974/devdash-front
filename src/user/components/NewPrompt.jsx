import React, { useEffect, useRef, useState } from "react";
import { Loader2, ArrowRight, Sparkles, Image as ImageIcon, X } from "lucide-react";
import { IKImage } from "imagekitio-react";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import model from "../lib/gemini";
import Upload from "./Upload";

const NewPrompt = ({ data, className }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });
  const [isTyping, setIsTyping] = useState(false);

  const chat = model.startChat({
    history: data?.history.map(({ role, parts }) => ({
      role: role || 'user',
      parts: [{ text: parts[0].text }],
    })),
  });

  const endRef = useRef(null);
  const formRef = useRef();
  const inputRef = useRef();

  // Auto-scroll effect
  useEffect(() => {
    const smoothScroll = () => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    // Small delay to ensure content is rendered
    const timeoutId = setTimeout(smoothScroll, 100);
    return () => clearTimeout(timeoutId);
  }, [data, question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      return axios
        .put(
          `${process.env.REACT_APP_API}/api/chats/${data._id}`,
          {
            question: question.length ? question : undefined,
            answer,
            img: img.dbData?.filePath || undefined,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          });
          // Focus input after successful submission
          inputRef.current?.focus();
        });
    },
    onError: (error) => {
      console.error("Error updating chat:", error);
      // Show error state briefly
      setAnswer("Sorry, something went wrong. Please try again.");
      setTimeout(() => setAnswer(""), 3000);
    },
  });

  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);
    setIsTyping(true);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (err) {
      console.error("Error processing message:", err);
      setAnswer("Sorry, I encountered an error. Please try again.");
    } finally {
      setIsTyping(false);
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    if (!text) return;
    add(text, false);
  };

  const clearImage = () => {
    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });
  };

  // Initial message handling
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current && data?.history?.length === 1) {
      add(data.history[0].parts[0].text, true);
    }
    hasRun.current = true;
  }, []);

  return (
    <div className="relative">
      {/* Image Preview */}
      {img.isLoading && (
        <div className="mt-4 p-4 rounded-xl bg-[#FD356E]/10 border border-[#FD356E]/20 
                       backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-2 text-[#FD356E]">
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading image...
          </div>
        </div>
      )}
      
      {img.dbData?.filePath && (
        <div className="w-fit relative left-20 lg:left-96 mb-4 rounded-xl overflow-hidden group">
          <IKImage
            urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
            path={img.dbData?.filePath}
            transformation={[{ width: 400 }]}
            loading="lazy"
            lqip={{ active: true }}
            width="400"
            className="rounded-xl"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 left-[92%] p-1 rounded-full bg-black/50 text-white
                     opacity-0 group-hover:opacity-100 transition-opacity duration-200
                     hover:bg-black/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Messages */}
     <div className={`flex flex-col ${!answer && "items-end"}`}>
       {question && (
        <div className="max-w-[80%] bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white p-4 rounded-xl mb-4 self-end
                      transform transition-all duration-300 hover:scale-[1.02]">
          <Markdown className="prose prose-invert max-w-none">
            {question}
          </Markdown>
        </div>
      )}
      
      {answer && (
        <div className="max-w-[80%] bg-[#2A2A32]/90 border-2 border-gray-700/30 text-gray-100 p-4 rounded-xl mb-4
                      transform transition-all duration-300 hover:scale-[1.02]">
          <Markdown className="prose prose-invert max-w-none">
            {answer}
          </Markdown>
        </div>
      )}

     </div>
      <div className="h-2" ref={endRef}></div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className={`relative group ${className}`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <div className="relative group/upload">
            <Upload setImg={setImg}>
              <button
                type="button"
                className="p-2 rounded-xl bg-[#FD356E]/10 hover:bg-[#FD356E]/20
                         transition-colors duration-200"
              >
                <ImageIcon className="w-5 h-5 text-[#FD356E]" />
              </button>
            </Upload>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1
                          bg-black/75 text-white text-sm rounded-lg whitespace-nowrap
                          opacity-0 group-hover/upload:opacity-100 transition-opacity duration-200">
              Upload image
            </div>
          </div>
          {/* <Sparkles className="w-5 h-5 text-[#FD356E] opacity-50 group-hover:opacity-100 transition-opacity" /> */}
        </div>
        
        <input
          type="text"
          name="text"
          ref={inputRef}
          placeholder="Ask anything..."
          autoComplete="off"
          className="w-full h-14 pl-16 pr-16 bg-transparent text-white placeholder-gray-400 
                   border-none outline-none focus:ring-2 focus:ring-[#FD356E]/20 rounded-xl
                   transition-all duration-200"
          disabled={img.isLoading || mutation.isPending || isTyping}
        />
        
        <button 
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-3
                   bg-gradient-to-r from-[#FD356E] to-[#FF5F85] 
                   hover:from-[#FF5F85] hover:to-[#FD356E] 
                   rounded-xl transition-all duration-200 transform 
                   hover:scale-105 active:scale-95 disabled:opacity-50 
                   disabled:cursor-not-allowed"
          disabled={img.isLoading || mutation.isPending || isTyping}
        >
          {img.isLoading || mutation.isPending || isTyping ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4 text-white" />
          )}
        </button>
      </form>

      {/* Status Messages */}
      {(mutation.isPending || isTyping) && (
        <div className="mt-4 p-4 rounded-xl bg-[#FD356E]/10 border border-[#FD356E]/20 
                      backdrop-blur-md animate-fadeIn">
          <div className="flex items-center gap-2 text-[#FD356E]">
            <div className="w-2 h-2 rounded-full bg-[#FD356E] animate-pulse"></div>
            {isTyping ? "Generating response..." : "Processing your request..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPrompt;