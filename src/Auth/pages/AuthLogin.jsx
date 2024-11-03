import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import google from "../../user/assets/google-logo-9808.png";
import github from "../assets/github-mark-white.png";
import Logo from "../../components/assets/Logo.svg";
const AuthLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_API}/auth/protected`, { withCredentials: true });
        navigate('/dashboard');
      } catch (error) {
        setLoading(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const loginAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      setResponseMessage(response.data.message);
      setError('');
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred');
      setResponseMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    window.location.href = `${process.env.REACT_APP_API}/auth/${provider}`;
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#19191C] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-[#FD356E] border-r-[#FD356E] border-b-transparent border-l-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#19191C] flex">
      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#FD356E] to-[#FF6B98] p-12">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col h-full">
          <a href='/' className="bg-white backdrop-blur-xl rounded-xl p-3 w-12 h-12 flex items-center justify-center">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
          </a>
          <div className="flex-grow flex flex-col justify-center">
            <h1 className="text-white text-5xl font-bold mb-6">
              Analytics Dashboard
              <br />
              for Developers
            </h1>
            <p className="text-white/80 text-xl max-w-md">
              Access powerful analytics and features with no-code required. Built for developers, designed for everyone.
            </p>
          </div>
          <img 
            src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png" 
            alt="Dashboard Preview" 
            className="absolute  bottom-0 right-0  transform translate-x-1/4 translate-y-1/4 rounded-t-xl shadow-2xl"
          />
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 w-full max-w-md space-y-8 bg-[#1E1E24]/50 backdrop-blur-xl p-8 rounded-2xl border border-[#3C3C3C]/30">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
         

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome Back</h1>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={loginAuth} className="space-y-6">
            <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 after:text-red-400 after:ml-1 after:text-base after:content-['*']">
                        Email
                      </label>
                      <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                required
              />
            </div>

            <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 after:text-red-400 after:ml-1 after:text-base after:content-['*']">
                        Password
                      </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-3 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#FD356E] hover:bg-[#FF4C80] text-white rounded-lg font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#FD356E] focus:ring-offset-[#19191C]"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#3C3C3C]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#19191C] text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleOAuthLogin('google')}
                className="flex items-center justify-center px-4 py-3 bg-[#1E1E24] hover:bg-[#2A2A32] border border-[#3C3C3C] rounded-lg text-white transition-colors"
              >
                <img src={google} alt="Google" className="w-5 h-5 mr-2" />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthLogin('github')}
                className="flex items-center justify-center px-4 py-3 bg-[#1E1E24] hover:bg-[#2A2A32] border border-[#3C3C3C] rounded-lg text-white transition-colors"
              >
                <img src={github} alt="GitHub" className="w-5 h-5 mr-2" />
                GitHub
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between text-sm">
            <Link 
              to="/forgot-password"
              className="text-gray-400 hover:text-[#FD356E] transition-colors"
            >
              Forgot password?
            </Link>
            <Link 
              to="/auth/register"
              className="text-gray-400 hover:text-[#FD356E] transition-colors"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;