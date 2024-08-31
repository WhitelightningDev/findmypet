import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Grid, Typography, Divider } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCodeIcon from '@mui/icons-material/QrCode';
import Info from '../assets/istockphoto-471388365-612x612-removebg-preview.png';



const Home = ({ isAuthenticated, isSignedUp }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && isSignedUp) {
      navigate('/home');
    }
  }, [isAuthenticated, isSignedUp, navigate]);

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ py: 5, textAlign: 'center' }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom color="primary">
              Welcome to Found your pet
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Found Your Pet is a platform dedicated to reuniting lost pets with their owners. By incorporating a QR code into a pet's collar, the platform facilitates the process of returning a lost pet to its rightful owner. The QR code contains all pertinent information needed to identify the pet, including contact details for the owner such as phone number and email address, as well as a brief description of the pet. This ensures a seamless and efficient way for those who find the pet to get in touch with the owner and facilitate a safe return.
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ mr: 2 }}
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button variant="outlined" size="large">
                Learn More
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={Info}
              className="d-block mx-lg-auto img-fluid rounded-3"
              alt="Pet Registration"
              width="700"
              height="500"
              loading="lazy"
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 5 }} />
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} textAlign="center">
            <PetsIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
              Add your pet
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Sign up, provide your pet’s details, and choose your tag. Your dashboard will serve as the central hub for managing all your pets and their information.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <CreditCardIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
              Subscribe
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Once you have signed up and completed your subscription through our secure payment gateway, you will be ready to receive your custom QR code.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <QrCodeIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
              QR Code
            </Typography>
            <Typography variant="body2" color="textSecondary">
              After verification, we will send you the QR code associated with the selected tag that you chose when adding your pet.
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 5 }} />
      </Box>

      {/* Featurettes */}
      <Box sx={{ py: 5 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h3">
              Enhanced Pet Safety
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              The QR code facilitates the quick identification of your pet by individuals who find them. By scanning the QR code with their phone, they can view your pet’s details as well as your contact information, allowing them to reach out to you once the pet has been found.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <lord-icon
              src="https://cdn.lordicon.com/senvigdu.json"
              trigger="hover"
              colors="primary:#1663c7,secondary:#121331"
              style={{ width: '250px', height: '250px' }}
            ></lord-icon>
          </Grid>
        </Grid>
        <Divider sx={{ my: 5 }} />
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
            <lord-icon
              src="https://cdn.lordicon.com/cwqthjzg.json"
              trigger="hover"
              colors="primary:#1663c7,secondary:#121331"
              style={{ width: '250px', height: '250px' }}
            ></lord-icon>
          </Grid>
          <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
            <Typography variant="h4" component="h3">
              Convenient Pet Management
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Found your pet offers a centralized platform where you can manage all your pet's important details in one place. From vaccination records to identifying features, all this can be integrated into one QR code that can be placed on your pet.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
