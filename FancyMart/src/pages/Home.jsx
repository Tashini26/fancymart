import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';

const Home = () => {
  return (
    <Box className="animate-fade-in">
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText', 
          py: { xs: 8, md: 12 }, 
          borderRadius: { xs: 0, md: '0 0 32px 32px' },
          mb: 8,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                Welcome to FancyMart
              </Typography>
              <Typography variant="h5" sx={{ opacity: 0.9, mb: 4, maxWidth: '600px' }}>
                Discover premium products with unmatched quality and style. Your ultimate shopping destination.
              </Typography>
              <Button 
                component={RouterLink} 
                to="/products" 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ py: 1.5, px: 4, fontSize: '1.1rem' }}
              >
                Shop Now
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Featured Categories
        </Typography>
        
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card elevation={2} sx={{ height: '100%', textAlign: 'center', p: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <CardContent>
                  <Avatar 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      bgcolor: 'background.default', 
                      color: 'primary.main', 
                      fontSize: '2rem', 
                      fontWeight: 'bold',
                      margin: '0 auto',
                      mb: 2
                    }}
                  >
                    {item}
                  </Avatar>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    Category {item}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Explore our latest collection of premium items carefully curated just for you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
