import React, { useRef } from 'react'
import { IKContext, IKUpload } from 'imagekitio-react';
import Attachment from '../assets/attachment.png'

const urlEndpoint = process.env.REACT_APP_IMAGE_KIT_ENDPOINT;
const publicKey = process.env.REACT_APP_IMAGE_KIT_PUBLICKEY; 
const authenticator =  async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/upload`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({ setImg }) => {

	const ikUploadRef = useRef(null);

	const onError = err => {
		console.log("Error", err);
	  };
	  
	  const onSuccess = res => {
		console.log("Success", res);
		setImg((prev) => ({ ...prev, isLoading: false, dbData: res })) ;

	  };
	  
	  const onUploadProgress = progress => {
		console.log("Progress", progress);
	  };
	  
	  const onUploadStart = evt => {
		const file = evt.target.files[0];
		const reader = new FileReader()
    reader.onloadend = () => {
      setImg((prev) => ({...prev, isLoading: true, aiData: {
        inlineData:{
          data: reader.result.split(",")[1],
          mimeType: file.type,
        },
      }}))
    }
    reader.readAsDataURL(file);
	  };

  return (
	<IKContext
	urlEndpoint={urlEndpoint}
	publicKey={publicKey}
	authenticator={authenticator}
  >
	 <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
		  onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
		  useUniqueFileName={true}
		  style={{ display: 'none' }}
		  ref={ikUploadRef}
        />
		<label onClick={()=> ikUploadRef.current.click()}>
		<img src={Attachment} alt="" className="size-5 cursor-pointer"/>
		</label>
  </IKContext>
  )
}

export default Upload