import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PopupModal from '../composants/Popup';
import Cookies from 'js-cookie';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [response, setResponse] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost/api/auth/login', { username, password });
      setResponse(response.data.message);
      Cookies.set('token', response.data.yourAccessToken);
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
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <br></br>
      <p>No account?</p>
      <Link to="/register">Register</Link><br></br>
      <Link to="/compte">Compte</Link>
    </div>
  );
};

export default Login;