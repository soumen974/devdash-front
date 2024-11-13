import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Plus, X, Upload, User, Mail, Phone, FileText, Image,Loader ,ArrowUpRight} from 'lucide-react';
import ExperienceList from "./ExperienceList";
import ProjectsList from "./ProjectsList";
import PersonalDataForm from "./PersonalDataForm";
import LicenceCertificationList from "./LicenceCertificationList";
import SocialMediaCRUD from "./SocialMediaCRUD";



const PersonalDataList = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    headline: '',
    description: '',
    about: '',
  });
  
  const [files, setFiles] = useState({
    imageUrl: null,
    resumeUrl: null,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingForm, setEditingForm] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentData, setCurrentData] = useState(null);

  useEffect(() => {
    fetchPersonalData();
  }, []);

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/dev/data/personal_data`, {
        withCredentials: true,
      });
      setCurrentData(response.data.data);
      setFormData(response.data.data);
      setFiles(response.data.data);
    } catch (err) {
      setError('Failed to fetch personal data');
      console.error('Fetch error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFiles(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    if (files.imageUrl) formDataToSend.append('imageUrl', files.imageUrl);
    if (files.resumeUrl) formDataToSend.append('resumeUrl', files.resumeUrl);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/dev/data/personal_data`,
        formDataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSuccess('Personal data updated successfully!');
      setCurrentData(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating personal data');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your personal data?')) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/dev/data/personal_data`,
        { withCredentials: true }
      );
      setSuccess('Personal data deleted successfully');
      setFormData({
        name: '',
        email: '',
        phone: '',
        headline: '',
        description: '',
        about: '',
      });
      setFiles({
        imageUrl: null,
        resumeUrl: null,
      });
      setCurrentData(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while deleting personal data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-6xl mx-auto p-4 md:p-6 lg:p-8   ">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
      
        <div className="flex justify-between items-center mb-4 mt-14">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
           Personal Information
          </h1>
          <p className="text-gray-400">
            Manage and update your profile details
          </p>
        </div>
        <button 
          onClick={() => {setShowForm(true);setEditingForm(currentData);}} 
          className="px-6 flex items-center py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
          <Plus size={20} /> {!editingForm? "Update":"Add"} Personal Information
        </button>
      </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader className="h-8 w-8 text-[#FD356E] animate-spin" />
              <p className="text-gray-400">Loading your information...</p>
            </div>
          </div>
        ) : (
          <div className="relative bg-gradient-to-b from-[#2A2A32] to-[#232328] rounded-2xl p-8 md:p-12 overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5F85] rounded-full opacity-5 blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FD356E] rounded-full opacity-5 blur-3xl -ml-32 -mb-32" />
    
          {/* Profile Header */}
          <div className="relative flex flex-col md:flex-row items-start gap-8 mb-12">
            {/* Profile Image */}
            <div className="relative group">
              {formData.imageUrl ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF5F85]/20 to-[#FD356E]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img
                    src={formData.imageUrl}
                    alt={formData.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-[#1E1E24] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <User className="w-16 h-16 text-gray-500/50" />
                </div>
              )}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-gradient-to-br from-[#FF5F85] to-[#FD356E] rounded-full opacity-10 blur-2xl" />
            </div>
    
            {/* Profile Info */}
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  {formData.name || "Your Name"}
                </h1>
                <p className="text-[#FF5F85] text-xl font-medium">
                  {formData.headline || "Your Headline"}
                </p>
              </div>
    
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group bg-[#1E1E24]/50 backdrop-blur-sm rounded-xl p-4 hover:bg-[#1E1E24] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF5F85]/10 rounded-lg group-hover:bg-[#FF5F85]/20 transition-colors duration-300">
                      <Mail className="w-5 h-5 text-[#FF5F85]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{formData.email || "add your email"}</p>
                    </div>
                  </div>
                </div>
                <div className="group bg-[#1E1E24]/50 backdrop-blur-sm rounded-xl p-4 hover:bg-[#1E1E24] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#FF5F85]/10 rounded-lg group-hover:bg-[#FF5F85]/20 transition-colors duration-300">
                      <Phone className="w-5 h-5 text-[#FF5F85]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white font-medium">{formData.phone || "add your phone no."}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Content Sections */}
          <div className="space-y-8">
            {/* Summary Section */}
            <div className="group bg-[#1E1E24]/50 backdrop-blur-sm rounded-xl p-6 hover:bg-[#1E1E24] transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-white">Summary</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#FF5F85]/20 to-transparent" />
              </div>
              <p className="text-gray-300 leading-relaxed">
                {formData.description || "Your professional summary goes here..."}
              </p>
            </div>
    
            {/* About Section */}
            <div className="group bg-[#1E1E24]/50 backdrop-blur-sm rounded-xl p-6 hover:bg-[#1E1E24] transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-white">About</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#FF5F85]/20 to-transparent" />
              </div>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {formData.about || "Tell us about yourself..."}
              </p>
            </div>
    
            {/* Resume Link */}
            {formData.resumeUrl && (
              <div className="flex justify-end">
                <a
                  href={formData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF5F85] to-[#FD356E] text-white rounded-xl hover:from-[#FD356E] hover:to-[#FF5F85] transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Resume</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </a>
              </div>
            )}
          </div>
        </div>
        )}
      </div>
      {showForm && (
        <PersonalDataForm 
          personalData={editingForm}
          onClose={() => {
            setShowForm(false);
            setEditingForm(null);
          }}
          onSubmit={fetchPersonalData}
        />
      )}

      <ExperienceList UseForShow={false}/>
      <ProjectsList UseForShow={false} />
      <LicenceCertificationList UseForShow={false}/>
     <div className="mt-20">
      <SocialMediaCRUD/></div>
    </div>
  );
};

export default PersonalDataList;

// exporting image to another component
export const useUserImage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setname] = useState(null);
    const [headline, setheadline] = useState(null);
    const [description, setdescription] = useState(null);
    const [myusername, setmyusername] = useState(null)
    const [isLoading, setisLoading] = useState(false);


    const [error, setError] = useState(null);
    // .name ,headline,about
  
    const fetchPersonalData = async () => {
      setisLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/dev/data/personal_data`, {
          withCredentials: true,
        });
        setImageUrl(response.data.data.imageUrl);
        setname(response.data.data.name);
        setheadline(response.data.data.headline);
        setdescription(response.data.data.description);
        setmyusername(response.data.data.username);
        setisLoading(false);
      } catch (err) {
        setError('Failed to fetch personal data');
        console.error('Fetch error:', err);
        setisLoading(false);
      }
    };
  
    useEffect(() => {
      fetchPersonalData();
    }, []);
  
    return { imageUrl, error,name,headline,description,myusername ,isLoading};
  };