import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Menu, X, ChevronDown, Bell, User, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/Logo.svg";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [developerData, setDeveloperData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/auth/protected`, { withCredentials: true });
        setDeveloperData(response.data.developer_data);
        navigate('/dashboard');
      } catch (error) {
        setError(error.response?.data?.error || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-zinc-900 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-pink-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-4 border-t-pink-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-zinc-900/95 shadow-lg backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <a href='/' className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-white  rounded-lg flex items-center justify-center">
                <img src={Logo} className="h-5 w-5 text-white" />
              </div>
            </div>
            <span className="text-white font-bold text-xl">FoxDash</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink href="#" text="Product" />
              <NavLink href="#" text="Features" hasDropdown />
              <NavLink href="#" text="Analytics" />
              <NavLink href="#" text="Support" />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-pink-500 rounded-full" />
              </button>
              <a href='/auth/login' className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Sign In
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-zinc-900/95 shadow-lg backdrop-blur-lg p-2 rounded-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="#" text="Product" />
              <MobileNavLink href="#" text="Features" />
              <MobileNavLink href="#" text="Analytics" />
              <MobileNavLink href="#" text="Support" />
              <button className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2  rounded-lg transition-colors duration-200">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
    </nav>
  );
}

// Helper Components
const NavLink = ({ href, text, hasDropdown }) => (
  <a 
    href={href}
    className="text-gray-300 hover:text-white flex items-center space-x-1 transition-colors duration-200"
  >
    <span>{text}</span>
    {hasDropdown && <ChevronDown className="h-4 w-4" />}
  </a>
);

const MobileNavLink = ({ href, text }) => (
  <a 
    href={href}
    className="block px-3 py-2 rounded-lg text-base text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors duration-200"
  >
    {text}
  </a>
);