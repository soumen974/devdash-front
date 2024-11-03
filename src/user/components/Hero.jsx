import { useState } from 'react';
import { Menu, X, Github, ArrowRight, ChevronRight } from 'lucide-react';
import google from "../assets/google-logo-9808.png";


export default function Hero() {

  const handleOAuthGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API}/auth/google`;
  };

  const handleOAuthGithubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API}/auth/github`;
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black overflow-hidden relative">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute top-0 -right-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        

        <div className="pt-20 pb-24 text-center lg:pt-32">
          {/* Announcement Banner */}
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm leading-6 text-gray-300 ring-1 ring-gray-700/10 hover:ring-gray-700 bg-gray-800/40 backdrop-blur-sm transition-all duration-300 hover:scale-105">
              <span className="hidden md:inline">Get your free portfolio page upon deployment</span>
              <span className="md:hidden">Free portfolio page!</span>
              <a href="#" className="font-semibold text-pink-400 ml-2 inline-flex items-center">
                Grab now
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 pb-1">
              A developer dashboard for all your needs
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              An all-encompassing solution for incident notifications, secure document archiving, intuitive portfolio creation, effortless no-code deployment, and additional advanced features.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/dashboard"
                className="rounded-full bg-pink-600 px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-pink-500 transition-all duration-300 hover:scale-105 flex items-center"
              >
                Get started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-base font-semibold text-gray-300 hover:text-white transition-colors duration-300"
              >
                Learn more →
              </a>
            </div>

            {/* OAuth Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleOAuthGoogleLogin}
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={google}
                  alt="Google"
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-white text-sm font-medium">Continue with Google</span>
              </button>
              <button onClick={handleOAuthGithubLogin} className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105">
                <Github className="w-6 h-6 text-white" />
                <span className="text-white text-sm font-medium">Continue with Github</span>
              </button>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              
              <img
                src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png"
                alt="Dashboard preview"
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10 transition-all duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 rounded-md bg-gradient-to-tr from-pink-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}