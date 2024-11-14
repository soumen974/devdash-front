import { useState } from 'react';
import { Github, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOAuthGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API}/auth/google`;
  };

  const handleOAuthGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API}/auth/github`;
  };

  const checkAuthentication = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/auth/protected`, {
        credentials: 'include'
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      setLoading(false);
      setError('Authentication failed');
      navigate('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-black overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle, ${
                  ['rgba(236,72,153,0.1)', 'rgba(139,92,246,0.1)', 'rgba(59,130,246,0.1)'][
                    Math.floor(Math.random() * 3)
                  ]
                } 0%, transparent 70%)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 text-center lg:pt-32">
          {/* Announcement Banner */}
          <div className="mb-12 flex justify-center">
            <div className="group relative rounded-full px-6 py-3 text-sm leading-6 text-gray-200 ring-1 ring-gray-700/10 hover:ring-pink-500/50 bg-gray-800/40 backdrop-blur-md transition-all duration-300 hover:scale-105">
              <Sparkles className="w-4 h-4 inline-block mr-2 text-pink-500" />
              <span className="hidden md:inline">Get your free portfolio page upon deployment</span>
              <span className="md:hidden">Free portfolio page!</span>
              <a href="#" className="font-semibold text-pink-400 ml-2 inline-flex items-center group-hover:text-pink-300">
                Grab now
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl">
              <span className="inline-block animate-text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[200%_auto] bg-clip-text text-transparent">
                A developer dashboard
              </span>
              <br />
              <span className="text-gray-100">for all your needs</span>
            </h1>
            
            <p className="mt-8 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
              An all-encompassing solution for incident notifications, secure document archiving, 
              intuitive portfolio creation, effortless no-code deployment, and additional advanced features.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={checkAuthentication}
                disabled={loading}
                className={`
                  relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 
                  text-base font-semibold text-white shadow-lg transition-all duration-300 
                  hover:scale-105 hover:shadow-pink-500/25 disabled:opacity-70 disabled:cursor-not-allowed
                  flex items-center group
                `}
              >
                <span className="relative z-10">Get started</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <a
                href="#"
                className="text-base font-semibold text-gray-300 hover:text-white transition-all duration-300 
                           border-b-2 border-transparent hover:border-pink-500 pb-1"
              >
                Learn more →
              </a>
            </div>

            {/* OAuth Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleOAuthGoogleLogin}
                className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full 
                         bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 
                         transition-all duration-300 hover:scale-105 hover:border-pink-500/50"
              >
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <span className="text-white text-sm font-medium group-hover:text-pink-100">
                  Continue with Google
                </span>
              </button>

              <button 
                onClick={handleOAuthGithubLogin}
                className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full 
                         bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 
                         transition-all duration-300 hover:scale-105 hover:border-pink-500/50"
              >
                <Github className="w-6 h-6 text-white" />
                <span className="text-white text-sm font-medium group-hover:text-pink-100">
                  Continue with Github
                </span>
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 
                          lg:-m-4 lg:rounded-2xl lg:p-4 backdrop-blur-sm">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png"
                  alt="Dashboard preview"
                  className="w-full rounded-lg shadow-2xl ring-1 ring-gray-900/10 transition-all duration-700 
                           hover:scale-[1.02] cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-blue-500/20 
                              opacity-0 hover:opacity-100 transition-all duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}