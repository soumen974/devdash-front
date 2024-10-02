import React, { useEffect, useRef, useState } from 'react'
import Arrow from '../assets/arrow.png'
import Upload from './Upload'
import { IKImage } from 'imagekitio-react'
import model from '../lib/gemini'
import Markdown from 'react-markdown'

const NewPrompt = () => {
	const [question,setQuestion] = useState("");
	const [answer,setAnswer] = useState("");
	const [img, setImg] = useState({
		isLoading: false,
		error: "",
		dbData: {},  //img stored 
		aiData: {}  //img details stored
	})

	const chat = model.startChat({
		history: [
		  {
			role: "user",
			parts: [{ text: "Hello" }],
		  },
		  {
			role: "model",
			parts: [{ text: "Great to meet you. What would you like to know?" }],
		  },
		],
		generationConfig: {
		  // maxOutputTokens: 1000,
		  // temperature: 0.1,
		},
	  });

	const endRef = useRef(null)

	useEffect(()=>{
		endRef.current.scrollIntoView({ behavior: "smooth" })
	}, []);

	//FOR TEXT RESPONSE
	const add = async (text)=> {
		setQuestion(text)

		const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData,text] : [text]);
		let accumulatedText = "";
		for await (const chunk of result.stream) {
		  const chunkText = chunk.text();
		  console.log(chunkText);
		  accumulatedText += chunkText;
		  setAnswer(accumulatedText);
		}
		setImg({
			isLoading: false,
			error: "",
			dbData: {},  //img stored 
			aiData: {}  //img details stored
		})
	 
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const text = e.target.text.value;
		if (!text) return;

		// add(text)
	}

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
		lqip={{ active:true }}
  		width="400"
		/>
	)}
	{question && <div className="bg-[#2c2937] p-3 rounded-[20px] max-w-[60%] self-end">{question}</div>}
	{answer && <div className="p-5 w-[60%]"><Markdown>{answer}</Markdown></div>}
	<div className="pb-24" ref={endRef}></div>
		<form action="" onSubmit={handleSubmit} className='w-[60%] absolute right-24 bottom-3 bg-[#2c2937] rounded-2xl flex items-center gap-5 py-0 px-5'>
			{/* <label htmlFor="file" className="rounded-[50%] bg-[#605e68] p-2 cursor-pointer border-none flex items-center justify-center" >
				<img src={Attachment} alt="" className="size-4 cursor-pointer"/>
			</label> */}
			<Upload setImg={setImg} />
			<input id='file' type="file" multiple={false} hidden  className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"/>
			<input type="text" name="text" placeholder='Ask anything.....' className="flex-1 p-5 border-none outline-none bg-transparent text-[#ececec]"/>
			<button className='rounded-[50%] bg-[#605e68] p-2 cursor-pointer border-none flex items-center justify-center'>
				<img src={Arrow} alt="" className="size-4"/>
			</button>
		</form>
	</>
  )
}

export default NewPrompt