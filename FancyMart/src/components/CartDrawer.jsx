import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Checkbox,
  Divider,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 288;

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});

  const toggleSelect = (id) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          top: '29px',
          height: 'calc(100% - 29px)',
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      {/* ── Header ────────────────────────────────────────── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid #f0f0f0',
          flexShrink: 0,
        }}
      >
        <Typography fontWeight={700} fontSize="1rem" color="text.primary">
          My Cart
          {cartItems.length > 0 && (
            <Typography component="span" fontSize="0.8rem" color="text.secondary" sx={{ ml: 1 }}>
              ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)
            </Typography>
          )}
        </Typography>
        <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary' }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {cartItems.length === 0 ? (
        /* ── Empty State ────────────────────────────────── */
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, px: 3 }}>
          <Typography fontSize="2rem">🛒</Typography>
          <Typography color="text.secondary" fontSize="0.9rem" textAlign="center">
            Your cart is empty. Start shopping!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => { onClose(); navigate('/products'); }}
            sx={{ borderRadius: '5px', fontWeight: 700, textTransform: 'none' }}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <>
          {/* ── Subtotal + Action Buttons ──────────────────── */}
          <Box
            sx={{
              px: 2,
              pt: 2,
              pb: 1.5,
              borderBottom: '1px solid #f0f0f0',
              flexShrink: 0,
            }}
          >
            {/* Subtotal row */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
              <Typography
                fontWeight={700}
                fontSize="0.95rem"
                color="text.primary"
                sx={{ width: 84 }}
              >
                Subtotal
              </Typography>
            </Box>

            {/* LKR Price */}
            <Typography
              fontWeight={700}
              fontSize="1.05rem"
              color="primary.main"
              sx={{ mb: 1.5 }}
            >
              LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </Typography>

            {/* Checkout Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCheckout}
              sx={{
                height: 40,
                borderRadius: '5px',
                fontWeight: 700,
                fontSize: '0.85rem',
                mb: 1,
                boxShadow: 'none',
                '&:hover': { boxShadow: '0 4px 12px rgba(107,33,168,0.3)' },
              }}
            >
              Checkout
            </Button>

            {/* Go To Cart Button */}
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleGoToCart}
              sx={{
                height: 40,
                borderRadius: '5px',
                fontWeight: 700,
                fontSize: '0.85rem',
                borderWidth: '1px',
                '&:hover': { borderWidth: '1px', bgcolor: 'rgba(107,33,168,0.04)' },
              }}
            >
              Go To Cart
            </Button>
          </Box>

          {/* ── Product Cards List ─────────────────────────── */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: '100%',
                  borderRadius: '10px',
                  border: '1px solid #eee',
                  bgcolor: '#fafafa',
                  p: 1.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  position: 'relative',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)' },
                }}
              >
                {/* Select checkbox — top left */}
                <Checkbox
                  checked={!!selected[item.id]}
                  onChange={() => toggleSelect(item.id)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    width: 26,
                    height: 26,
                    borderRadius: '5px',
                    padding: 0,
                    color: 'primary.main',
                    '& .MuiSvgIcon-root': { fontSize: 18 },
                  }}
                />

                {/* Delete icon — top right */}
                <IconButton
                  size="small"
                  onClick={() => removeFromCart(item.id)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 24,
                    height: 24,
                    color: '#e53935',
                    '&:hover': { bgcolor: 'rgba(229,57,53,0.08)' },
                  }}
                >
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </IconButton>

                {/* Product Image */}
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: '100%',
                    height: 130,
                    objectFit: 'contain',
                    bgcolor: '#f0f0f0',
                    borderRadius: '8px',
                    mt: 2,
                  }}
                />

                {/* Product Name */}
                <Typography
                  fontSize="0.78rem"
                  fontWeight={600}
                  color="text.primary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: 1.4,
                  }}
                >
                  {item.name}
                </Typography>

                {/* Price + Quantity controls */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography fontWeight={700} fontSize="0.85rem" color="primary.main">
                    LKR {((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </Typography>

                  {/* Qty controls */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      bgcolor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      px: 0.5,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                      sx={{ p: 0.25, color: 'primary.main', '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <RemoveIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                    <Typography fontSize="0.78rem" fontWeight={700} sx={{ minWidth: 16, textAlign: 'center' }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                      sx={{ p: 0.25, color: 'primary.main', '&:hover': { bgcolor: 'transparent' } }}
                    >
                      <AddIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartDrawer;
