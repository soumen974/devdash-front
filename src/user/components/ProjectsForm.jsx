import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';


const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });


const ProjectForm = ({ project, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    github_link: project?.github_link || '',
    website_link: project?.website_link || '',
    description: project?.description || '',
    learning: project?.learning || [],
    skills: project?.skills || [],
    thumbNailImage: null,
  });

  const [newLearning, setNewLearning] = useState('');
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        thumbNailImage: null,
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (project) {
        await api.put(`/devs/project/${project._id}`, formData);
      } else {
        await api.post('/devs/project', formData);
      }
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleLearningChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      learning: prev.learning.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSkillsChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addLearning = () => {
    if (!newLearning.trim()) return;

    setFormData(prev => ({
      ...prev,
      learning: [...prev.learning, { name: newLearning.trim() }]
    }));
    setNewLearning('');
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;

    setFormData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: newSkill.trim() }]
    }));
    setNewSkill('');
  };

  const removeLearning = (index) => {
    setFormData((prev) => ({
      ...prev,
      learning: prev.learning.filter((_, i) => i !== index),
    }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {project ? 'Edit' : 'Add'} Project
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link</label>
              <input
                type="text"
                name="github_link"
                value={formData.github_link}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Website Link</label>
              <input
                type="text"
                name="website_link"
                value={formData.website_link}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Thumbnail Image</label>
              <input
                type="file"
                name="thumbNailImage"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Learning</label>
           
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newLearning}
                  onChange={(e) => setNewLearning(e.target.value)}
                  className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  
                  placeholder="Add a learning..."
                />
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={addLearning}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>

                

              </div>

              <div className="flex flex-wrap gap-2">
                  {formData.learning.map((learning, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                    >
                      {learning.name}
                      <button
                        type="button"
                        onClick={() => removeLearning(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
          
          </div>

         {/* Skills */}
         <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a skill..."
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => removeSkill(idx)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {project ? 'Update' : 'Create'} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;