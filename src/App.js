import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddPet from './pages/AddPet';
import Profile from './pages/Profile';
import SubscriptionSelection from './components/SubscriptionSelection';
import NavBar from './components/NavBar';
import Loader from './components/Loader';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);

      axios.get('/api/user/profile')
        .then(response => {
          setIsSignedUp(response.data ? true : false);
        })
        .catch(error => {
          console.error('Failed to fetch user profile', error);
          setIsSignedUp(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    setIsSignedUp(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} isSignedUp={isSignedUp} />} />
          <Route path="/signup" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={isAuthenticated ? (isSignedUp ? <Dashboard /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/add-pet" element={isAuthenticated ? (isSignedUp ? <AddPet /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? (isSignedUp ? <Profile /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/subscribe" element={isAuthenticated ? (isSignedUp ? <SubscriptionSelection /> : <Navigate to="/" />) : <Navigate to="/" />} />
          <Route path="/logout" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
