import React, { Fragment, useRef, useState, useEffect } from 'react'
import MessageBox from "../../components/MessageBox";
import axios from 'axios';
import LoaderSpin from "../../components/LoaderSpin";
import VerifyMail from "../components/VerifyMail";
import AdData from "../components/AdData";
import { Link } from 'react-router-dom';
import google from "../../user/assets/google-logo-9808.png";
import Logo from "../../components/assets/Logo.svg";
import github from "../assets/github-mark-white.png";
import { useNavigate } from 'react-router-dom';
import { Mail, Loader, ArrowRight } from 'lucide-react';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isCodeSend, setIsCodeSend] = useState(false);
    const [isoktoProceed, setIisoktoProceed] = useState(false);
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

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        setMessage('');
        setError('');
    
        try {
          const response = await axios.post(`${process.env.REACT_APP_API}/auth/register`, { email });
          setMessage(response.data.message);
          setLoading(false);
          setIsCodeSend(true);
         
          setError('');
        } catch (err) {
          setLoading(false);
          setMessage('');
          if (err.response && err.response.data && err.response.data.errors) {
            setError(err.response.data.errors.map(e => e.msg).join(', '));
          } else if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
          } else {
            setError('An error occurred. Please try again.');
          }
        }
    };

    const handleOAuthGoogleLogin = () => {
      window.location.href = `${process.env.REACT_APP_API}/auth/google`;
    };

    return (
      <div className="min-h-screen bg-[#19191C] text-white">
        <div>
          <MessageBox servermessage={message} error={error} />

          <div className="min-h-screen bg-[#19191C] flex">
            {/* Left Side - Decorative Panel */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[#FD356E] to-[#FF6B98] p-12">
              {/* Add decorative elements or patterns here */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] bg-repeat opacity-20"></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-4xl font-bold mb-6">Welcome Developer!</h1>
                <p className="text-lg opacity-90">Join our community and start your journey today.</p>
              </div>
            </div>

            {/* Right Side - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
              {/* Mobile Header */}
              <div className="bg-gradient-to-r from-[#FD356E] to-[#FF5F7E] md:hidden absolute top-0 right-0 left-0 h-32 rounded-b-3xl">
                <a href='/' className="absolute -bottom-6 right-5 ">
                  <img 
                    src={Logo} 
                    className="bg-white  border rounded-xl p-2 w-12 h-12 shadow-lg" 
                    alt="Logo" 
                  />
                </a>
              </div>

              {!isCodeSend ? (
                <form onSubmit={handleSubmit} className="w-full max-w-md space-y-8 bg-[#1E1E24]/50 backdrop-blur-xl p-8 rounded-2xl border border-[#3C3C3C]/30">
                  {/* Form Header */}
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Register</h1>
                    <p className="text-gray-400">Create your account</p>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Email
                      <span className="text-red-400 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full px-4 py-3 text-white bg-[#1E1E24] border border-[#3C3C3C] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:border-transparent focus:bg-transparent"
                        required
                      />
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center px-4 py-3 rounded-lg
                      bg-gradient-to-r from-[#FD356E] to-[#FF5F7E] hover:from-[#FF5F7E] hover:to-[#FD356E]
                      text-white font-semibold transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      focus:outline-none focus:ring-2 focus:ring-[#FD356E] focus:ring-offset-2 focus:ring-offset-[#19191C]"
                  >
                    {loading ? (
                      <LoaderSpin />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#3C3C3C]"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-[#19191C] px-4 text-gray-500">or continue with</span>
                    </div>
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleOAuthGoogleLogin}
                      className="flex items-center justify-center px-4 py-3 bg-[#1E1E24] hover:bg-[#2A2A32]
                        border border-[#3C3C3C] rounded-lg text-white transition-all duration-200
                        group "
                    >
                      <img src={google} alt="Google" className="w-5 h-5 mr-2" />
                      <span className="">Google</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.location.href = `${process.env.REACT_APP_API}/auth/github`}
                      className="flex items-center justify-center px-4 py-3 bg-[#1E1E24] hover:bg-[#2A2A32]
                        border border-[#3C3C3C] rounded-lg text-white transition-all duration-200
                        group "
                    >
                      <img src={github} alt="GitHub" className="w-5 h-5 mr-2" />
                      <span className="">GitHub</span>
                    </button>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center text-gray-500">
                    <Link 
                      to="/auth/login" 
                      className="text-sm hover:text-[#FD356E] transition-colors duration-200"
                    >
                      Already registered? <span className="text-[#FD356E] hover:underline">Sign in</span>
                    </Link>
                  </div>
                </form>
              ) : (
                <div className="w-full max-w-md">
                  {!isoktoProceed ? (
                    <VerifyMail 
                      email={email}
                      isCodeSend={isCodeSend}
                      setIsLoading={setLoading}
                      setIsCodeSend={setIsCodeSend}
                      setMessagetoAuth={setMessage}
                      setIisoktoProceed={setIisoktoProceed}
                    />
                  ) : (
                    <AdData
                      email={email}
                      setMessagetoAuth={setMessage}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}