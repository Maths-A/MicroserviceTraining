import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopupModal from '../composants/Popup';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost/api/auth/register', { username, password });
      setResponse(response.data.message);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error:', error);
      setResponse(error.response.data.message);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Register</h2>
      <PopupModal
        isOpen={modalIsOpen}
        message={response}
        onRequestClose={closeModal}
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <br></br>
      <p>Already have an account?</p>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;