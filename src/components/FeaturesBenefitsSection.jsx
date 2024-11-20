import React from 'react';
import { Github, Code2, Calendar, Check, Star, Trophy, Target, Sparkles } from 'lucide-react';

const FeaturesBenefitsSection = () => {
  const features = [
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub Integration",
      description: "Track your contribution streaks and coding activity in real-time",
      metric: "10k+ repositories analyzed"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "LeetCode Progress",
      description: "Monitor your problem-solving progress and competitive ranking",
      metric: "500+ problems tracked"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Smart Calendar",
      description: "Seamlessly manage your class schedule and coding sessions",
      metric: "AI-powered scheduling"
    }
  ];

  const benefits = [
    {
      icon: <Star className="w-4 h-4" />,
      title: "All-in-One Platform",
      description: "Track multiple platform progress in one place"
    },
    {
      icon: <Trophy className="w-4 h-4" />,
      title: "Automated Tracking",
      description: "Automated GitHub contribution tracking and analytics"
    },
    {
      icon: <Target className="w-4 h-4" />,
      title: "Progress Visualization",
      description: "Interactive charts and progress visualization"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: "Smart Reminders",
      description: "AI-powered reminder system for consistent coding"
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-black relative">
      {/* Animated Background Elements */}
      

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <div className="h-px w-8 bg-gradient-to-r from-pink-500 to-transparent"></div>
              <span className="text-white font-medium">Features</span>
              <div className="h-px w-8 bg-gradient-to-l from-pink-500 to-transparent"></div>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              <span className="inline-block animate-text-gradient bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
                Powerful Features for Developers
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to accelerate your development journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-xl 
                          
                          transition-all duration-500 hover:scale-105"
              >
                <div className="bg-gradient-to-r text-white from-[#FD356E] to-[#FF5F85] w-14 h-14 rounded-xl 
                              flex items-center justify-center mb-6 
                              group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent 
                              group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                              group-hover:to-[#fd356ea5]  group-hover:from-[#ff5f8498]">
                  {feature.title}
                </h3>
                <p className="text-gray-400 mb-4">{feature.description}</p>
                <div className="text-sm text-gray-500 font-medium">{feature.metric}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#fd356e2c] to-[#ff5f8447]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent 
                              via-white/20 to-transparent transform scale-x-0 group-hover:scale-x-100 
                              transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-[#FD356E]  to-transparent"></div>
                <span className="text-white font-medium">Benefits</span>
                <div className="h-px w-8 bg-gradient-to-l from-[#FD356E] to-transparent"></div>
              </div>
              <h2 className="text-4xl font-bold mb-8">
                <span className="inline-block animate-text-gradient bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
                  Why Choose FoxDash?
                </span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="group flex items-start gap-4 p-4 rounded-xl
                              bg-white/5 backdrop-blur-sm transition-all duration-300 
                              hover:translate-x-2 hover:bg-white/[0.07]"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r text-white from-[#FD356E] to-[#FF5F85]
                                  rounded-lg flex items-center justify-center 
                                  group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-transparent 
                                   group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                                   group-hover:from-[#FF5F85] group-hover:to-[#FD356E]">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fd356e6f] to-[#ff5f847e] 
                            rounded-2xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-700" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <img 
                  s src="https://cdn.dribbble.com/users/402092/screenshots/16282144/media/6dcd7ea72e3ba67ea115527e0f267c40.png"
                  alt="Dashboard Preview" 
                  className="w-full transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-blue-500/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-white/5 backdrop-blur-xl rounded-lg p-4 
                            transform transition-all duration-500 hover:scale-105 
                            group-hover:translate-x-2 group-hover:-translate-y-2">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">4.9/5 Rating</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/5 backdrop-blur-xl rounded-lg p-4 
                            transform transition-all duration-500 hover:scale-105 
                            group-hover:-translate-x-2 group-hover:translate-y-2">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-pink-500" />
                  <span className="text-white font-medium">50k+ Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesBenefitsSection;