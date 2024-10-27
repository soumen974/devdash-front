import React, { useEffect, useRef, useState } from "react";
import Arrow from "../assets/arrow.png";
import Upload from "./Upload";
import { IKImage } from "imagekitio-react";
import model from "../lib/gemini";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {}, //img stored
    aiData: {}, //img details stored
  });

  const chat = model.startChat({
    history:  data?.history.map(({ role, parts }) => ({
		role: role || 'user',  
		parts: [{ text: parts[0].text }],
	  })),
    generationConfig: {
      // maxOutputTokens: 1000,
      // temperature: 0.1,
    },
  });

  const endRef = useRef(null);
  const formRef = useRef();

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
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
      // Invalidate and refetch
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
        });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //FOR TEXT RESPONSE
  const add = async (text, isInitial) => {
    if (!isInitial) setQuestion(text);

    try {
      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        //   console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    if (!text) return;

    add(text, false);
  };

  //IN PRODUCTION WE DID NT NEED THIS
  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].parts[0].text, true);
      }
    }
    hasRun.current = true;
  }, []);

  return (
    <>
      {/* ADD NEW CHAT */}
      {img.isLoading && <div>Loading....</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={process.env.REACT_APP_IMAGE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          transformation={[{ width: 400 }]}
          loading="lazy"
          lqip={{ active: true }}
          width="400"
        />
      )}
      {question && (
        <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[80%] self-end">
          {question}
        </div>
      )}
      {answer && (
        <div className="p-5 w-[90%]">
          <Markdown className="list-disc">{answer}</Markdown>
        </div>
      )}
      <div className="pb-24" ref={endRef}></div>
      <form
        action=""
        onSubmit={handleSubmit}
        ref={formRef}
        className="w-[60%] absolute right-24 bottom-3 bg-[#2c2937] rounded-2xl flex items-center gap-5 py-0 px-5"
      >
        {/* <label htmlFor="file" className="rounded-[50%] bg-[#605e68] p-2 cursor-pointer border-none flex items-center justify-center" >
				<img src={Attachment} alt="" className="size-4 cursor-pointer"/>
			</label> */}
        <Upload setImg={setImg} />
        <input
          id="file"
          type="file"
          multiple={false}
          hidden
          className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"
        />
        <input
          type="text"
          name="text"
          placeholder="Ask anything....."
          className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"
        />
        <button className="rounded-[50%] bg-[#605e68] p-2 cursor-pointer border-none flex items-center justify-center">
          <img src={Arrow} alt="" className="size-4" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
