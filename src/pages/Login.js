import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/undraw_my_password_re_ydq7.svg';
import { Container, Box, Card, Typography, TextField, Button, Link as MuiLink, Alert } from '@mui/material';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src={backgroundImage}
        alt="Background"
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '20%',
          maxWidth: '150px',
          zIndex: -1,
          '@media (max-width: 768px)': {
            width: '40%',
            bottom: '5%',
            right: '5%',
          },
          '@media (max-width: 576px)': {
            width: '50%',
            bottom: '5%',
            right: '5%',
          },
        }}
      />
      <Card
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <MuiLink component={Link} to="/signup">
            Register
          </MuiLink>
        </Typography>
        <Typography align="center" sx={{ mt: 1 }}>
          Forgot password?{' '}
          <MuiLink component={Link} to="/forgot-password">
            Reset password
          </MuiLink>
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        >
          Back Home
        </Button>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default Login;
