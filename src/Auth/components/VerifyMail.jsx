import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function VerifyMail({ email, setIsLoading,setMessagetoAuth, isCodeSend,setIsCodeSend ,setIisoktoProceed}) {
  const [success, setSuccess] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpopen, setIsOtpopen] = useState(isCodeSend);
  const [time, setTime] = useState(360);
  const [isActive, setIsActive] = useState(isCodeSend);

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      if (isOtpVerified) {
        setTime(0);
      }
    } else if (time === 0) {
      clearInterval(interval);
      setIsOtpopen(false);
      // setIsCodeSend(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isOtpVerified]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const [codes, setCodes] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join('');
    setIsLoading(true);
    

    try {
      await axios.post('http://localhost:5000/auth/verify-email', { email, code });
      setMessage('Email verified successfully!');
      setSuccess(true);
      setIsOtpVerified(true);
      // setIsCodeSend(false);
      setTimeout(() => {
        setMessagetoAuth('');

      }, 2000);
      setMessagetoAuth('Email verified successfully!');
      setIsOtpopen(false);
      setIisoktoProceed(true);
      setError('');
    } catch (err) {
      
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.map((e) => e.msg).join(', '));
      } else if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while verifying the email.');
      }
      setMessage('');
    }
    setIsLoading(false);
  };

  return (
    <div className="z-10 px-10">
      
      <div className="border border-[#3C3C3C] p-14 rounded-2xl">
        <div className="text-4xl font-semibold flex gap-3">
          Enter Code <h1 className="text-sm font-normal flex items-center text-blue-600 ">{formatTime(time)}</h1> 
          {time === 0 && <button className="text-red-600 text-sm font-normal">Time out</button>}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex my-2 space-x-2 rtl:space-x-reverse">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                <label htmlFor={`code-${index}`} className="sr-only">{`Code ${index + 1}`}</label>
                <input
                  type="text"
                  maxLength="1"
                  id={`code-${index}`}
                  value={codes[index]}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-white bg-[#1E1E24] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent"
                  required
                />
              </div>
            ))}
          </div>
          <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500">
            Please introduce the 6 digit code we sent via email. 
          </p>
          <button
            type="submit"
            className="flex w-full mt-6 justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm bg-[#FD356E] hover:bg-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2"
          >
            Verify Email
          </button>
          {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
}
