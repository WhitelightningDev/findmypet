import React from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://findmypet-df0a76e6b00e.herokuapp.com/api/pets';

const fetchPetDetails = async (petId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${petId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch pet details:', error);
    throw error;
  }
};

// Usage in a component
const PetProfile = ({ petId }) => {
  const [petDetails, setPetDetails] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const getPetDetails = async () => {
      try {
        const data = await fetchPetDetails(petId);
        setPetDetails(data);
      } catch (error) {
        setError('Failed to fetch pet details');
      }
    };

    if (petId) {
      getPetDetails();
    }
  }, [petId]);

  if (error) return <div>{error}</div>;
  if (!petDetails) return <div>Loading...</div>;

  return (
    <div>
      <h1>{petDetails.name}</h1>
      <p>Breed: {petDetails.breed}</p>
      <p>Age: {petDetails.age}</p>
      <p>Type: {petDetails.type}</p>
      <p>Tag Type: {petDetails.tagType}</p>
      {petDetails.photo && (
        <img
          src={`https://findmypet-df0a76e6b00e.herokuapp.com/uploads/${petDetails.photo}`}
          alt={petDetails.name}
        />
      )}
    </div>
  );
};

export default PetProfile;
