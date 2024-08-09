import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaSpinner, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import Tagone from '../assets/dogtag1-removebg-preview.png';
import Tagtwo from '../assets/dogtag2-removebg-preview.png';
import PlaceholderImage from '../assets/pets.png'; // Import your placeholder image

const AddPet = () => {
  const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', photo: null, type: '', tagType: '' });
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/';

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseURL}api/pet`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPets(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch pets');
      }
    };

    fetchPets();
  }, []);

  const handleAddPet = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', newPet.name);
      formData.append('breed', newPet.breed);
      formData.append('age', newPet.age);
      formData.append('type', newPet.type);
      formData.append('tagType', newPet.tagType);

      // Add the placeholder image if no photo is provided
      if (newPet.photo) {
        formData.append('photo', newPet.photo);
      } else {
        const placeholderBlob = await fetch(PlaceholderImage).then(r => r.blob());
        formData.append('photo', placeholderBlob, 'placeholder.png');
      }

      await axios.post(`${baseURL}api/pet/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setNewPet({ name: '', breed: '', age: '', photo: null, type: '', tagType: '' });
      setSuccess('Pet added successfully!');
      setError('');

      const response = await axios.get(`${baseURL}api/pet`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPets(response.data);
    } catch (err) {
      setError('Failed to add new pet');
      setSuccess('');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = PlaceholderImage; // Use the placeholder image if the original image fails to load
    e.target.alt = 'Image not available'; // Default alt text
  };

  const deletePet = async (petId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseURL}api/pet/${petId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPets(pets.filter(pet => pet._id !== petId));
      setSuccess('Pet deleted successfully!');
    } catch (err) {
      setError('Failed to delete pet');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Pet</h2>

      {error && (
        <div className="alert alert-danger d-flex align-items-center">
          <FaExclamationTriangle className="me-2" />
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success d-flex align-items-center">
          <FaCheckCircle className="me-2" />
          {success}
        </div>
      )}
      {loading && (
        <div className="text-center">
          <FaSpinner className="spinner-border text-primary" role="status" />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={newPet.name}
                onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Breed"
                value={newPet.breed}
                onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                value={newPet.age}
                onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                value={newPet.type}
                onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
              >
                <option value="">Select Pet Type</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="horse">Horse</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Choose a Tag:</label>
              <div className="d-flex justify-content-between">
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tagType"
                    value="tag1"
                    id="tag1"
                    checked={newPet.tagType === 'tag1'}
                    onChange={(e) => setNewPet({ ...newPet, tagType: e.target.value })}
                  />
                  <label className="form-check-label d-flex flex-column align-items-center" htmlFor="tag1">
                    <img
                      src={Tagone}
                      alt="Tag 1"
                      className="img-thumbnail mb-2"
                      style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
                    />
                    Tag 1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tagType"
                    value="tag2"
                    id="tag2"
                    checked={newPet.tagType === 'tag2'}
                    onChange={(e) => setNewPet({ ...newPet, tagType: e.target.value })}
                  />
                  <label className="form-check-label d-flex flex-column align-items-center" htmlFor="tag2">
                    <img
                      src={Tagtwo}
                      alt="Tag 2"
                      className="img-thumbnail mb-2"
                      style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
                    />
                    Tag 2
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                onChange={(e) => setNewPet({ ...newPet, photo: e.target.files[0] })}
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAddPet}>Add Pet</button>
          </form>
        </div>
      </div>

      <div className="mb-4">
        <h3>Your Pets</h3>
        {pets.length === 0 ? (
          <p>You have no pets registered.</p>
        ) : (
          <div className="row">
            {pets.map(pet => (
              <div key={pet._id} className="col-lg-4 col-md-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">Breed: {pet.breed}</p>
                    <p className="card-text">Age: {pet.age} years</p>
                    <p className="card-text">Type: {pet.type}</p>
                    <p className="card-text">Tag: {pet.tagType}</p>
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
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => deletePet(pet._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPet;
