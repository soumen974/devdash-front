import React, { useState, useEffect } from 'react';
import axios from "axios";

const PersonalDataForm = () => {
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
      setFiles(response.data.data)
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
    
    // Append form data
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
    
    // Append files if they exist
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
      console.error('Submit error:', err);
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
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/dev/data/personal_data`, 
        {
          withCredentials: true,
        }
      );

      // Remove response.ok check since axios throws on non-200 status codes
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
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <body class="bg-gradient-to-r from-[#2A2A32] to-[#1E1E24] text-gray-800 min-h-screen flex items-center justify-center">
  <div class="max-w-2xl w-full mx-auto bg-white rounded-lg shadow-md p-6">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Personal Information</h2>
    </div>
    
    <form onSubmit={handleSubmit} class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          placeholder="Your full name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="your.email@example.com"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Your phone number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Headline</label>
        <input
          type="text"
          name="headline"
          value={formData.headline}
          onChange={handleInputChange}
          placeholder="Professional headline"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Brief description about yourself"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85] h-24"
        ></textarea>
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">About</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          placeholder="Detailed information about yourself"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85] h-32"
        ></textarea>
      </div>

      <div class="space-y-2">
      {files.imageUrl ? (
            <img src={files.imageUrl} alt="Profile" class="w-20 h-20 object-cover rounded-md mr-4" />
          ):(<>no</>)}
        <label class="block text-sm font-medium text-gray-700">Profile Image</label>
        <input
          type="file"
          name="imageUrl"
          onChange={handleFileChange}
          accept="image/*"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      <div class="space-y-2">
      {files.resumeUrl && (
            <a href={files.resumeUrl} target="_blank" class="mr-4 text-[#FF5F85] hover:underline">
              View Resume
            </a>
          )}
          
                {files.resumeUrl ? (
                  <div className="bg-[#2A2A32] rounded-xl h-[calc(100vh-400px)] overflow-hidden">
                  <iframe
                    src={files.resumeUrl}
                    title="PDF Preview"
                    className="w-full h-full border-0"
                  />
                  </div>):(<>no</>)}
          
                  
        <label class="block text-sm font-medium text-gray-700">Resume</label>
        <input
          type="file"
          name="resumeUrl"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-[#FF5F85]"
        />
      </div>

      {error && (
        <div class="p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div class="p-4 bg-green-50 border border-green-200 rounded-md">
          <p class="text-green-700">{success}</p>
        </div>
      )}

      <div class="flex justify-between pt-6">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading || !currentData}
          class="px-4 py-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-md hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Deleting...' : 'Delete Data'}
        </button>

        <button
          type="submit"
          disabled={loading}
          class="px-4 py-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-md hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  </div>
</body>
  );
};

export default PersonalDataForm;