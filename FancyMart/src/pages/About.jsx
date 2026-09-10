import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }} className="animate-fade-in">
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
        About Us
      </Typography>
      
      <Paper elevation={2} sx={{ p: { xs: 3, md: 5 }, mt: 4 }}>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          Welcome to FancyMart! We are dedicated to providing you with the best shopping experience.
          Our team carefully selects every product to ensure it meets our high standards of quality and style.
        </Typography>
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          Founded with a passion for excellence, FancyMart aims to bridge the gap between luxury and accessibility.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
