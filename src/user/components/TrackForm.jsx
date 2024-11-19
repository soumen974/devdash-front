import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import {X } from 'lucide-react';
export default function TrackForm({setTrackFormShow,trackFormShow}) {

  const cancelButtonRef1 = useRef(null);
  // Props.settrackFormShow
  const [formData, setFormData] = useState({
    github_id: '',
    github_token: '',
    // Add other platform fields as necessary
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/dev/track`, // Adjust endpoint as needed
        formData,
        {
          withCredentials: true, // Include credentials for authentication
        }
      );
      setMessage(response.data.message);
      setTrackFormShow( false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Server error');
      } else {
        setError('Error submitting the form');
      }
    } finally {
      setLoading(false);
    }
  };



  

  return (
   <>
   <Transition.Root show={trackFormShow  } as={Fragment}>
<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef1} onClose={setTrackFormShow}>
  <Transition.Child
    as={Fragment}
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div id='Login' className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
  </Transition.Child>

  <div className=" fixed inset-0  w-screen overflow-y-auto z-0">
    <div className=" flex min-h-full items-center justify-center p-2 text-center sm:items-center sm:p-0">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Dialog.Panel className="bg-[#2A2A32] py-10 px-0  relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
        
       
        <div className=" mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 max-w-lg w-full">

            <div className="flex cursor-pointer justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Add Track Information
                </h2>
                
              </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            {message && <div className="text-green-500 mb-4">{message}</div>}

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2" htmlFor="github_id">
                GitHub ID
              </label>
              <input
                id="github_id"
                name="github_id"
                type="text"
                value={formData.github_id}
                onChange={handleChange}
                required
                className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">
                GitHub Token
              </label>
              <input
                id="github_token"
                name="github_token"
                type="text"
                value={formData.github_token}
                onChange={handleChange}
                required
                className="w-full bg-[#1E1E24] text-white border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5F85] focus:border-transparent"
              />
            </div>

          

            <div className="flex items-center justify-between">
                <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#FD356E] text-white rounded-md hover:bg-[#FF5F85] transition-colors"
              >
                { loading ? 'Saving...' : 'Submit'}  Track Info
              </button>
            </div>
          </form>
        
        
        </div> 

     

          
        </Dialog.Panel>
      </Transition.Child>
    </div>
  </div>
</Dialog>
</Transition.Root> 
   </>
  );
};



