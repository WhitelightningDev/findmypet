import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (e.g., fetching initial data)
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/subscribe" element={<SubscriptionSelection />} />
          <Route path="/logout" element={<Home />} /> {/* Redirects to home after logout */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
