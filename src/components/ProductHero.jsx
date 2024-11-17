import React, { useState } from 'react';
import { Calendar, FileText, Boxes, Cpu, Upload, ArrowRight, CheckCircle } from 'lucide-react';

const ProductHero = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Calendar Integration",
      description: "Seamlessly sync your class schedules from Excel to Google Calendar with AI-powered time optimization",
      highlight: "New"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "ATS-Friendly Resume Builder",
      description: "Create professionally formatted, ATS-optimized resumes with AI-driven content suggestions",
      highlight: "Popular"
    },
    {
      icon: <Boxes className="w-6 h-6" />,
      title: "No-Code Deployment",
      description: "Deploy your portfolio and projects without writing a single line of code",
      highlight: "Trending"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI Integration",
      description: "Leverage AI for smart document analysis, content generation, and workflow optimization",
      highlight: "Beta"
    }
  ];

  return (
    <div className="min-h-[90vh] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#fd356e2a] via-zinc-900 to-black overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml,...')] opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-[#fd356e2a] to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Floating notification */}
        <div className="fixed z-20 bottom-6 right-6 flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm animate-bounce">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>1,000+ developers already joined</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Hero content */}
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Code required</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#FD356E] to-[#fc7b99] animate-text">
              Your All-in-One
              <br />
              Developer Suite
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Revolutionize your workflow with AI-powered tools, seamless integrations, 
              and intelligent automation for the modern developer.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="group relative px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full text-white font-medium transition-all duration-300 hover:scale-105">
                Try Free Demo
                <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </button>
              <button className="group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full text-white font-medium transition-all duration-300 hover:scale-105">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveFeature(index)}
                  className={`relative p-6 rounded-2xl backdrop-blur-lg transition-all duration-500 cursor-pointer
                    ${activeFeature === index 
                      ? 'bg-white/15 scale-105 shadow-2xl' 
                      : 'bg-white/10 hover:bg-white/15'}`}
                >
                  <div className="absolute -top-2 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full">
                      {feature.highlight}
                    </span>
                  </div>
                  
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 text-white bg-white/10 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview section */}
          <div className="relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 p-2 ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.02]">
              <img
                src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png"
                alt="Platform preview"
                className="rounded-xl w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr to-[#fd356e4f]  from-[#ff5f8423] opacity-0 hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-4 left-4 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm">
              <Upload className="inline w-4 h-4 mr-2" />
              Excel to Calendar
            </div>
            <div className="absolute -top-4 right-4 bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 text-white text-sm">
              <Cpu className="inline w-4 h-4 mr-2" />
              AI Powered
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHero;