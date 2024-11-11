import React, { useState ,useEffect} from 'react';
import { X ,Upload } from 'lucide-react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

const ExperienceForm = ({ experience, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (experience) {
      setFormData({
        ...experience,
        companyLogoUrl: experience.companyLogoUrl || null,
        relatedPDFUrl: experience.relatedPDFUrl || null,
      });
    }
  }, [experience]);
  

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
    <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-[#2A2A32] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              {formData.position ? 'Edit' : 'Add'} Experience
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Form fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                required
              />
            </div>
          </div>

          {/* Location and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Time Period</label>
              <input
                type="text"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                required
              />
            </div>
          </div>

          {/* File uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* image */}
            <div>
              <label className="block text-gray-400 text-sm mb-4">Company Logo</label>
              <div className="bg-[#1E1E24] border border-gray-700 rounded-lg p-4">
                {formData.companyLogoUrl  ? (
                  <div className="relative inline-block">
                    <img 
                      src={formData.companyLogoUrl } 
                      alt="company image" 
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, companyLogoUrl: null }))}
                      className="absolute -top-2 -right-2 bg-[#31313b]   rounded-full p-1 hover:bg-[#FD356E] transition-colors"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6">
                    <input
                        type="file"
                        name="companyLogoUrl"  
                        id="companyLogoUrl"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <label
                      htmlFor="companyLogoUrl"
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



            {/* pdf */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-400">Related PDF</label>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="relatedPDFUrl"
                  className="cursor-pointer bg-[#FD356E] text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-[#FF5F85] transition-colors"
                >
                  Choose File
                </label>
                <span className="text-gray-400 text-sm">
                  {formData.relatedPDFUrl ? formData.relatedPDFUrl.name : 'No file chosen'}
                </span>
              </div>
              <input
                type="file"
                name="relatedPDFUrl"
                id="relatedPDFUrl"
                onChange={handleChange}
                className="hidden"
                accept=".pdf"
              />
            </div>
          </div>

          {/* Learnings */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Learnings</label>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newLearning}
                onChange={(e) => setNewLearning(e.target.value)}
                className="flex-1 p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                placeholder="Add a learning..."
              />
              <button
                type="button"
                onClick={addLearning}
                className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {formData.learnings.map((learning, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-2 text-white"
                >
                  {learning.name}
                  <button
                    type="button"
                    onClick={() => removeLearning(idx)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-400">Skills</label>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-3 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#FD356E] focus:border-[#FD356E] bg-[#1E1E24] text-white"
                placeholder="Add a skill..."
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {formData.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-700 rounded-full text-sm flex items-center gap-2 text-white"
                >
                  {skill.name}
                  <button
                    type="button"
                    onClick={() => removeSkill(idx)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
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
              {formData.position ? 'Update' : 'Create'} Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;