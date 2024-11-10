import React, { useState, useEffect } from 'react';

export default function VerifyMail({ email, setIsLoading, setMessagetoAuth, isCodeSend, setIsCodeSend, setIisoktoProceed }) {
  const [success, setSuccess] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isOtpopen, setIsOtpopen] = useState(isCodeSend);
  const [time, setTime] = useState(360);
  const [isActive, setIsActive] = useState(isCodeSend);
  const [codes, setCodes] = useState(Array(6).fill(''));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    }
    return () => clearInterval(interval);
  }, [isActive, time, isOtpVerified]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCodeChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      document.getElementById(`code-${index - 1}`).focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newCodes = [...codes];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newCodes[index] = char;
    });
    setCodes(newCodes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = codes.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw { response: { data } };
      }

      setMessage('Email verified successfully!');
      setSuccess(true);
      setIsOtpVerified(true);
      setTimeout(() => {
        setMessagetoAuth('');
      }, 2000);
      setMessagetoAuth('Email verified successfully!');
      setIsOtpopen(false);
      setIisoktoProceed(true);
      setError('');
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.map((e) => e.msg).join(', '));
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An error occurred while verifying the email.');
      }
      setMessage('');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const confirmExit = (e) => {
      e.preventDefault();
      e.returnValue = ''; 

      const confirmationMessage = 'Are you sure you want to leave this page?';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    window.addEventListener('beforeunload', confirmExit);

    return () => {
      window.removeEventListener('beforeunload', confirmExit);
    };
  }, []);

  return (
    <div className="min-h-[400px] flex items-center justify-center w-full  from-[#1E1E24] to-[#2A2A32] ">
      <div className="w-full max-w-md backdrop-blur-lg bg-[#1E1E24]/90 rounded-2xl shadow-2xl border border-[#FD356E]/10 overflow-hidden">
        {/* Header Section */}
        <div className="relative px-6 pt-8 pb-6 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD356E]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h2 className="text-3xl font-bold text-white mb-3 relative">
            Verify Your Email
          </h2>
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A2A32]/50 border border-gray-700/30">
              <span className="text-gray-400 text-sm">Time remaining:</span>
              <span className={`font-mono font-medium pt-1 ${time < 60 ? 'text-red-400' : 'text-[#FD356E]'}`}>
                {formatTime(time)}
              </span>
            </div>
            {time === 0 && (
              <span className="text-red-400 text-sm font-medium animate-pulse">Expired</span>
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-center gap-2 max-w-sm mx-auto w-full">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="w-full">
                    <input
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={codes[index]}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="w-full h-14 text-center text-xl font-bold text-white bg-[#2A2A32] border-2 border-gray-700/50 rounded-xl focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 transition-all transform hover:scale-105 focus:scale-105 duration-200"
                      required
                    />
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-gray-400 text-center">
                Enter the 6-digit code sent to<br />
                <span className="font-medium text-[#FD356E]">{email}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={time === 0}
              className={`w-full py-4 px-6 rounded-xl text-white font-medium transition-all duration-200 transform 
                ${time === 0
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-[#FD356E] to-[#FF5F85] hover:from-[#FF5F85] hover:to-[#FD356E] hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[#FD356E]/20'
                }`}
            >
              Verify Code
            </button>

            {message && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {message}
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  {error}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}