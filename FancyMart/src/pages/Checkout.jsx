import React, { useState } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Card, CardContent, Divider, TextField, IconButton, Modal } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Checkout = ({ product: propProduct, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = propProduct || location.state?.product;

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

  const handleClose = () => {
    if (onClose) onClose();
    else navigate(-1);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        width: '100%',
        maxWidth: 500,
        p: { xs: 2, sm: 0 }
      }}>
        <Card sx={{ p: { xs: 2.5, sm: 4 }, width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderRadius: 4, position: 'relative' }}>
          <IconButton 
            onClick={handleClose} 
            sx={{ position: 'absolute', top: { xs: 12, sm: 16 }, right: { xs: 12, sm: 16 }, color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#1a2b4c', mb: { xs: 1.5, sm: 3 }, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
            Order Summary
          </Typography>
          <Divider sx={{ mb: { xs: 1.5, sm: 3 } }} />

          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1.5, sm: 3 } }}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{ width: { xs: 64, sm: 80 }, height: { xs: 64, sm: 80 }, objectFit: 'contain', mr: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 0.5, sm: 1 } }}>
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

          <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 1, sm: 2 } }}>
            <Typography>Subtotal</Typography>
            <Typography>Rs {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 1, sm: 2 } }}>
            <Typography>Shipping</Typography>
            <Typography>Free</Typography>
          </Box>
          <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: { xs: 2.5, sm: 4 } }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>Total</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Rs {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleOrder}
            sx={{
              py: { xs: 1, sm: 1.5 },
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
    </Modal>
  );
};

export default Checkout;
