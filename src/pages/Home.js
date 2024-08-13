/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCreditCard, faQrcode } from '@fortawesome/free-solid-svg-icons';
import Info from '../assets/istockphoto-471388365-612x612-removebg-preview.png';
import PetSafety from '../assets/wired-outline-1193-pets.svg';

const Home = ({ isAuthenticated, isSignedUp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isSignedUp) {
      navigate('/home');
    }
  }, [isAuthenticated, isSignedUp, navigate]);

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <section className="px-4 py-5 my-5 text-center">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold mb-3 text-primary">Welcome to Found your pet</h1>
            <p className="lead mb-4">
            Found Your Pet is a platform dedicated to reuniting lost pets with their owners. By incorporating a QR code into a pet's collar, the platform facilitates the process of returning a lost pet to its rightful owner. The QR code contains all pertinent information needed to identify the pet, including contact details for the owner such as phone number and email address, as well as a brief description of the pet. This ensures a seamless and efficient way for those who find the pet to get in touch with the owner and facilitate a safe return.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </button>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">
                Learn More
              </button>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src={Info}
              className="d-block mx-lg-auto img-fluid rounded-3"
              alt="Pet Registration"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
        <hr></hr>
      </section>

      <div className="container marketing">
        {/* Three columns of text below the carousel */}
        <div className="row">
          <div className="col-lg-4 text-center">
            <FontAwesomeIcon icon={faDog} className="mb-3" size="4x" color="#6c757d" />
            <h2 className="fw-normal">Add your pet</h2>
            <p>Sign up, provide your pet’s details, and choose your tag. Your dashboard will serve as the central hub for managing all your pets and their information.</p>
          </div>
          <div className="col-lg-4 text-center">
            <FontAwesomeIcon icon={faCreditCard} className="mb-3" size="4x" color="#6c757d" />
            <h2 className="fw-normal">Subscribe</h2>
            <p>Once you have signed up and completed your subscription through our secure payment gateway, you will be ready to receive your custom QR code.</p>
          </div>
          <div className="col-lg-4 text-center">
            <FontAwesomeIcon icon={faQrcode} className="mb-3" size="4x" color="#6c757d" />
            <h2 className="fw-normal">QR Code</h2>
            <p>Once your subscription is verified, you will receive an email confirming the receipt of your purchase. After we have received this confirmation, we will send you the QR code associated with the selected tag that you chose when adding your pet.</p>
          </div>
        </div>

        {/* START THE FEATURETTES */}
        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-6">
            <h2 className="featurette-heading fw-normal lh-1">
              Enhanced Pet Safety
            </h2>
            <p className="lead  ">The QR code facilitates the quick identification of your pet by individuals who find them. By scanning the QR code with their phone, they can view your pet’s details as well as your contact information, allowing them to reach out to you once the pet has been found.</p>
          </div>
          <div className="col-md-5">
            <lord-icon
              src="https://cdn.lordicon.com/senvigdu.json"
              trigger="hover"
              colors="primary:#1663c7,secondary:#121331"
              style={{ width: '250px', height: '250px' }}
            ></lord-icon>
          </div>
        </div>

        <hr className="featurette-divider" />

        <div className="row featurette mb-4">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              Convenient Pet Management
            </h2>
            <p className="lead">Found your pet offers a centralized platform where you can manage all your pet's important details in one place. From vaccination records to identifying features, all this can be integarted into one QR code that can be placed on your pet.</p>
          </div>
          <div className="col-md-5 order-md-1">
            <lord-icon
              src="https://cdn.lordicon.com/cwqthjzg.json"
              trigger="hover"
              colors="primary:#1663c7,secondary:#121331"
              style={{ width: '250px', height: '250px' }}>
            </lord-icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
