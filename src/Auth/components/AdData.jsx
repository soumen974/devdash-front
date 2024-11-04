import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdData = ({ email, setMessagetoAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const navigate = useNavigate();

  const handleUsernameCheck = async (username) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/usernamecheck`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (data.exists) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const usernameget = (e) => {
    e.preventDefault();
    const newUsername = e.target.value;
    setUsername(newUsername);
    setMessage('');
    setError('');
    if (newUsername.length > 2) {
      const timeoutId = setTimeout(() => {
        handleUsernameCheck(newUsername);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/addpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      setRegistrationMessage(data.message);
      setMessagetoAuth(data.message);
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } catch (error) {
      setRegistrationMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setRegistrationMessage('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center w-full p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-[#1E1E24]/90 rounded-2xl shadow-2xl border border-[#FD356E]/10 overflow-hidden">
        {/* Header Section */}
        <div className="relative px-6 pt-8 pb-6 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD356E]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h2 className="text-3xl font-bold text-white mb-3 relative">
            Developer Registration
          </h2>
          <p className="text-gray-400 text-sm relative">
            Create your developer account to continue
          </p>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-8">
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    value={username}
                    onChange={usernameget}
                    className="w-full h-12 px-4 bg-[#2A2A32] text-white rounded-xl border-2 border-gray-700/50 
                    focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 
                    transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01]"
                    required
                  />
                  {message && (
                    <div className="absolute -bottom-6 left-0 text-xs font-medium text-[#FD356E]">
                      {message}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 bg-[#2A2A32] text-white rounded-xl border-2 border-gray-700/50 
                  focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 
                  transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01]"
                  required
                />
              </div>

              {/* Email Display */}
              <div className="py-3 px-4 rounded-xl bg-[#2A2A32]/50 border border-gray-700/30">
                <p className="text-sm text-gray-400">
                  Registering with email:<br />
                  <span className="font-medium text-[#FD356E]">{email}</span>
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-white font-medium 
              bg-gradient-to-r from-[#FD356E] to-[#FF5F85] 
              hover:from-[#FF5F85] hover:to-[#FD356E] 
              transition-all duration-200 transform hover:scale-[1.02] 
              active:scale-[0.98] shadow-lg hover:shadow-[#FD356E]/20"
            >
              Complete Registration
            </button>

            {/* Status Messages */}
            {registrationMessage && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {registrationMessage}
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
};

export default AdData;