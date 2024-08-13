import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/undraw_my_password_re_ydq7.svg';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the state passed from navigate

  useEffect(() => {
    if (location.state?.fromSignup) {
      toast.success('A confirmation email has been sent to your inbox.');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://findmypet-df0a76e6b00e.herokuapp.com/api/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', padding: 0, position: 'relative' }}>
      <img 
        src={backgroundImage} 
        alt="Background" 
        className="background-image"
      />
      
      <div className="row justify-content-center align-items-center w-100" style={{ height: '100%' }}>
        <div className="col-10 col-sm-8 col-md-6 col-lg-5">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
            <div className="text-center mt-3">
              <p className="mb-1">Don't have an account? <Link to="/signup">Register</Link></p>
              <p className="mb-1">Forgot password? <Link to="/forgot-password">Reset password</Link></p>
              <Link to="/" className="btn btn-secondary mt-3">Back Home</Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <style jsx>{`
        .background-image {
          position: absolute;
          bottom: 10%;
          right: 10%;
          width: 20%;
          max-width: 150px;
          height: auto;
          z-index: -1;
        }
        
        @media (max-width: 768px) {
          .background-image {
            width: 40%;
            bottom: 5%;
            right: 5%;
          }
        }
        
        @media (max-width: 576px) {
          .background-image {
            width: 50%;
            bottom: 5%;
            right: 5%;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
