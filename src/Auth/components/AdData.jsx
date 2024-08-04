import React, { useState } from 'react';
import axios from 'axios';

const AdData = ({email}) => {
//   const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [usernameCheckMessage, setUsernameCheckMessage] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleUsernameCheck = async () => {
   
    try {
      const response = await axios.post('http://localhost:5000/auth/checkusername', { username });
      setUsernameCheckMessage(response.data.message);
    } catch (error) {
      setUsernameCheckMessage(`Error: ${error.response.data.error}`);
    }
  };

  const usernameget =(e)=>{
    e.preventDefault();
    setUsername(e.target.value);
    handleUsernameCheck();
  }
  

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/addpassword', {
        email,
        username,
        password
      });
      setRegistrationMessage(response.data.message);
    } catch (error) {
      setRegistrationMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Registration</h1>
      
      <div className="mb-8">
      
        {usernameCheckMessage && <p>{usernameCheckMessage}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Register</h2>
        <form onSubmit={handleRegistration}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              className="border text-black border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
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
      </div>
    </div>
  );
};

export default AdData;
