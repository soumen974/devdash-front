import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Eye, Download, X } from 'lucide-react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

const PreviewModal = ({ imageUrl, onClose }) => (
  <Modal isOpen={true} onClose={onClose}>
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">Image Preview</h3>
      <div className="w-full max-h-96 overflow-auto">
        <img 
          src={imageUrl} 
          alt="Preview" 
          className="max-w-full h-auto rounded-lg"
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  </Modal>
);

const PersonalDataUI = () => {
  const [personalData, setPersonalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Image and resume handling states
  const [imagePreview, setImagePreview] = useState(null);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [resumePreview, setResumePreview] = useState(null);
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [AddpersonalData, setAddpersonalData] = useState(false);


  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/dev/data/personal_data`, {
          withCredentials: true,
        });
        setPersonalData(response.data.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchPersonalData();
  }, []);

  const handleInputChange = (e) => {
    setPersonalData({ ...personalData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    if (e.target.name === 'imageUrl') {
      const file = e.target.files[0];
      // File validation logic
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setShowImagePreview(true);
        setPersonalData({ ...personalData, imageUrl: file });
      };
      reader.readAsDataURL(file);
    } else if (e.target.name === 'resumeUrl') {
      const file = e.target.files[0];
      // File validation logic
      setResumePreview(URL.createObjectURL(file));
      setShowResumePreview(true);
      setPersonalData({ ...personalData, resumeUrl: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.keys(personalData).forEach((key) => {
        if (personalData[key] !== null) {
          formData.append(key, personalData[key]);
        }
      });

      let response;
      if (personalData._id) {
        // Update existing data
        response = await axios.put(`${process.env.REACT_APP_API}/dev/data/personal_data`, formData, {
          withCredentials: true,
        });
      } else {
        // Create new data
        response = await axios.post(`${process.env.REACT_APP_API}/dev/data/personal_data`, formData, {
          withCredentials: true,
        });
      }

      setPersonalData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          {personalData?._id ? 'Update Personal Data' : 'Create Personal Data'}
        </h2>

        {error && (
          <>
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
            
          </div>
          
          <button
              onClick={() => setAddpersonalData(true)}
              className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              { error=='Personal data not found for this user' ?  personalData?._id ? 'Update' : 'Create' : null}
            </button>
            </>
          
          
        )}

       
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={personalData?.name || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={personalData?.email || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium mb-2">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalData?.phone || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="headline" className="block font-medium mb-2">Headline</label>
              <input
                type="text"
                id="headline"
                name="headline"
                value={personalData?.headline || ''}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description" className="block font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={personalData?.description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="about" className="block font-medium mb-2">About</label>
            <textarea
              id="about"
              name="about"
              value={personalData?.about || ''}
              onChange={handleInputChange}
              rows={4}
              className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="imageUrl" className="block font-medium mb-2">Profile Image</label>
              <input
                type="file"
                id="imageUrl"
                name="imageUrl"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              
            </div>

            <div>
              <label htmlFor="resumeUrl" className="block font-medium mb-2">Resume</label>
              <input
                type="file"
                id="resumeUrl"
                name="resumeUrl"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {resumePreview && (
                <div className="mt-2">
                  <button
                    onClick={() => setShowResumePreview(true)}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Resume
                  </button>
                  <button
                    onClick={() => window.open(resumePreview, '_blank')}
                    className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : personalData?._id ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
        

        {showImagePreview && (
          <PreviewModal
            imageUrl={imagePreview || personalData?.imageUrl}
            onClose={() => setShowImagePreview(false)}
          />
        )}

        {showResumePreview && (
          <Modal isOpen={true} onClose={() => setShowResumePreview(false)}>
            <div className="h-[80vh]">
              <iframe
                src={personalData?.resumeUrl}
                title="Resume Preview"
                className="w-full h-full rounded border border-gray-200"
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default PersonalDataUI;