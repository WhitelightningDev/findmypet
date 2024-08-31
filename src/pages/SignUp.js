import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Checkbox, FormControlLabel, Card, Container, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Pets as PetsIcon, Home as HomeIcon, Email as EmailIcon, Lock as LockIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const GreenCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.secondary,
  '&.Mui-checked': {
    color: 'green',
  },
}));

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

      if (response.status === 201) { // Use 201 for successful creation
        toast.success('Registration successful! Please check your email for a confirmation message.');
        navigate('/login', { state: { fromSignup: true } }); // Pass state
      } else {
        toast.error('Registration failed: ' + response.data.error);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'An error occurred';
      toast.error('Registration failed: ' + errorMessage);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-4 mb-4">
      <Card sx={{ padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: <PetsIcon />
            }}
            required
          />
          <TextField
            label="Surname"
            fullWidth
            margin="normal"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            InputProps={{
              startAdornment: <PetsIcon />
            }}
            required
          />
          <TextField
            label="Street Name"
            fullWidth
            margin="normal"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            InputProps={{
              startAdornment: <HomeIcon />
            }}
            required
          />
          <TextField
            label="Street Number"
            fullWidth
            margin="normal"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            InputProps={{
              startAdornment: <HomeIcon />
            }}
            required
          />
          <TextField
            label="Suburb"
            fullWidth
            margin="normal"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
            InputProps={{
              startAdornment: <HomeIcon />
            }}
            required
          />
          <TextField
            label="Country"
            fullWidth
            margin="normal"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            InputProps={{
              startAdornment: <HomeIcon />
            }}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="province-label">Province</InputLabel>
            <Select
              labelId="province-label"
              id="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              label="Province"
              required
            >
              <MenuItem value="">
                <em>Select Province</em>
              </MenuItem>
              {provinces.map((prov, index) => (
                <MenuItem key={index} value={prov}>{prov}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon />
            }}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockIcon />
            }}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: <LockIcon />
            }}
            required
          />
          <FormControlLabel
            control={<GreenCheckbox checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required />}
            label={<Typography><CheckCircleIcon /> I agree to the <Link to="/terms-of-use">terms of use</Link></Typography>}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
            Sign Up
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 3 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
        <Button component={Link} to="/" variant="outlined" fullWidth sx={{ mt: 2 }}>
          Back Home
        </Button>
      </Card>
      <ToastContainer />
    </Container>
  );
};

export default SignUp;
