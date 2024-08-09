import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from '../assets/Running-Off-Leash-the-Right-Way_-Etiquette-for-the-Dog-Park.jpg';

const Home = ({ isAuthenticated, isSignedUp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (isSignedUp) {
        navigate('/home');
      }
    }
  }, [isAuthenticated, isSignedUp, navigate]);

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to Find My Pet!</h1>
          <p className="lead mt-3">
            Our platform helps you register your pets, generate QR codes for their collars, and subscribe to our services to ensure your furry friends are always protected.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2 fw-bold">Get Started</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Learn More</button>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img className="rounded-lg-3" src={Info} alt="Pet Registration" width="720" />
        </div>
      </div>



      {/* Features Section */}
      <div className="row mt-5 text-center">
        <div className="col-md-4">
          <i className="fas fa-dog fa-4x mb-3 text-primary"></i>
          <h3>Register Your Pets</h3>
          <p>Easy and quick registration for your pets with detailed profiles.</p>
        </div>
        <div className="col-md-4">
          <i className="fas fa-qrcode fa-4x mb-3 text-success"></i>
          <h3>Generate QR Codes</h3>
          <p>Generate and print QR codes for your pet's collar to help identify them quickly.</p>
        </div>
        <div className="col-md-4">
          <i className="fas fa-cogs fa-4x mb-3 text-warning"></i>
          <h3>Subscribe to Services</h3>
          <p>Choose from various subscription plans to keep your pets safe and secure.</p>
        </div>
      </div>

      {/* How to Subscribe Section */}
      <div className="row mt-5">
        <div className="col-md-10 mx-auto text-center">
          <h2>3 simple steps to get going</h2>
          <p className="mt-3">Subscribing to our service is simple:</p>
          <ol className="text-left mt-3 mx-auto" style={{ maxWidth: '600px' }}>
            <li>Sign up on our platform and create your account.</li>
            <li>Register your pets with detailed information.</li>
            <li>Select the subsctription, pay and recive your chosen tag within 3 - 5 business days.</li>
          </ol>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="row mt-5 mb-5">
        <div className="col-md-10 mx-auto text-center">
          <h2>Benefits of Signing Up</h2>
          <p className="mt-3">
            When you sign up, you can generate a QR code for each of your pets. If your pet goes missing, anyone who finds them can scan the QR code, view your contact information, and quickly reach out to return your beloved pet safely.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
