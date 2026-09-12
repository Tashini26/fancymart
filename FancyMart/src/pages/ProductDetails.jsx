import React, { useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Divider, Rating, Chip } from '@mui/material';
import { ShoppingCartOutlined, FlashOn } from '@mui/icons-material';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const price = product.discountPrice || product.price;

  const handleBuyNow = () => {
    navigate('/checkout', { state: { product } });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={6} sx={{ flexWrap: 'nowrap', flexDirection: 'row' }}>
        {/* Product Image Section */}
        <Grid item xs={6} md={6}>
          <Box
            sx={{
              width: '100%',
              height: { xs: 400, md: 600 },
              bgcolor: '#f5f5f5',
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
            />
          </Box>
        </Grid>

        {/* Product Info Section */}
        <Grid item xs={6} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <Box sx={{ mb: 1 }}>
              <Chip label={product.category} color="primary" variant="outlined" size="small" sx={{ mr: 1, fontWeight: 'bold' }} />
              <Chip label={product.company} color="default" size="small" sx={{ fontWeight: 'bold' }} />
            </Box>

            <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 2, color: '#1a2b4c' }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Rating value={product.rating} precision={0.1} readOnly size="large" sx={{ color: '#faaf00' }} />
              <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary', fontWeight: 'bold' }}>
                ({product.rating})
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 4 }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#1a2b4c', mr: 2 }}>
                Rs {price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
              {product.discountPrice && (
                <Typography variant="h6" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                  Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              )}
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
              Experience the best with {product.name}. This premium product from {product.company} is crafted to deliver exceptional results and elevate your daily routine. Designed with quality and excellence in mind, it is the perfect addition to your lifestyle.
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
              <Button 
                variant="contained" 
                size="large"
                startIcon={<FlashOn />}
                onClick={handleBuyNow}
                sx={{ 
                  flex: 1, 
                  py: 2, 
                  borderRadius: 3, 
                  fontSize: '1.1rem', 
                  fontWeight: 'bold',
                  bgcolor: '#6b32a8',
                  '&:hover': {
                    bgcolor: '#552885'
                  }
                }}
              >
                Buy Now
              </Button>
            </Box>

            {/* Delivery & Return Info */}
            <Box sx={{ mt: 5, p: 3, bgcolor: '#f8f9fa', borderRadius: 3 }}>
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                🚚 Free Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter your postal code for Delivery Availability
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                ↩️ Return Delivery
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Free 30 Days Delivery Returns. Details
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
