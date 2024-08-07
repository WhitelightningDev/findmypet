import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaPlus, FaSpinner, FaUserCircle, FaExclamationTriangle, FaGift, FaMoneyBillWave, FaTrash } from 'react-icons/fa';
import '../Dashboard.css'; // Import the CSS file for custom styles

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3030/'; // Base URL of your server

  useEffect(() => {
    const fetchData = async () => {
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

        // Fetch user pets
        const petsResponse = await axios.get(`${baseURL}api/pet`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPets(petsResponse.data);

        // Fetch user subscription status
        const subscriptionResponse = await axios.get(`${baseURL}api/subscription`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscription(subscriptionResponse.data.length > 0 ? subscriptionResponse.data[0] : null);

      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const deletePet = async (petId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseURL}api/pet/${petId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPets(pets.filter(pet => pet._id !== petId));
    } catch (err) {
      setError('Failed to delete pet');
      console.error(err);
    }
  };

  const handlePetClick = (pet) => {
    localStorage.setItem('selectedPet', JSON.stringify(pet));
    navigate('/add-pet');
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <FaSpinner className="spinner-border text-primary" role="status" />
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Dashboard</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          {user && (
            <div className="d-flex align-items-center">
              <FaPaw className="me-2 text-primary" size={24} />
              <span className="fs-4">Welcome, {user.name}!</span>
            </div>
          )}
        </div>
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/profile')}
        >
          <FaUserCircle className="me-2" />
          Profile
        </button>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4 d-flex">
          {/* Ensure uniform card width */}
          <div className="card border-primary shadow-sm flex-fill hover-effect" style={{ minHeight: '200px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">
                <FaPlus className="me-2" />
                Add a New Pet
              </h5>
              <button
                className="btn btn-primary mt-3"
                onClick={() => navigate('/add-pet')}
              >
                Add Pet
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 d-flex">
          <div className="card border-success shadow-sm flex-fill hover-effect" style={{ minHeight: '200px' }}>
            <div className="card-body text-center">
              <h5 className="card-title">
                <FaGift className="me-2" />
                Subscription Status
              </h5>
              {subscription ? (
                <div>
                  <p className="fs-6 mb-1">Plan ID: <strong>{subscription.planId}</strong></p>
                  <p className="fs-6 mb-1">Next Billing Date: <strong>{new Date(subscription.nextBillingDate).toLocaleDateString()}</strong></p>
                </div>
              ) : (
                <div>
                  <p className="fs-6 mb-3">You do not have an active subscription.</p>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate('/subscribe')}
                  >
                    <FaMoneyBillWave className="me-2" />
                    Choose a Subscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4">
          <FaPaw className="me-2 text-primary" size={24} />
          Your Pets
        </h3>
        {pets.length === 0 ? (
          <p>You have no pets registered.</p>
        ) : (
          <ul className="list-group">
            {pets.map(pet => (
              <li
                key={pet._id}
                className="list-group-item d-flex align-items-center justify-content-between mb-2 shadow-sm border-0 hover-list-item"
                onClick={() => handlePetClick(pet)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center">
                  {pet.photo && (
                    <img
                      src={`${baseURL}uploads/${pet.photo}`} // Correct path to image
                      alt={pet.name}
                      className="me-3 rounded-circle"
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                    />
                  )}
                  <span className="fs-5">{pet.name}</span>
                </div>
                <button
                  className="btn btn-outline-danger"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from triggering on parent <li>
                    deletePet(pet._id);
                  }}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
