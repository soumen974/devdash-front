import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Plus, X, Upload, User, Mail, Phone, FileText, Image,Loader } from 'lucide-react';


export default function PersonalDataForm({ personalData, onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        name: personalData?.name || '',
        email: personalData?.email || '',
        phone: personalData?.phone || '',
        headline: personalData?.headline || '',
        description: personalData?.description || '',
        about: personalData?.about || '',
      });
      const [files, setFiles] = useState({
        imageUrl: personalData?.imageUrl  ||  null,
        resumeUrl: personalData?.resumeUrl  ||  null,
      });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (personalData) {
        setFormData({
            ...personalData
          });
          setFiles({
            imageUrl: personalData.imageUrl  || null,
            resumeUrl: personalData.resumeUrl  || null,
          });
        }
      }, [personalData]);

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
          setTimeout(() => {
            onSubmit();
          onClose();
          }, 1500);
          
        } catch (err) {
          setError(err.response?.data?.message || 'An error occurred while updating personal data');
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2A2A32] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
            {/* headder */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {personalData ? 'Edit' : 'Add'} Personal Data
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          {/* form */}

          <div className="bg-[#2A2A32] rounded-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-gray-400 text-sm mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Headline</label>
                    <input
                      type="text"
                      name="headline"
                      value={formData.headline}
                      onChange={handleInputChange}
                      className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
                      placeholder="Professional headline"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent h-32 resize-none"
                      placeholder="Brief description about yourself"
                    />
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent h-40 resize-none"
                  placeholder="Detailed information about yourself"
                />
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-gray-400 text-sm mb-4">Profile Image</label>
                  <div className="bg-[#1E1E24] border border-gray-700 rounded-lg p-4">
                    {files.imageUrl ? (
                      <div className="relative inline-block">
                        <img 
                          src={files.imageUrl} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFiles(prev => ({ ...prev, imageUrl: null }))}
                          className="absolute -top-2 -right-2 bg-[#31313b]   rounded-full p-1 hover:bg-[#FD356E] transition-colors"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <input
                          type="file"
                          name="imageUrl"
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                          id="imageUpload"
                        />
                        <label
                          htmlFor="imageUpload"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="bg-[#2A2A32] rounded-full p-3 mb-2">
                            <Upload className="h-6 w-6 text-[#FD356E]" />
                          </div>
                          <span className="text-gray-400 text-sm">Choose Image</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="block text-gray-400 text-sm mb-4">Resume</label>
                  <div className="bg-[#1E1E24] border border-gray-700 rounded-lg p-4">
                    {files.resumeUrl ? (
                      <div className="flex items-center justify-between">
                        <a 
                          href={files.resumeUrl} 
                          target="_blank" 
                          className="flex items-center text-[#FF5F85] hover:text-[#FD356E] transition-colors"
                        >
                          <FileText className="h-5 w-5 mr-2" />
                          View Resume
                        </a>
                        <button
                          type="button"
                          onClick={() => setFiles(prev => ({ ...prev, resumeUrl: null }))}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-6">
                        <input
                          type="file"
                          name="resumeUrl"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resumeUpload"
                        />
                        <label
                          htmlFor="resumeUpload"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="bg-[#2A2A32] rounded-full p-3 mb-2">
                            <Upload className="h-6 w-6 text-[#FD356E]" />
                          </div>
                          <span className="text-gray-400 text-sm">Choose Resume</span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              

              {/* Status Messages */}
              {error && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-900/20 border border-green-800 rounded-lg p-4">
                  <p className="text-green-400">{success}</p>
                </div>
              )}

              {/* Action Buttons */}
              

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
                >
                  {personalData ? 'Update' :  loading ? 'Saving...' : 'Create'}  Project
                </button>
              </div>

            </form>
          </div>

        </div>
        </div>
    </div>
  )
}
