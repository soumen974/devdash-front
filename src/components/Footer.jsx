import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Twitter, 
  Github, 
  Linkedin,
  ArrowUp,
  Globe,
  Shield,
  Heart,
  Stars,
  Users,
  Award,
  Check
} from 'lucide-react';

import Logo from "./assets/Logo.svg";
const Footer = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Product');

  // Handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscriptionStatus('subscribed');
    setEmailInput('');
    
    // Animate success message
    const timer = setTimeout(() => {
      setSubscriptionStatus(null);
    }, 3000);

    return () => clearTimeout(timer);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stats = [
    { icon: Users, label: 'Active Users', value: '100K+' },
    { icon: Stars, label: 'Five Star Reviews', value: '50K+' },
    { icon: Award, label: 'Industry Awards', value: '25+' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute w-full h-full bg-[url('data:image/svg+xml,...')] opacity-20" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-pink-500/20 to-transparent blur-3xl" />
      </div>

      

      {/* Stats Section */}
      <div className="relative max-w-7xl mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="group p-6 backdrop-blur-sm bg-white/5 rounded-2xl hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {value}
                  </h4>
                  <p className="text-gray-400">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 pb-12">
        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="flex-shrink-0 relative">
                <div className="  rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 overflow-hidden">
                <img src={Logo} className="h-9 w-9 " />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-xl tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FD356E] group-hover:to-[#FF5F85] transition-all duration-300">
                  FoxDash
                </span>
                <span className="text-xs text-gray-400 tracking-wider font-medium">
                  Developer Dashboard
                </span>
              </div>
            </a>
            <p className="text-gray-400 max-w-md text-lg">
              Revolutionizing developer workflows with cutting-edge AI tools, 
              seamless integrations, and intelligent automation solutions.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href={` ${Icon === Twitter ? ' https://twitter.com/Soumen81845556' : Icon === Github ? 'https://github.com/soumen974' : 'https://www.linkedin.com/in/soumen-bhunia-me-dvp/'}`}
                  className="p-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:ml-auto max-w-md">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-200 to-[#FF5F85] bg-clip-text text-transparent">
              Join Our Innovation Network
            </h3>
            <p className="text-gray-400 mb-6 text-lg">
              Get exclusive access to beta features, developer resources, and industry insights.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <div className="absolute -inset-0.5 rounded-full px-6 py-3 text-sm leading-6 text-gray-200 ring-1 ring-gray-700/10 hover:ring-pink-500/50 bg-gray-800/40 backdrop-blur-md transition-all duration-300 hover:scale-105y" />
              <div className="relative flex bg-black/50 backdrop-blur-xl rounded-full p-1">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-grow bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full font-medium hover:shadow-sm hover:shadow-[#FF5F85]   transition-all duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
            {subscriptionStatus && (
              <div className="mt-4 text-green-400 flex items-center gap-2 animate-fade-in">
                <Check className="w-5 h-5" />
                <span>Welcome to the FoxDash community!</span>
              </div>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {['Product', 'Company', 'Resources', 'Legal'].map((section) => (
            <div
              key={section}
              className={`transition-all duration-300 ${
                activeTab === section ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setActiveTab(section)}
            >
              <h4 className="font-semibold text-lg mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {section}
              </h4>
              <ul className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white flex items-center group"
                    >
                      <span className="relative">
                        {section === 'Product' ? ['Features', 'Integrations', 'Pricing', 'Changelog', 'Documentation'][i] :
                         section === 'Company' ? ['About Us', 'Careers', 'Blog', 'Press', 'Partners'][i] :
                         section === 'Resources' ? ['Community', 'Help Center', 'Status', 'Support', 'Videos'][i] :
                         ['Privacy', 'Terms', 'Security', 'Compliance', 'Patents'][i]}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] group-hover:w-full transition-all duration-300" />
                      </span>
                      <ChevronRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span>© 2024 FoxDash. All rights reserved.</span>
              <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
                <Globe className="w-4 h-4" />
                <span>English (US)</span>
              </div>
              <div className="flex items-center gap-2 hover:text-white transition-colors duration-300 cursor-pointer">
                <Shield className="w-4 h-4" />
                <span>ISO 27001 Certified</span>
              </div>
            </div>
            
            <button 
              onClick={scrollToTop}
              className={`p-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] rounded-full transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;