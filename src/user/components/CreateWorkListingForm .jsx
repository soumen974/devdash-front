import React, { useState } from 'react';
import axios from 'axios';
import AnalogDateInput  from '../components/AnalogTimeInput'; 

const CreateWorkListingForm = () => {
  const [formData, setFormData] = useState({
    task_name: '',
    task_description: '',
    completion_time: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/work/createWorkListing`, formData, {
        withCredentials: true,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage('')
        formData.task_name = '';
        formData.task_description = '';
        formData.completion_time = '';
      }, 1500);
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Server error');
      } else {
        setError('Error submitting the form');
      }
    }
  };

  return (
    <div className="min-h-[400px] flex items-center justify-center w-full p-4">
      <div className="w-full max-w-md backdrop-blur-lg bg-[#1E1E24]/90 rounded-2xl shadow-2xl border border-[#FD356E]/10 overflow-hidden">
        {/* Header Section */}
        <div className="relative px-6 pt-8 pb-6 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD356E]/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h2 className="text-3xl font-bold text-white mb-3 relative">
            Create Work Listing
          </h2>
          <p className="text-gray-400 text-sm relative">
            Fill out the form to create a new work listing 
          </p>
        </div>

        

        {/* Form Section */}
        <div className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Task Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Task Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="task_name"
                    value={formData.task_name}
                    onChange={(e) => handleChange('task_name', e.target.value)}
                    className="w-full h-12 px-4 bg-[#2A2A32] text-white rounded-xl border-2 border-gray-700/50 
                    focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 
                    transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01]"
                    required
                  />
                 
                </div>
              </div>

              {/* Task Description Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Task Description</label>
                <textarea
                  name="task_description"
                  value={formData.task_description}
                  onChange={(e) => handleChange('task_description', e.target.value)}
                  className="w-full h-24 px-4 py-3 bg-[#2A2A32] text-white rounded-xl border-2 border-gray-700/50 
                  focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 
                  transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] resize-none"
                  required
                ></textarea>
              </div>

              {/* Completion Date Field */}
              <AnalogDateInput
                name="completion_date"
                value={formData.completion_time}
                onChange={(value) => handleChange('completion_time', value)}
                className=" "
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl text-white font-medium 
              bg-gradient-to-r from-[#FD356E] to-[#FF5F85] 
              hover:from-[#FF5F85] hover:to-[#FD356E] 
              transition-all duration-200 transform hover:scale-[1.02] 
              active:scale-[0.98] shadow-lg hover:shadow-[#FD356E]/20"
            >
              Create Listing
            </button>

            {/* Status Messages */}
            {message && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  {message}
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  {error}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkListingForm;