import React, { useState } from 'react';
import axios from 'axios';
import MessageBox from '../../components/MessageBox';

export default function AuthLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');

  const loginAuth = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });
      setResponseMessage(response.data.message); 
      setError(''); 
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed'); 
      setResponseMessage('');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-[#19191C] h-screen flex justify-center items-center text-white">
      <div className="mx-auto max-w-xl">
        <MessageBox servermessage={responseMessage} error={error} />
        <form onSubmit={loginAuth} className="border border-[#3C3C3C] p-14 rounded-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-100 sm:text-5xl">
            Login to your account
          </h1>
          <div className="mt-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
            />
          </div>

          <div className="mt-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 text-white bg-[#1E1E24] border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#FD356E] hover:bg-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-gray-800 ${
                loading ? 'cursor-wait' : ''
              }`}
            >
              {loading ? 'Loading..' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
