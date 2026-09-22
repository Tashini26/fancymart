import React, { useContext, useState } from 'react';
import { Card, Typography, Box, IconButton, Button } from '@mui/material';
import { ShoppingCartOutlined as ShoppingCartIcon } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product, onBuyNow }) => {
  const { addToCart } = useContext(CartContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <Box sx={{ display: 'contents' }}>
      {/*
       * Card is ALWAYS 273×310 — fixed spec dimensions on ALL screen sizes.
       * Centering is handled by the parent grid/flex container, not here.
       */}
      <Card
        elevation={0}
        onClick={handleCardClick}
        sx={{
          width: 273,           
          height: 310,          
          position: 'relative',
          bgcolor: '#f5f5f5',
          borderRadius: '10px',
          overflow: 'hidden',
          opacity: 1,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          flexShrink: 0,        // never let flex compress the card
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            '& .buy-button': {
              opacity: 1,
              transform: 'scale(1)',
            },
            '& .buy-now-bar': {
              transform: 'translateY(0)',
            },
          },
        }}
      >
        {/* Out of Stock or Low Stock Label */}
        {product.stock === 0 ? (
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              bgcolor: '#d32f2f',
              color: 'white',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: '11px',
              fontWeight: 'bold',
              zIndex: 1,
              textTransform: 'uppercase'
            }}
          >
            Out of Stock
          </Box>
        ) : null}

        {/* Product Image */}
        <Box
          component="img"
          src={product.image}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 13,
            left: 54,         // centered: (273 - 165) / 2 = 54
            width: 165,
            height: 191,
            objectFit: 'contain',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Floating Add to Cart — appears on hover */}
        <IconButton
          className="buy-button"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          sx={{
            position: 'absolute',
            top: 179,
            right: 13,
            width: 30,
            height: 30,
            padding: 0,
            bgcolor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            opacity: { xs: 1, md: 0 },
            transform: { xs: 'scale(1)', md: 'scale(0.8)' },
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'white',
              transform: 'scale(1.1) !important',
              boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            },
          }}
        >
          <ShoppingCartIcon sx={{ color: '#333', fontSize: 18 }} />
        </IconButton>

        {/* Product Category */}
        <Typography
          sx={{
            position: 'absolute',
            top: 198,
            left: 14,
            color: '#888',
            fontSize: '11px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}
        >
          {product.category || 'Category'}
        </Typography>

        {/* Product Name */}
        <Typography
          sx={{
            position: 'absolute',
            top: 215,
            left: 14,
            width: 217,
            height: 36,
            color: '#333',
            fontWeight: 'bold',
            lineHeight: 1.2,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '15px',
          }}
        >
          {product.name}
        </Typography>

        {/* Price */}
        {product.discountPrice ? (
          <>
            <Typography
              sx={{
                position: 'absolute',
                top: 252,
                left: 14,
                width: 112,
                height: 20,
                color: '#111',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
            >
              Rs {product.discountPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                top: 252,
                left: 130,
                width: 81,
                height: 20,
                color: '#888',
                textDecoration: 'line-through',
                fontSize: '14px',
              }}
            >
              Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>
          </>
        ) : (
          <Typography
            sx={{
              position: 'absolute',
              top: 252,
              left: 14,
              width: 112,
              height: 20,
              color: '#111',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </Typography>
        )}

        {/* Slide-up Buy Now bar on hover (or default on mobile) */}
        <Button
          className="buy-now-bar"
          variant="contained"
          color="primary"
          disabled={product.stock === 0}
          onClick={(e) => {
            e.stopPropagation();
            onBuyNow(product);
          }}
          sx={{
            display: { xs: 'none', md: 'inline-flex' },
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '38px',
            borderRadius: 0,
            transform: 'translateY(100%)',
            transition: 'transform 0.3s ease',
            fontWeight: 'bold',
          }}
        >
          Buy Now
        </Button>
      </Card>

      <ProductDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        product={product}
      />
    </Box>
  );
};

export default ProductCard;
