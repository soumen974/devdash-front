import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Github, Linkedin, Instagram, Twitter, Globe } from 'lucide-react';

// Social Media Form Component
const SocialMediaForm = ({ onSubmit, editData, onClose }) => {
  const [formData, setFormData] = useState({
    github: '',
    linkedin: '',
    x: '',
    insta: '',
    upwork: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        </div>

        <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 p-6 text-left align-middle shadow-xl transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              {editData ? 'Edit Profile Links' : 'Add Social Media'}
            </h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-zinc-300">
                <Github size={16} className="mr-2" /> GitHub
              </label>
              <input
                type="text"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-zinc-500 transition-all"
                placeholder="Your GitHub profile URL"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-zinc-300">
                <Linkedin size={16} className="mr-2" /> LinkedIn
              </label>
              <input
                type="text"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-zinc-500 transition-all"
                placeholder="Your LinkedIn profile URL"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-zinc-300">
                <Twitter size={16} className="mr-2" /> Twitter/X
              </label>
              <input
                type="text"
                name="x"
                value={formData.x}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-zinc-500 transition-all"
                placeholder="Your Twitter/X profile URL"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-zinc-300">
                <Instagram size={16} className="mr-2" /> Instagram
              </label>
              <input
                type="text"
                name="insta"
                value={formData.insta}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-zinc-500 transition-all"
                placeholder="Your Instagram profile URL"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center text-sm font-medium text-zinc-300">
                <Globe size={16} className="mr-2" /> Upwork
              </label>
              <input
                type="text"
                name="upwork"
                value={formData.upwork}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-zinc-800/50 border border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-white placeholder-zinc-500 transition-all"
                placeholder="Your Upwork profile URL"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-pink-500 transition-all"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-md hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-pink-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : editData ? 'Save Changes' : 'Add Links'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Social Media List Component
const SocialMediaList = ({ socials, onDelete, onSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleEdit = (social) => {
    setEditData(social);
    setShowForm(true);
  };

  const handleDelete = async (username) => {
    try {
      await onDelete(username);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const socialIcons = {
    github: <Github size={16} className="text-zinc-400" />,
    linkedin: <Linkedin size={16} className="text-zinc-400" />,
    x: <Twitter size={16} className="text-zinc-400" />,
    insta: <Instagram size={16} className="text-zinc-400" />,
    upwork: <Globe size={16} className="text-zinc-400" />
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
            Social Media Links
          </h1>
          <p className="mt-2 text-zinc-400">
            Manage your social media presence and professional profiles
          </p>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-md hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-pink-500 transition-all"
        >
          <Plus size={20} className="mr-2" /> Add Social Media
        </button>
      </div>

      <div className="grid gap-4">
        {Array.isArray(Object.values(socials)) && Object.values(socials).length > 0 ? (
          Object.values(socials).map((social) => (
            <div
              key={social.username}
              className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-6  transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(social).map(([key, value]) => {
                    if (key !== 'username'&& key !== '_id' && value) {
                      return (
                        <div key={key} className="flex items-center space-x-2">
                          {socialIcons[key]}
                          <a
                            href={value}
                            rel="noopener noreferrer"
                            className="text-zinc-300 hover:text-white truncate transition-colors"
                          >
                            {value}
                          </a>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>

                <div className="flex items-center gap-2 md:self-start">
                  <button
                    onClick={() => handleEdit(social)}
                    className="p-2 text-zinc-400 hover:text-white rounded-md hover:bg-zinc-800/50 transition-all"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(social.username)}
                    className="p-2 text-zinc-400 hover:text-red-500 rounded-md hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {showDeleteConfirm === social.username && (
                <div className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm rounded-lg flex items-center justify-center p-6">
                  <div className="text-center">
                    <p className="text-white mb-4">Are you sure you want to delete these social media links?</p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setShowDeleteConfirm(null)}
                        className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 rounded-md hover:bg-zinc-700 transition-all"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(social.username)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800/50 rounded-lg">
            <p className="text-zinc-400">No social media links added yet.</p>
            <button
              onClick={() => {
                setEditData(null);
                setShowForm(true);
              }}
              className="mt-4 text-pink-500 hover:text-pink-400 transition-colors"
            >
              Add your first social media link
            </button>
          </div>
        )}
      </div>

      {showForm && (
        <SocialMediaForm
          editData={editData}
          onClose={() => {
            setShowForm(false);
            setEditData(null);
          }}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

// Main CRUD Component
const SocialMediaCRUD = () => {
  const [socials, setSocials] = useState({});
  const [loading, setLoading] = useState(true);

  const createOrUpdateSocials = async (formData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/devs/socials`, formData, {
        withCredentials: true,
      });
      setSocials({ ...socials, [response.data.username]: response.data });
      return response.data;
    } catch (error) {
      console.error('Error updating social media:', error);
      throw error;
    }
  };

  const fetchSocials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API}/devs/socials`, {
        withCredentials: true,
      });
      setSocials(response.data);
    } catch (error) {
      console.error('Error fetching socials:', error);
    } finally {
      setLoading(false);
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
      return true;
    } catch (error) {
      console.error('Error deleting socials:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[250px]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-zinc-800 rounded mb-4"></div>
          <div className="h-4 w-48 bg-zinc-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-[250px]">
      <SocialMediaList 
        socials={socials} 
        onSubmit={createOrUpdateSocials} 
        onDelete={deleteSocials}
      />
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

export default SocialMediaCRUD;