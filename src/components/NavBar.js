import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  useEffect(() => {
    // Initialize Bootstrap dropdowns manually
    const bootstrap = window.bootstrap;
    if (bootstrap) {
      const dropdownElements = document.querySelectorAll('.dropdown-toggle');
      dropdownElements.forEach(el => new bootstrap.Dropdown(el));
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Find My Pet</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            )}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogoutClick}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
