import React, { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Divider, TextField } from '@mui/material';

const Checkout = () => {
  const location = useLocation();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const price = product.discountPrice || product.price;
  const total = price * quantity;

  const handleOrder = (e) => {
    e.preventDefault();
    alert('Order placed successfully! Thank you for shopping with FancyMart.');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>


      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ p: 4, maxWidth: 500, width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1a2b4c', mb: 3 }}>
            Order Summary
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Rs {price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>Qty:</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: '32px', height: '32px', p: 0, borderRadius: '8px', color: '#6b32a8', borderColor: '#d3c2e6' }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >-</Button>
                <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{ minWidth: '32px', height: '32px', p: 0, borderRadius: '8px', color: '#6b32a8', borderColor: '#d3c2e6' }}
                  onClick={() => setQuantity(quantity + 1)}
                >+</Button>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Subtotal</Typography>
            <Typography>Rs {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Typography variant="h6" fontWeight="bold">Total</Typography>
            <Typography variant="h6" fontWeight="bold">
              Rs {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleOrder}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 'bold',
              bgcolor: '#6b32a8',
              '&:hover': {
                bgcolor: '#552885'
              }
            }}
          >
            Proceed to Checkout
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Checkout;
