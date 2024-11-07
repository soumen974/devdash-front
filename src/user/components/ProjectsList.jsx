import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import axios from 'axios';
import ProjectsForm from '../components/ProjectsForm';

// Configure axios defaults
const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  withCredentials: true
});

const ProjectsList = ({UseForShow}) => {
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
    <div className="max-w-6xl mx-auto">
       {!UseForShow?
       (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Recent Projects</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Project
        </button>
      </div>
       ):(null)}

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

      {!UseForShow?
      (
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
      )
      :(

      <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2  justify-between   ">
       {projects.map((project) => (
              <div key={project._id} className=" ">
                <div className="border backdrop-blur-2xl bg-gradient-to-b border-neutral-700 from-inherit bg-zinc-800/30 flex flex-col gap-4 items-start w-fit mx-auto p-4 relative z-0    ">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

                    

                    <div className="grid gap-2">
                        <div className="">
                          <h1 className='text-white'>{project.title}</h1>
                        </div>

                        <h2 className="dark:text-white text-black  text-sm font-light">
                          {project.description}
                        </h2>
                    </div>
                    
                    {project.skills?.length > 0 && (
                    <div className=" flex flex-wrap gap-2 w-[90%]">
                      {project.skills.map((skill) => (
                        <h1 key={skill._id} className=' w-fit text-[0.7rem] border  border-neutral-700 rounded-full   shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]  p-1 px-4 items-center justify-center text-white'> {skill.name}</h1>
                      ))}
                    </div>
                  )}

                </div>

              
              </div>

        ))}
      </div>
      )}
      

    </div>
  );
};

export default ProjectsList;

const Icon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};