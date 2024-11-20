import React, { useState, useEffect } from 'react';
import { NavLink ,useNavigate} from 'react-router-dom';
import { Menu, X, ChevronDown, Bell } from 'lucide-react';
import Logo from "../assets/Logo.svg";
import axios from 'axios';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await axios.get(`${process.env.REACT_APP_API}/auth/protected`, { withCredentials: true });
        navigate('/dashboard');
      } catch (error) {
       setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if(loading){
    return (
      <div className="fixed inset-0 bg-[#19191C] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-t-[#FD356E] border-r-[#FD356E] border-b-transparent border-l-transparent animate-spin" />
      </div>
    );
  }

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-zinc-900/95 shadow-xl backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Enhanced Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {['Product', 'Features', 'Analytics', 'Support'].map((item) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `relative px-1 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    }`
                  }
                  onMouseEnter={() => setActiveDropdown(item)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span className="relative z-10 flex items-center">
                    {item}
                    {item === 'Features' && (
                      <ChevronDown className="inline-block ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </span>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] transform origin-left transition-transform duration-300 ${
                      activeDropdown === item ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </NavLink>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6">
              
              <a
                href="/auth/login"
                className="relative group overflow-hidden bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-md hover:bg-[#FF5F85]   px-6 py-2.5  font-medium text-sm hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="relative z-10">Sign In</span>
                
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative group p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="relative flex overflow-hidden items-center justify-center w-8 h-8">
              <div className="flex flex-col justify-between w-6 h-5 transform transition-all duration-300">
                <span
                  className={`bg-gradient-to-r from-[#FD356E] to-[#FF5F85] h-0.5 w-6 transform transition-transform duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`bg-gradient-to-r from-[#FD356E] to-[#FF5F85] h-0.5 w-6 transform transition-transform duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`bg-gradient-to-r from-[#FD356E] to-[#FF5F85] h-0.5 w-6 transform transition-transform duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 backdrop-blur-xl rounded-xl bg-zinc-900/90 mb-4">
            {['Product', 'Features', 'Analytics', 'Support'].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#fd356e2a] to-[#ff5f8449] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-zinc-800/50'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}
            <a
              href="/auth/login"
              className="block mt-4 px-4 py-3 text-center bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>

      {/* Gradient Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
    </nav>
  );
};

export default Navbar;