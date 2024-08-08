// pages/Landing.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8 col-md-10">
          <h1 className="display-4">Welcome to Find My Pet!</h1>
          <p className="lead mt-3">
            Discover our platform where you can register your pets, generate QR codes, and explore our subscription services.
          </p>
          <div className="mt-4">
            <a href="/signup" className="btn btn-primary me-2">Sign Up</a>
            <a href="/login" className="btn btn-secondary">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
