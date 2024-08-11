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
            <h1 className="display-4 fw-bold mb-3 text-primary">Welcome to Find My Pet!</h1>
            <p className="lead mb-4">
              "Find My Pet" is a platform designed to help pet owners efficiently manage and locate their pets. By allowing users to store detailed information, including images, breeds, and unique tags, it enhances the chances of quickly recovering lost pets.
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
            <p>Sign up add your pet details, your dashboard will be your cental hub for all your pets and their information</p>
          </div>
          <div className="col-lg-4 text-center">
            <FontAwesomeIcon icon={faCreditCard} className="mb-3" size="4x" color="#6c757d" />
            <h2 className="fw-normal">Subscribe</h2>
            <p>Once you have signed up, subscribe with our secure payment gateways and voila, you are ready to receive your custom QR code.</p>
          </div>
          <div className="col-lg-4 text-center">
            <FontAwesomeIcon icon={faQrcode} className="mb-3" size="4x" color="#6c757d" />
            <h2 className="fw-normal">QR Code</h2>
            <p>Once your subscription is verified either send us an email with the proof of payment, and we will send you your QR code with the relevant tag you have selected when creating your pet profile/s</p>
          </div>
        </div>

        {/* START THE FEATURETTES */}
        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-6">
            <h2 className="featurette-heading fw-normal lh-1">
              Enhanced Pet Safety
            </h2>
            <p className="lead">With detailed pet profiles, including images, breeds, and unique tags, "Find My Pet" significantly increases the chances of quickly locating lost pets. The platform provides peace of mind, knowing that your pet's information is easily accessible and shareable in case of emergencies.</p>
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

        <div className="row featurette">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">
              Convenient Pet Management
            </h2>
            <p className="lead">"Find My Pet" offers a centralized platform where users can manage all their pet's important details in one place. From vaccination records to identifying features, everything is organized, making it easier to keep track of your pet's needs.</p>
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

        <hr className="featurette-divider" />

        <div className="row featurette">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">
              Exclusive Features and Support
            </h2>
            <p className="lead">By joining "Find My Pet," users gain access to premium features such as QR code identification, secure payment options for additional services, and a supportive community of fellow pet owners. These tools and resources help ensure your pet's safety and well-being.</p>
          </div>
          <div className="col-md-5">
            <lord-icon
              src="https://cdn.lordicon.com/wzrwaorf.json"
              trigger="hover"
              colors="primary:#121331,secondary:#1663c7"
              style={{width:'250px',height:'250px'}}>
            </lord-icon>
          </div>
        </div>

        <hr className="featurette-divider" />
      </div>
    </div>
  );
};

export default Home;
