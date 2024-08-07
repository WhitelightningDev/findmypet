import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUserEdit, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import '../Profile.css'; // Import the custom CSS file for additional styling

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    address: {
      street: '',
      number: '',
      suburb: '',
      country: '',
      province: ''
    },
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3030/'; // Base URL of your server

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user details
        const userResponse = await axios.get(`${baseURL}api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${baseURL}api/user/profile`, user, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(false);
      setError('');
    } catch (err) {
      setError('Failed to save user data');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <FaSpinner className="spinner-border text-primary" role="status" />
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Profile</h2>

      {error && (
        <div className="alert alert-danger d-flex align-items-center mb-4">
          <FaExclamationTriangle className="me-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="card profile-card shadow-lg border-light mb-5">
        <div className="card-body">
          <h5 className="card-title mb-4">
            <FaUserEdit className="me-2" />
            {editMode ? 'Edit Profile' : 'View Profile'}
          </h5>

          <form>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={user.name}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="surname" className="form-label">Surname</label>
                <input
                  type="text"
                  className="form-control"
                  id="surname"
                  value={user.surname}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, surname: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="street" className="form-label">Street</label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={user.address.street}
                disabled={!editMode}
                onChange={(e) => setUser({ ...user, address: { ...user.address, street: e.target.value } })}
              />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="number" className="form-label">Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  value={user.address.number}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, address: { ...user.address, number: e.target.value } })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="suburb" className="form-label">Suburb</label>
                <input
                  type="text"
                  className="form-control"
                  id="suburb"
                  value={user.address.suburb}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, address: { ...user.address, suburb: e.target.value } })}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="country" className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={user.address.country}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, address: { ...user.address, country: e.target.value } })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="province" className="form-label">Province</label>
                <input
                  type="text"
                  className="form-control"
                  id="province"
                  value={user.address.province}
                  disabled={!editMode}
                  onChange={(e) => setUser({ ...user, address: { ...user.address, province: e.target.value } })}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={user.email}
                disabled={!editMode}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
            <div className="d-flex justify-content-between">
              {editMode && (
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                  <FaSave className="me-2" />
                  Save Changes
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
