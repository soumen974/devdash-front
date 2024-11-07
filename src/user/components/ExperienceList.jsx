// ExperienceList.jsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import ExperienceForm from '../components/ExperienceForm';

// Configure axios defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

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

export default ExperienceList;