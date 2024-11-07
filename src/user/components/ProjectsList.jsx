import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import ProjectsForm from '../components/ProjectsForm';

// Configure axios defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/devs/project');
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/devs/project/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleRemoveLearning =  async (projectId, learningId) => {
    try {
      const { data } = await api.delete(`/devs/project/${projectId}/learnings/${learningId}`);
      setProjects(prev => 
        prev.map(project => project._id === projectId ? data : project)
      );
    } catch (error) {
      console.error('Error removing learning:', error);
    }
  };

  const handleRemoveSkill = async (projectId, skillId) => {
    try{
        const { data } = await api.delete(`devs/project/${projectId}/skills/${skillId}`);
        setProjects(prev => 
            prev.map(project => project._id === projectId ? data : project)
          );
    }catch(error){
        console.error('Error removing learning:', error);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Projects</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>

      {showForm && (
        <ProjectsForm 
          project={editingProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSubmit={fetchProjects}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                {project.thumbNailImage && (
                  <img 
                    src={project.thumbNailImage} 
                    alt={project.title}
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h2 className="text-xl font-bold">{project.title}</h2>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Website
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                >
                  <Edit size={16} />
                </button>
                <button 
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  onClick={() => handleDelete(project._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="">
                <p className="text-gray-600">{project.description}</p>
              </div>

              {project.learning?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Key Learnings</h3>
                  <ul className="list-disc pl-4">
                    {project.learning.map((learning) => (
                      <li key={learning._id} className="text-gray-600 flex items-center justify-between">
                        {learning.name}
                        <button
                          onClick={() => handleRemoveLearning(project._id, learning._id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {project.skills?.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span 
                        key={skill._id}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill.name}
                        <button
                          onClick={() => handleRemoveSkill(project._id, skill._id)}
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

export default ProjectsList;