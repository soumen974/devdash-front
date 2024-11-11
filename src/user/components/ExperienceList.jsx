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

const ExperienceList = ({UseForShow}) => {
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
    <div className=" max-w-6xl mx-auto">
     {!UseForShow? 
      <div className="flex justify-between items-center mb-4 mt-14">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
            Personal Recent Experiences
          </h1>
          <p className="text-gray-400">
            Manage and update your profile details
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)} 
          className="px-6 flex items-center py-3 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] text-white rounded-lg hover:from-[#FF5F85] hover:to-[#FD356E] focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:ring-offset-2 focus:ring-offset-[#2A2A32] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
          <Plus size={20} /> Add Experience
        </button>
      </div>
      :null}

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

      {!UseForShow? 

      /* editable compoent */
      (
      <div className="">
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
                    <h2 className="text-xl  font-bold">{experience.position}</h2>
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
      ):

      /* portfoio showing component */

      (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 md:grid-cols-2 justify-between">
        {experiences.map((experience) => (
          <div key={experience._id} className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-800 from-inherit bg-zinc-800/30 sm:grid flex gap-x-5 gap-y-2 mt-4 p-3 w-full rounded-xl sm:rounded-md">
            <div>
            {experience.companyLogoUrl && (
              <img src={experience.companyLogoUrl} className="w-16 h-16 rounded-md" alt="SoumenBhunia" width={64} height={64} />
            )}
              </div>
            <div>
              <h1 className='text-white'>{experience.position}</h1>
              <h2 className='text-white text-sm font-light'>{experience.companyName}</h2>
              <h3 className='text-gray-100 font-thin text-sm'>{experience.time}</h3>
            </div>
          </div>
        ))}
      </div>
      )}

    </div>
  );
};

export default ExperienceList;