import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPet from './pages/AddPet';
import Profile from './pages/Profile'; // Import the Profile page component
import SubscriptionSelection from './components/SubscriptionSelection'; // Import the SubscriptionSelection page component
import NavBar from './components/NavBar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const baseURL = 'http://localhost:3030/'; // Base URL of your server

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);

      // Fetch user profile to check if the user is signed up
      axios.get(`${baseURL}api/user/profile`)
        .then(response => {
          if (response.data) {
            setIsSignedUp(true);
          }
        })
        .catch(error => {
          console.error('Failed to fetch user profile', error);
          setIsSignedUp(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setIsSignedUp(false);
  };

  return (
    <Router>
      <div>
        <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} isSignedUp={isSignedUp} />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/add-pet" element={isAuthenticated ? <AddPet /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/subscribe" element={isAuthenticated ? <SubscriptionSelection /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Navigate to="/" />} />
          {/* Add other routes as necessary */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
