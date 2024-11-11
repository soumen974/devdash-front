import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Social Media Form Component
const SocialMediaForm = ({ onSubmit, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {
    github: '',
    linkedin: '',
    x: '',
    insta: '',
    upwork: '',
  });

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
    <div className="bg-white rounded-md shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Add/Update Social Media</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

// Social Media List Component
const SocialMediaList = ({ socials, onDelete }) => {
  if (!Array.isArray(Object.values(socials)) || Object.values(socials).length === 0) {
    return <div>No social media information available.</div>;
  }

  return (
    <div className="bg-white rounded-md shadow-md p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Social Media Information</h2>
      <ul className="space-y-4">
        {Object.values(socials).map((social) => (
          <li key={social.username} className="bg-white rounded-md shadow-md p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">GitHub: {social.github}</p>
                <p className="font-medium">LinkedIn: {social.linkedin}</p>
                <p className="font-medium">Instagram: {social.insta}</p>
                <p className="font-medium">Upwork: {social.upwork}</p>
                <p className="font-medium">x: {social.x}</p>

              </div>
              <button
                onClick={() => onDelete(social.username)}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Sendsocialdat = () =>{
    const [socials, setSocials] = useState({});

    useEffect(() => {
      const fetchSocials = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API}/devs/socials`, {
            withCredentials: true,
          });
          setSocials(response.data);
        } catch (error) {
          console.error('Error fetching social media information:', error);
        }
      };
      fetchSocials();
    }, []);

    return {socials};
}



// Social Media CRUD Component
const SocialMediaCRUD = () => {
  const [socials, setSocials] = useState({});

  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/devs/socials`, {
          withCredentials: true,
        });
        setSocials(response.data);
      } catch (error) {
        alert('Failed to fetch social media information');
      }
    };
    fetchSocials();
  }, []);

  const createOrUpdateSocials = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/devs/socials`, formData, {
        withCredentials: true,
      });
      setSocials({ ...socials, [response.data.username]: response.data });
      alert('Social media information updated');
    } catch (error) {
      console.error('Error creating or updating social media information:', error);
      alert('Failed to update social media information');
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
      alert('Social media information deleted');
    } catch (error) {
      console.error('Error deleting social media information:', error);
      alert('Failed to delete social media information');
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <SocialMediaForm onSubmit={createOrUpdateSocials} />
      <SocialMediaList socials={socials} onDelete={deleteSocials} />
    </div>
  );
};

export default SocialMediaCRUD;