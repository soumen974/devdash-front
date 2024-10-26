import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';

export default function TrackForm(Props) {

  const cancelButtonRef1 = useRef(null);
  
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
      Props.settrackFormShow( false);
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
   <Transition.Root show={Props.trackFormShow  } as={Fragment}>
<Dialog as="div" className="relative z-40" initialFocus={cancelButtonRef1} onClose={Props.settrackFormShow}>
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
    <div className=" flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <Dialog.Panel className="bg-white py-10 px-5  relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
        
       
    <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="px-8 pt-6 pb-8 mb-4 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Track Information</h1>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {message && <div className="text-green-500 mb-4">{message}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="github_id">
            GitHub ID
          </label>
          <input
            id="github_id"
            name="github_id"
            type="text"
            value={formData.github_id}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="github_token">
            GitHub Token
          </label>
          <input
            id="github_token"
            name="github_token"
            type="text"
            value={formData.github_token}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

      

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Track Info
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



