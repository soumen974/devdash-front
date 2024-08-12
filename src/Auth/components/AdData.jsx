import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdData = ({email,setMessagetoAuth}) => {
//   const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [usernameCheckMessage, setUsernameCheckMessage] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  // const handleUsernameCheck = async () => {
   
  //   try {
  //     const response = await axios.post('http://localhost:5000/auth/checkusername', { username });
  //     setUsernameCheckMessage(response.data.message);
  //   } catch (error) {
  //     setUsernameCheckMessage(`Error: ${error.response.data.error}`);
  //   }
  // };

  // const usernameget =(e)=>{
  //   e.preventDefault();
  //   setUsername(e.target.value);
  //   setTimeout(() => {
  //     handleUsernameCheck();
  //   }, 1000);
    
  // }
  


  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const usernameget = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
    setMessage('');
    setError('');
    setTimeout(() => {
      handleUsernameCheck();
    }, 500);
  };

  const handleUsernameCheck = async () => {
   
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/usernamecheck`, { username });
      if (response.data.exists) {
        setMessage(response.data.message);
      } else {
        setMessage(response.data.message);
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        // setError(err.response.data.errors[0].msg);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };
  


  // ----------------------

  const navigate=useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/addpassword`, {
        email,
        username,
        password
      });
      setRegistrationMessage(response.data.message);
      setMessagetoAuth(response.data.message);
      setTimeout(() => {
        navigate('/auth/login');
      }, 1500);
    } catch (error) {
      setRegistrationMessage(`Error: ${error.response.data.error}`);
      setTimeout(() => {
        setRegistrationMessage(``);

      }, 2000);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Registration</h1>
      
      <div className="mb-8">
      
        {/* {usernameCheckMessage && <p>{usernameCheckMessage}</p>} */}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Register</h2>
        <form onSubmit={handleRegistration}>
          
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
            //   onChange={(e) => setUsername(e.target.value)}
                     onChange={usernameget}
                    
              className="border text-black border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border text-black border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
          
          
          <button type="submit" className="bg-green-500 text-white p-2 rounded">Register</button>
        </form>
        {registrationMessage && <p>{registrationMessage}</p>}
        {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default AdData;
