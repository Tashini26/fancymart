import React, { useContext } from 'react';
import { Card, Typography, Box, IconButton, Button } from '@mui/material';
import { ShoppingCartOutlined as ShoppingCartIcon } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onBuyNow }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <Card 
      elevation={0} 
      onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
      sx={{ 
        width: 273,
        height: 310,
        position: 'relative',
        bgcolor: '#f5f5f5', // Light gray background matching the screenshot
        borderRadius: 2,
        overflow: 'hidden', // Required for the slide-up button to hide when not hovered
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          '& .buy-button': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '& .buy-now-bar': {
            transform: 'translateY(0)',
          }
        }
      }}
    >
      {/* Product Image */}
      <Box
        component="img"
        src={product.image}
        alt={product.name}
        sx={{
          position: 'absolute',
          top: 50,
          left: 31,
          width: 213,
          height: 120,
          objectFit: 'contain',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Floating Add to Cart Button */}
      <IconButton 
        className="buy-button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        sx={{
          position: 'absolute',
          top: 150, 
          right: 20,
          bgcolor: 'white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          opacity: 0,
          transform: 'scale(0.8)',
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'white',
            transform: 'scale(1.1) !important', // slight pop when hovering the button itself
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          }
        }}
      >
        <ShoppingCartIcon sx={{ color: '#333' }} />
      </IconButton>

      {/* Product Name Box */}
      <Typography 
        sx={{ 
          position: 'absolute',
          top: 214,
          left: 14,
          width: 217,
          height: 40,
          color: '#333',
          fontWeight: 'bold',
          lineHeight: 1.2,
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden',
          fontSize: '15px'
        }}
      >
        {product.name}
      </Typography>

      {/* Original Price / Discount Box */}
      {product.discountPrice ? (
        <>
          <Typography 
            sx={{ 
              position: 'absolute',
              top: 269,
              left: 14,
              width: 112,
              height: 20,
              color: '#111',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Rs {product.discountPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Typography>
          <Typography 
            sx={{ 
              position: 'absolute',
              top: 269,
              left: 130, // Positioned where the discount element was specified
              width: 81,
              height: 20,
              color: '#888',
              textDecoration: 'line-through',
              fontSize: '14px'
            }}
          >
            Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Typography>
        </>
      ) : (
        <Typography 
          sx={{ 
            position: 'absolute',
            top: 269,
            left: 14,
            width: 112,
            height: 20,
            color: '#111',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Typography>
      )}

      {/* Slide-up Buy Now Button (Bottom Bar) */}
      <Button
        className="buy-now-bar"
        variant="contained"
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          navigate('/checkout', { state: { product } });
        }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '40px',
          borderRadius: 0, // Flat bottom to match the card edges
          transform: 'translateY(100%)',
          transition: 'transform 0.3s ease',
          fontWeight: 'bold'
        }}
      >
        Buy Now
      </Button>
    </Card>
  );
};

export default ProductCard;
