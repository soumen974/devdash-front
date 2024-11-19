import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X } from 'lucide-react';

// Social Media Form Component
const SocialMediaForm = ({ onSubmit , editdata ,onClose}) => {
  const [formData, setFormData] = useState( {
    github: '',
    linkedin: '',
    x: '',
    insta: '',
    upwork: '',
  });

  useEffect(() => {
    if (editdata) {
      setFormData({
        ...editdata,
      });
    }
  }, [editdata]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      github: '',
      linkedin: '',
      x: '',
      insta: '',
      upwork: '',
    });
  };

  return (
    <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2A2A32] rounded-md shadow-md p-6">

        <div className="p-6 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {editdata ? 'Edit' : 'Add'}  Social Media
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="p-6 text-gray-400 space-y-6">
          <div>
            <label htmlFor="github" className="block font-medium">
              GitHub:
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block font-medium">
              LinkedIn:
            </label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
            />
          </div>
          <div>
            <label htmlFor="x" className="block font-medium">
              x:
            </label>
            <input
              type="text"
              id="x"
              name="x"
              value={formData.x}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
            />
          </div>
          <div>
            <label htmlFor="insta" className="block font-medium">
              Instagram:
            </label>
            <input
              type="text"
              id="insta"
              name="insta"
              value={formData.insta}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
            />
          </div>
          <div>
            <label htmlFor="upwork" className="block font-medium">
              Upwork:
            </label>
            <input
              type="text"
              id="upwork"
              name="upwork"
              value={formData.upwork}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
            />
          </div>
         {/* Form actions */}
         <div className="flex justify-end gap-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-700 transition-colors text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
            >
              {editdata ? 'Update' : 'Create'} Social Media
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Social Media List Component
const SocialMediaList = ({ socials, onDelete,onSubmit  }) => {
  const [showForm, setShowForm] = useState(false);
  const [editdata, seteditdata] = useState(null);

  // if (!Array.isArray(Object.values(socials)) || Object.values(socials).length === 0) {
  //   return <div>No social media information available.</div>;
  // }

  return (
    <div className=" max-w-6xl mx-auto rounded-md shadow-md ">

     
      <div className="flex justify-between items-center mb-4 mt-14">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
          Social Media Information
          </h1>
          <p className="text-gray-400">
            Manage and update your profile details
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)} 
          className="px-6 flex items-center py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
          <Plus size={20} /> Add Social Media
        </button>
      </div>
    
      <ul className="space-y-4">
        {Array.isArray(Object.values(socials)) && Object.values(socials).length > 0 ? (
          Object.values(socials).map((social) => (
            <li key={social.username} className="bg-[#1E1E24] backdrop-blur-sm  transition-all duration-300 text-white rounded-md shadow-md p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">GitHub: {social.github}</p>
                  <p className="font-medium">LinkedIn: {social.linkedin}</p>
                  <p className="font-medium">Instagram: {social.insta}</p>
                  <p className="font-medium">Upwork: {social.upwork}</p>
                  <p className="font-medium">x: {social.x}</p>
                </div>
               
                <div className="flex gap-2">
                  <button 
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                    onClick={() => onDelete(social.username)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : null}
      </ul>
     
      {showForm && (
        <SocialMediaForm 
          editdata={editdata}
          onClose={() => {
            setShowForm(false);
            seteditdata(null);
          }}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export const Sendsocialdat = () =>{
    const [socials, setSocials] = useState({});
    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {
      const fetchSocials = async () => {
        setisLoading(true);
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/devs/socials`, {
            withCredentials: true,
          });
          setSocials(response.data);
          setisLoading(false);
        } catch (error) {
          console.error('Error fetching social media information:', error);
          setisLoading(false);
        }
      };
      fetchSocials();
    }, []);

    return {socials,isLoading};
}



// Social Media CRUD Component
const SocialMediaCRUD = () => {
  const [socials, setSocials] = useState({});

  useEffect(() => {
    
    fetchSocials();
  }, []);
  const fetchSocials = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/devs/socials`, {
        withCredentials: true,
      });
      setSocials(response.data);
    } catch (error) {
      console.log('Failed to fetch social media information');
    }
  };

  const createOrUpdateSocials = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/devs/socials`, formData, {
        withCredentials: true,
      });
      setSocials({ ...socials, [response.data.username]: response.data });
      console.log('Social media information updated');
    } catch (error) {
      console.error('Error creating or updating social media information:', error);
      console.log('Failed to update social media information');
    }
  };

  const deleteSocials = async (username) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/devs/socials`, {
        withCredentials: true,
      });
      const updatedSocials = { ...socials };
      delete updatedSocials[username];
      setSocials(updatedSocials);
      console.log('Social media information deleted');
    } catch (error) {
      console.error('Error deleting social media information:', error);
      console.log('Failed to delete social media information');
    }
  };

  return (
    <div className="">
      {/* <SocialMediaForm onSubmit={createOrUpdateSocials} /> */}
      <SocialMediaList onSubmit={createOrUpdateSocials} fetchSocials={fetchSocials} socials={socials} onDelete={deleteSocials} />
    </div>
  );
};

export default SocialMediaCRUD;