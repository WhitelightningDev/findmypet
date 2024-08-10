import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetProfile = () => {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const { petId } = useParams(); // Get the pet ID from the URL params
  const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!petId) {
        setError('Pet ID is missing');
        return;
      }
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}api/pet/${petId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPet(response.data);
      } catch (err) {
        console.error('Failed to fetch pet details:', err.message);
        setError('Failed to fetch pet details');
      }
    };

    fetchPetDetails();
  }, [petId]);

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{pet.name}</h5>
          <p className="card-text">Breed: {pet.breed}</p>
          <p className="card-text">Age: {pet.age}</p>
          <p className="card-text">Type: {pet.type}</p>
          <p className="card-text">Tag Type: {pet.tagType}</p>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
