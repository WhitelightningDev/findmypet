import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PetProfile = ({ petId }) => {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/';

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}api/pets/${petId}`);
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
          <h5 className="card-title">Pet Profile</h5>
          <p className="card-text">Name: {pet.name}</p>
          <p className="card-text">Breed: {pet.breed}</p>
          <p className="card-text">Age: {pet.age}</p>
          <p className="card-text">Type: {pet.type}</p>
          <p className="card-text">Tag Type: {pet.tagType}</p>
          {pet.photo && (
            <img
              src={`https://findmypet-df0a76e6b00e.herokuapp.com/uploads/${pet.photo}`}
              alt={pet.name}
              className="img-fluid"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
