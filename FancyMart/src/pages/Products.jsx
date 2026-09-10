import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Products = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }} className="animate-fade-in">
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
        Products
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4}>
        Browse our exclusive collection.
      </Typography>
      
      <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: 'background.default', border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="h6" color="text.secondary">
          Product catalog coming soon.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Products;
