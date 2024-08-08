import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Info from '../assets/undraw_personal_info_re_ur1n.svg';

const Home = () => (
  <div className="container mt-5">
    {/* Hero Section */}
    <div className="row justify-content-center text-center">
      <div className="col-lg-8 col-md-10">
        <h1 className="display-4">Welcome to Find My Pet!</h1>
        <p className="lead mt-3">
          Our platform helps you register your pets, generate QR codes for their collars, and subscribe to our services to ensure your furry friends are always protected.
        </p>
      </div>
    </div>

    {/* Carousel Section */}
    <div className="row mt-5">
      <div className="col-md-12">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-caption d-md-block">
                <h5>Easy Pet Registration</h5>
                <p>Register your pets with just a few clicks.</p>
              </div>
              <img src={Info} className="d-block w-100" alt="Pet Registration" />
            </div>
            <div className="carousel-item">
              <div className="carousel-caption d-md-block">
                <h5>QR Code Generation</h5>
                <p>Generate QR codes for quick identification.</p>
              </div>
              <img src="https://via.placeholder.com/1200x500?text=QR+Codes" className="d-block w-100" alt="QR Codes" />
            </div>
            <div className="carousel-item">
              <div className="carousel-caption d-md-block">
                <h5>Subscription Plans</h5>
                <p>Choose the best plan for your pet's safety.</p>
              </div>
              <img src="https://via.placeholder.com/1200x500?text=Subscription+Plans" className="d-block w-100" alt="Subscription Plans" />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </a>
        </div>
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
        <p className="mt-3">
          Subscribing to our service is simple:
        </p>
        <ol className="text-left mt-3 mx-auto" style={{ maxWidth: '600px' }}>
          <li>Sign up on our platform and create your account.</li>
          <li>Register your pets with detailed information.</li>
          <li>Choose a subscription plan that fits your needs.</li>
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

export default Home;
