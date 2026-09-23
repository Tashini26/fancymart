import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  Typography,
  Button,
  Divider,
  Rating,
  IconButton,
} from '@mui/material';
import { FlashOn, Add, Remove, Close, ShoppingCartOutlined } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';

/* ─────────────────────────────────────────────────────────────────────────────
 *  ProductDetailModal
 *  A compact, fully-fluid modal — no horizontal scroll, high visibility.
 * ───────────────────────────────────────────────────────────────────────────── */
const ProductDetailModal = ({ open, onClose, product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const price = product.discountPrice || product.price;

  const handleBuyNow = (e) => {
    e.stopPropagation();
    onClose();
    navigate('/checkout', { state: { directBuyProduct: { ...product, quantity } } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity });
    onClose();
  };

  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleIncrement = () => setQuantity((q) => q + 1);

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: '16px', // keeps modal away from viewport edges
      }}
      slotProps={{
        backdrop: {
          sx: {
            // High-visibility semi-dark backdrop with subtle blur
            backgroundColor: 'rgba(10, 8, 20, 0.65)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          },
        },
      }}
    >
      {/* ── Modal Card ──────────────────────────────────────────────────────
          Fluid: maxWidth caps it, width: 100% fills available space.
          No fixed-px widths on the card itself → no horizontal scroll.    */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          position: 'relative',
          display: 'flex',
          // Stack vertically on mobile, side-by-side on desktop
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: '16px', sm: '28px' },
          maxWidth: 860,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          bgcolor: '#ffffff',
          borderRadius: '14px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          border: '1px solid rgba(220,220,230,0.6)',
          p: { xs: '20px 16px', sm: '28px' },
          outline: 'none',
          boxSizing: 'border-box',
          animation: 'modalPop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '@keyframes modalPop': {
            from: { opacity: 0, transform: 'scale(0.90)' },
            to:   { opacity: 1, transform: 'scale(1)' },
          },
        }}
      >
        {/* ── Close Button ──────────────────────────────────────────────── */}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            bgcolor: 'rgba(0,0,0,0.06)',
            zIndex: 1,
            '&:hover': { bgcolor: 'rgba(0,0,0,0.12)' },
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {/* ── LEFT: Product Image ────────────────────────────────────────
            Mobile: full width, fixed height at top.
            Desktop: flex 0 0 38%, maxWidth 300.                         */}
        <Box
          sx={{
            flex: { xs: 'none', sm: '0 0 38%' },
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '100%', sm: 300 },
            height: { xs: 200, sm: 'auto' },
            aspectRatio: { xs: 'unset', sm: '1 / 1.1' },
            borderRadius: '10px',
            overflow: 'hidden',
            bgcolor: '#f5f5f5',
            flexShrink: 0,
            alignSelf: { xs: 'stretch', sm: 'flex-start' },
            boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              mixBlendMode: 'multiply',
            }}
          />
        </Box>

        {/* ── RIGHT: Product Info ────────────────────────────────────────
            flex: 1 → takes remaining space, min-width: 0 prevents overflow. */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0, // critical: prevents flex child from overflowing
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Stock Badge */}
          {product.stock === 0 ? (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 28,
                borderRadius: '5px',
                bgcolor: 'rgba(211, 47, 47, 0.12)',
                mb: '14px',
              }}
            >
              <Typography sx={{ color: '#d32f2f', fontWeight: 700, fontSize: '12px' }}>
                ✕ Out of Stock
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 120,
                height: 28,
                borderRadius: '5px',
                bgcolor: 'rgba(0, 192, 96, 0.12)',
                mb: '14px',
              }}
            >
              <Typography sx={{ color: '#00C060', fontWeight: 700, fontSize: '12px' }}>
                ✓ In Stock
              </Typography>
            </Box>
          )}

          {/* Product Name */}
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            sx={{
              color: '#1a2b4c',
              lineHeight: 1.25,
              fontSize: '1.25rem',
              mb: '6px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: '14px' }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" sx={{ color: '#faaf00' }} />
            <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary', fontWeight: 'bold' }}>
              ({product.rating})
            </Typography>
          </Box>

          {/* Price Row */}
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '14px', mb: '14px' }}>
            <Typography
              fontWeight="bold"
              sx={{ color: '#1a2b4c', fontSize: '1.25rem' }}
            >
              Rs {price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>

            {product.discountPrice && (
              <Typography
                sx={{
                  color: 'text.secondary',
                  textDecoration: 'line-through',
                  fontSize: '0.95rem',
                }}
              >
                Rs {product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: '14px' }} />

          {/* Short Description */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.82rem', lineHeight: 1.65, mb: '14px' }}
          >
            Experience the best with <strong>{product.name}</strong>. This premium product from{' '}
            <strong>{product.company}</strong> is crafted to deliver exceptional results and
            elevate your daily routine. Designed with quality and excellence in mind, it is the
            perfect addition to your lifestyle.
          </Typography>

          {/* Delivery & Return Info */}
          <Box
            sx={{
              mb: '14px',
              p: '10px 14px',
              bgcolor: '#f8f9fa',
              borderRadius: '8px',
            }}
          >
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: '0.8rem' }}>
              🚚 Free Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.78rem' }}>
              Enter your postal code for Delivery Availability
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ fontSize: '0.8rem' }}>
              ↩️ Return Delivery
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
              Free 30 Days Delivery Returns. Details
            </Typography>
          </Box>

          {/* Quantity row — label LEFT, +/− stepper RIGHT, both vertically centred */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              mb: '16px',
            }}
          >
            {/* Label */}
            <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1a2b4c' }}>
              Quantity
            </Typography>

            {/* Increment / Decrement stepper — immediately right of label */}
            <Box
              sx={{
                width: 80,
                height: 30,
                borderRadius: '5px',
                border: '1.5px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                overflow: 'hidden',
              }}
            >
              <Box
                onClick={handleDecrement}
                sx={{
                  width: 27, height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#ebebeb' },
                  userSelect: 'none',
                }}
              >
                <Remove sx={{ fontSize: 13, color: '#333' }} />
              </Box>

              <Typography sx={{ fontWeight: 700, fontSize: '13px', color: '#1a2b4c', minWidth: 24, textAlign: 'center' }}>
                {quantity}
              </Typography>

              <Box
                onClick={handleIncrement}
                sx={{
                  width: 27, height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', bgcolor: '#f5f5f5',
                  '&:hover': { bgcolor: '#ebebeb' },
                  userSelect: 'none',
                }}
              >
                <Add sx={{ fontSize: 13, color: '#333' }} />
              </Box>
            </Box>
          </Box>

          {/* Action Buttons — fluid width (100% of right col) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button
              variant="contained"
              startIcon={<FlashOn />}
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              fullWidth              // fills right column, no fixed px
              sx={{
                height: 46,
                borderRadius: '5px',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                bgcolor: '#6b21a8',
                letterSpacing: 0.5,
                '&:hover': { bgcolor: '#552885' },
              }}
            >
              Buy Now
            </Button>

            <Button
              variant="outlined"
              startIcon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              fullWidth              // fills right column, no fixed px
              sx={{
                height: 40,
                borderRadius: '5px',
                fontSize: '0.88rem',
                fontWeight: 600,
                borderColor: '#6b21a8',
                color: '#6b21a8',
                '&:hover': { bgcolor: 'rgba(107,33,168,0.06)', borderColor: '#6b21a8' },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetailModal;
