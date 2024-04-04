import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Compte from './pages/Compte';
import Cookies from 'js-cookie';
import axios from 'axios';
import './App.css';

let isAuth = () => {
  const token = Cookies.get('token');
  let validity = true;
  if(token){
      axios.get('http://localhost/api/auth/authenticate', { headers: { 'Authorization': 'Bearer ' + token }})
      .then(response => {
        console.log(response)
        console.log(response.status)
        if (response.status >= 200 && response.status < 300) {
          return validity;
        } else {
          console.log('false1')
          validity = false;
        }
      })
      .catch(error => {
        console.log(error)
        console.log('false2')
        validity = false;
      });
  } else {
    console.log('false4')
    validity = false;
  }
  return validity;
};

const PrivateRoutes = () => {
  return ( isAuth() ? <Outlet/> : <Navigate to='/login'/> )
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route element={<PrivateRoutes/>}>
          <Route path="/compte" element={ <Compte/> } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;