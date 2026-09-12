import React, { useContext } from 'react';
import { Box, Typography, Button, IconButton, Container, Grid, Card, CardContent, Divider } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button component={Link} to="/products" variant="contained" color="primary" sx={{ mt: 2 }}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 2 }}>
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{ width: 100, height: 100, objectFit: 'contain', mr: 2 }}
              />
              <CardContent sx={{ flex: 1, p: '0 !important' }}>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Rs {(item.discountPrice || item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <IconButton onClick={() => updateQuantity(item.id, -1)} size="small" disabled={item.quantity <= 1}>
                    <Remove fontSize="small" />
                  </IconButton>
                  <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(item.id, 1)} size="small">
                    <Add fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Rs {((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
                <IconButton onClick={() => removeFromCart(item.id)} color="error" sx={{ mt: 1 }}>
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Subtotal</Typography>
              <Typography>Rs {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography>Shipping</Typography>
              <Typography color="success.main">Free</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold">
                Rs {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" fullWidth size="large">
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
