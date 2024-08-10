import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlaceholderImage from '../assets/pets.png'; // Import your placeholder image

const PetProfile = () => {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { id: petId } = useParams(); // Get the pet ID from the URL params, assuming route is /pet/:id
  const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}api/pet/${petId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPet(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch pet details');
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetails();
  }, [petId]);

  const handleImageError = (e) => {
    e.target.src = PlaceholderImage; // Use the placeholder image if the original image fails to load
    e.target.alt = 'Image not available'; // Default alt text
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{pet.name}</h2>
          <p className="card-text"><strong>Breed:</strong> {pet.breed}</p>
          <p className="card-text"><strong>Age:</strong> {pet.age} years</p>
          <p className="card-text"><strong>Type:</strong> {pet.type}</p>
          <p className="card-text"><strong>Tag Type:</strong> {pet.tagType}</p>
          <div className="text-center">
            {pet.photo ? (
              <img
                src={`${baseURL}uploads/${pet.photo}`}
                alt={pet.name}
                onError={handleImageError}
                className="img-fluid"
              />
            ) : (
              <img
                src={PlaceholderImage} // Display the placeholder image if no photo exists
                alt={pet.name}
                className="img-fluid"
              />
            )}
          </div>
          <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
