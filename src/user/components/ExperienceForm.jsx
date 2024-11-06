import React, { useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

const ExperienceForm = ({ experience, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    position: '',
    companyName: '',
    location: '',
    time: '',
    companyLogoUrl: null,
    relatedPDFUrl: null,
    learnings: experience?.learnings || [],
    skills: experience?.skills || [],
  });
  const [newLearning, setNewLearning] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (experience) {
        await api.put(`/dev/${experience._id}`, formData);
      } else {
        await api.post('/dev', formData);
      }
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addLearning = () => {
    if (!newLearning.trim()) return;

    setFormData(prev => ({
      ...prev,
      learnings: [...prev.learnings, { name: newLearning.trim() }]
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
    setFormData(prev => ({
      ...prev,
      learnings: prev.learnings.filter((_, i) => i !== index)
    }));
  };

  const removeSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {experience ? 'Edit' : 'Add'} Experience
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
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Location and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time Period</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* File uploads */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Logo</label>
              <input
                type="file"
                name="companyLogoUrl"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Related PDF</label>
              <input
                type="file"
                name="relatedPDFUrl"
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                accept=".pdf"
              />
            </div>
          </div>

          {/* Learnings */}
          <div>
            <label className="block text-sm font-medium mb-1">Learnings</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newLearning}
                onChange={(e) => setNewLearning(e.target.value)}
                className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a learning..."
              />
              <button
                type="button"
                onClick={addLearning}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.learnings.map((learning, idx) => (
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

          {/* Form actions */}
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
              {experience ? 'Update' : 'Create'} Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;