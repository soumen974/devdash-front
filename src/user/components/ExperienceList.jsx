import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';

// Configure axios defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

// Experience Display Page Component
const ExperienceList = () => {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/dev');
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/dev/${id}`);
      setExperiences(experiences.filter(exp => exp._id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  const handleRemoveLearning = async (experienceId, learningId) => {
    try {
      const { data } = await api.delete(`/dev/${experienceId}/learnings/${learningId}`);
      setExperiences(prev => 
        prev.map(exp => exp._id === experienceId ? data : exp)
      );
    } catch (error) {
      console.error('Error removing learning:', error);
    }
  };

  const handleRemoveSkill = async (experienceId, skillId) => {
    try {
      const { data } = await api.delete(`/dev/${experienceId}/skills/${skillId}`);
      setExperiences(prev => 
        prev.map(exp => exp._id === experienceId ? data : exp)
      );
    } catch (error) {
      console.error('Error removing skill:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Experiences</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Experience
        </button>
      </div>

      {showForm && (
        <ExperienceForm 
          experience={editingExperience}
          onClose={() => {
            setShowForm(false);
            setEditingExperience(null);
          }}
          onSubmit={fetchExperiences}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience) => (
          <div key={experience._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                {experience.companyLogoUrl && (
                  <img 
                    src={experience.companyLogoUrl} 
                    alt={experience.companyName}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{experience.position}</h2>
                  <p className="text-gray-600">{experience.companyName}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => {
                    setEditingExperience(experience);
                    setShowForm(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(experience._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">{experience.location}</p>
                <p className="text-gray-600">{experience.time}</p>
              </div>
              
              {experience.learnings?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Key Learnings</h3>
                  <ul className="list-disc pl-4">
                    {experience.learnings.map((learning) => (
                      <li key={learning._id} className="text-gray-600 flex items-center justify-between">
                        {learning.name}
                        <button
                          onClick={() => handleRemoveLearning(experience._id, learning._id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {experience.skills?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span 
                        key={skill._id}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill.name}
                        <button
                          onClick={() => handleRemoveSkill(experience._id, skill._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Experience Form Component
const ExperienceForm = ({ experience, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    position: '',
    companyName: '',
    location: '',
    time: '',
    learnings: [],
    skills: [],
    ...experience
  });
  const [newLearning, setNewLearning] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    
    // Append basic fields
    formDataObj.append('position', formData.position);
    formDataObj.append('companyName', formData.companyName);
    formDataObj.append('location', formData.location);
    formDataObj.append('time', formData.time);
    
    // Handle array fields
    formDataObj.append('learnings', JSON.stringify(formData.learnings));
    formDataObj.append('skills', JSON.stringify(formData.skills));
    
    // Handle file fields only if they exist
    if (formData.companyLogoUrl instanceof File) {
      formDataObj.append('companyLogoUrl', formData.companyLogoUrl);
    }
    if (formData.relatedPDFUrl instanceof File) {
      formDataObj.append('relatedPDFUrl', formData.relatedPDFUrl);
    }

    try {
      if (experience) {
        await api.put(`/dev/${experience._id}`, formDataObj);
      } else {
        await api.post('/dev', formDataObj);
      }
      
      onSubmit();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const addLearning = async () => {
    if (!newLearning.trim()) return;

    try {
      if (experience) {
        const { data } = await api.post(`/dev/${experience._id}/learnings`, {
          name: newLearning.trim()
        });
        setFormData(prev => ({ ...prev, learnings: data.learnings }));
      } else {
        setFormData(prev => ({
          ...prev,
          learnings: [...prev.learnings, { name: newLearning.trim() }]
        }));
      }
      setNewLearning('');
    } catch (error) {
      console.error('Error adding learning:', error);
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      if (experience) {
        const { data } = await api.post(`/dev/${experience._id}/skills`, {
          name: newSkill.trim()
        });
        setFormData(prev => ({ ...prev, skills: data.skills }));
      } else {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, { name: newSkill.trim() }]
        }));
      }
      setNewSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const removeLearning = async (index, learningId) => {
    try {
      if (experience && learningId) {
        const { data } = await api.delete(`/dev/${experience._id}/learnings/${learningId}`);
        setFormData(prev => ({ ...prev, learnings: data.learnings }));
      } else {
        setFormData(prev => ({
          ...prev,
          learnings: prev.learnings.filter((_, i) => i !== index)
        }));
      }
    } catch (error) {
      console.error('Error removing learning:', error);
    }
  };

  const removeSkill = async (index, skillId) => {
    try {
      if (experience && skillId) {
        const { data } = await api.delete(`/dev/${experience._id}/skills/${skillId}`);
        setFormData(prev => ({ ...prev, skills: data.skills }));
      } else {
        setFormData(prev => ({
          ...prev,
          skills: prev.skills.filter((_, i) => i !== index)
        }));
      }
    } catch (error) {
      console.error('Error removing skill:', error);
    }
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
              {experience ? 'Update' : 'Create'} Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceList;