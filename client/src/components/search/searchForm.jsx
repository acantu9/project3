// SearchForm.jsx
import React, { useState } from 'react';
import '../../styles/searchForm.css';

const SearchForm = ({ onSearch }) => {
  const [petType, setPetType] = useState('');
  const [petSize, setPetSize] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petSpayNeuter, setPetSpayNeuter] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Construct API URL with selected options
    const apiUrl = `https://api.example.com/pets?petType=${petType}&petSize=${petSize}&petBreed=${petBreed}&petAge=${petAge}&petGender=${petGender}&petSpayNeuter=${petSpayNeuter}`;

    try {
      // Make API call
      const response = await fetch(apiUrl);
      const data = await response.json();

      // Pass the fetched data to the parent component (onSearch callback)
      onSearch(data);
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }

    // Reset the form after submission
    setPetType('');
    setPetSize('');
    setPetBreed('');
    setPetAge('');
    setPetGender('');
    setPetSpayNeuter('');
  };

  let availableBreeds = [];
  if (petType === 'dog') {
    availableBreeds = ['Labrador Retriever', 'Poodle', 'German Shepherd'];
  } else if (petType === 'cat') {
    availableBreeds = ['Domestic Shorthair', 'Maine Coon'];
  } else if (petType === 'rabbit') {
    availableBreeds = ['Rex Rabbit', 'American Fuzzy Lop', 'Havana'];
  } else if (petType === 'bird') {
    availableBreeds = ['Parrot', 'Canary', 'Cockatiels'];
  }

  return (
    <form onSubmit={handleFormSubmit} className="search-form">
      <label>
        Pet Type:
        <select className="form-select mb-3" value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select a pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="bird">Bird</option>
        </select>
      </label>

      <label>
        Pet Size:
        <select className="form-select mb-3" value={petSize} onChange={(e) => setPetSize(e.target.value)}>
          <option value="">Select a pet size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        Pet Breed:
        <select className="form-select mb-3" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}>
          <option value="">Select a pet breed</option>
          {availableBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </label>

      <label>
        Pet Age:
        <select className="form-select mb-3" value={petAge} onChange={(e) => setPetAge(e.target.value)}>
          <option value="">Select a pet age</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>

      <label>
        Pet Gender:
        <select className="form-select mb-3" value={petGender} onChange={(e) => setPetGender(e.target.value)}>
          <option value="">Select a pet gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Spay/Neutered Pet?:
        <select className="form-select mb-4" value={petSpayNeuter} onChange={(e) => setPetSpayNeuter(e.target.value)}>
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <button className="btn btn-primary btn-lg" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
