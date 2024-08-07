import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import backgroundImage from '../assets/undraw_my_password_re_ydq7.svg'; // Import your background image

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div className="container-fluid" style={{ position: 'relative', height: '100vh', padding: 0 }}>
      {/* Background Image */}
      <img 
        src={backgroundImage} 
        alt="Background" 
        style={{ 
          position: 'absolute',
          bottom: 281, 
          right: 215, 
          width: '30%', 
          height: 'auto', 
          zIndex: -1 
        }} 
      />
      
      <div className="row justify-content-center align-items-center" style={{ height: '100%' }}>
        <div className="col-md-6 col-lg-5">
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
    </div>
  );
};

export default Login;
