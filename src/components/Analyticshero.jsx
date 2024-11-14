import React from 'react';
import { Github, Code2, Trophy, Flame, Calendar, ArrowRight, Activity, Brain, BarChart3, LineChart, PieChart } from 'lucide-react';

const DevAnalyticsHero = () => {
  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-slate-950 to-black overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full mix-blend-screen animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                background: `radial-gradient(circle, ${
                  ['rgba(99,102,241,0.1)', 'rgba(168,85,247,0.1)', 'rgba(236,72,153,0.1)'][
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center lg:pt-32">
        {/* Floating Stats Cards */}
        <div className="absolute w-full top-20 left-0 overflow-hidden pointer-events-none">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto opacity-60 blur-[1px] animate-float">
            {[
              { label: 'Active Streaks', value: '156 days', color: 'from-indigo-500', icon: Flame },
              { label: 'Problems Solved', value: '847', color: 'from-purple-500', icon: Code2 },
              { label: 'Contributors', value: '12.4k', color: 'from-pink-500', icon: Github }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.color} to-transparent p-4 rounded-lg backdrop-blur-sm
                           border border-white/10 transform rotate-${index % 2 ? '1' : '-1'}`}
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="w-4 h-4 text-white/70" />
                </div>
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="text-white text-lg font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="relative">
          {/* Announcement Banner */}
          <div className="mb-12 flex justify-center">
            <div className="inline-flex items-center rounded-full px-6 py-3 text-sm 
                          bg-white/5 border border-white/10 hover:border-indigo-500/50 
                          transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-indigo-400 mr-2" />
              <span className="text-gray-300">
                New: AI-powered coding insights
              </span>
              <span className="ml-2 text-indigo-400 flex items-center">
                Try beta
                <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            <span className="inline-block animate-text-gradient bg-gradient-to-r 
                           from-indigo-500 via-purple-500 to-pink-500 
                           bg-[200%_auto] bg-clip-text text-transparent">
              Developer Insights
            </span>
            <br />
            <span className="text-white mt-4 block">
              Track Your Progress
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Monitor your coding journey with comprehensive analytics. Track GitHub contributions, 
            LeetCode progress, and maintain your streak. Get personalized insights to level up 
            your development skills.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <button className="group relative overflow-hidden rounded-full 
                           bg-gradient-to-r from-indigo-500 to-purple-600 
                           px-8 py-4 font-semibold text-white shadow-lg 
                           transition-all duration-300 hover:scale-105 
                           hover:shadow-indigo-500/25 flex items-center">
              <Github className="mr-2 w-5 h-5" />
              <span className="relative z-10">Connect GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 
                            to-indigo-500 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300" />
            </button>
            
            <button className="rounded-full px-8 py-4 text-gray-300 
                           border border-gray-700 hover:border-indigo-500/50 
                           transition-all duration-300 hover:text-white 
                           hover:scale-105 flex items-center">
              <Code2 className="mr-2 w-5 h-5" />
              Link LeetCode
            </button>
          </div>

          {/* Feature Icons */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              {
                icon: Flame,
                title: 'Streak Tracking',
                description: 'Never break your GitHub & LeetCode streaks'
              },
              {
                icon: Trophy,
                title: 'Achievement System',
                description: 'Earn badges for your coding milestones'
              },
              {
                icon: Calendar,
                title: 'Progress Timeline',
                description: 'Visualize your coding consistency'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center group 
                         hover:scale-105 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-white/5 border border-white/10 
                            group-hover:border-indigo-500/50 transition-colors 
                            duration-300 mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevAnalyticsHero;