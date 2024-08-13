/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaHome, FaEnvelope, FaLock, FaCheckCircle } from 'react-icons/fa';

const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape'
];

const SignUp = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [suburb, setSuburb] = useState('');
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'https://findmypet-df0a76e6b00e.herokuapp.com/'; // Base URL of your Heroku server

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!termsAccepted) {
      toast.error('You must accept the terms of use');
      return;
    }

    try {
      const response = await axios.post(`${baseURL}api/auth/register`, {
        name,
        surname,
        street,
        number,
        suburb,
        country,
        province,
        email,
        password
      });

      // Check if the response is successful
      if (response.status === 201) { // Use 201 for successful creation
        toast.success('Registration successful! Please check your email for a confirmation message.');
        navigate('/login'); // Redirect to the login page or another page
      } else {
        toast.error('Registration failed: ' + response.data.error);
      }
    } catch (error) {
      // Improved error handling
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error('Registration failed: ' + errorMessage);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 mt-4 mb-4">
      <div className="col-12 col-md-8 col-lg-10">
        <div>
          <h2 className="text-center mb-4">Please fill in all your information below</h2>
        </div>
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <FaUser /> Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                <FaUser /> Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                <FaHome /> Street Name
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                <FaHome /> Street Number
              </label>
              <input
                type="text"
                className="form-control"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="suburb" className="form-label">
                <FaHome /> Suburb
              </label>
              <input
                type="text"
                className="form-control"
                id="suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                <FaHome /> Country
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                <FaHome /> Province
              </label>
              <select
                className="form-select"
                id="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              >
                <option value="">Select Province</option>
                {provinces.map((prov, index) => (
                  <option key={index} value={prov}>{prov}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <FaEnvelope /> Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                <FaLock /> Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                <FaLock /> Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label className="form-check-label" htmlFor="terms">
                <FaCheckCircle /> I agree to the <Link to="/terms-of-use">terms of use</Link>
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <div className="text-center mt-3">
            <p className="mb-1">Already have an account? <Link to="/login">Login</Link></p>
            <Link to="/" className="btn btn-secondary mt-3">Back Home</Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
