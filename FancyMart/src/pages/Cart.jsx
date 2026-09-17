import React, { useContext } from 'react';
import {
  Box, Typography, Button, IconButton,
  Container, Divider
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate discount (10% off if any item has discountPrice)
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = originalTotal - cartTotal;

  /* ── Empty State ───────────────────────────────────────────── */
  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything yet.
        </Typography>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          sx={{ borderRadius: '5px', fontWeight: 700, px: 4, py: 1.5 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  /* ── Cart Page ─────────────────────────────────────────────── */
  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">

        {/* ── Heading ──────────────────────────────────────── */}
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            height: { md: '45px' },
            display: 'flex',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Your Cart&nbsp;
            <Typography component="span" variant="h5" color="text.secondary" fontWeight={400}>
              ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)
            </Typography>
          </Typography>
        </Box>

        {/* ── Two-Column Layout ─────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          {/* ── LEFT: Product list ───────────────────────── */}
          <Box sx={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {cartItems.map((item) => {
              const unitPrice = item.discountPrice || item.price;
              const hasDiscount = !!item.discountPrice;

              return (
                <Box
                  key={item.id}
                  sx={{
                    width: '100%',
                    minHeight: '141px',
                    bgcolor: '#fff',
                    borderRadius: '5px',
                    border: '1px solid #ebebeb',
                    display: 'flex',
                    alignItems: 'center',
                    px: { xs: 2, md: 3 },
                    py: 2,
                    gap: 2,
                  }}
                >
                  {/* Product Image */}
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.name}
                    sx={{
                      width: 97,
                      height: 130,
                      objectFit: 'contain',
                      borderRadius: '4px',
                      flexShrink: 0,
                      bgcolor: '#f9f9f9',
                    }}
                  />

                  {/* Right side wrapper (Name/Price + Controls) */}
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2, minWidth: 0 }}>
                    
                    {/* Name + Price */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        fontWeight={700}
                        fontSize="0.95rem"
                        color="text.primary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 0.5,
                        }}
                      >
                        {item.name}
                      </Typography>

                      {/* Prices row */}
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
                        <Typography fontWeight={700} fontSize="0.9rem" color="text.primary" sx={{ whiteSpace: 'nowrap' }}>
                          LKR {unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Typography>
                        {hasDiscount && (
                          <Typography
                            fontSize="0.8rem"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through', whiteSpace: 'nowrap' }}
                          >
                            LKR {item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* RIGHT: Qty controls + Remove */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'row', sm: 'column' },
                        alignItems: { xs: 'center', sm: 'flex-end' },
                        gap: { xs: 2, sm: 1 },
                        flexShrink: 0,
                      }}
                    >
                      {/* Increment / Decrement */}
                      <Box
                        sx={{
                          width: 61,
                          height: 30,
                          borderRadius: '5px',
                          border: '1px solid #e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          bgcolor: '#fff',
                          overflow: 'hidden',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          sx={{ p: '4px', borderRadius: 0, '&:hover': { bgcolor: '#f5f5f5' } }}
                        >
                          <Remove sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography fontSize="0.8rem" fontWeight={700}>
                          {String(item.quantity).padStart(2, '0')}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => updateQuantity(item.id, 1)}
                          sx={{ p: '4px', borderRadius: 0, '&:hover': { bgcolor: '#f5f5f5' } }}
                        >
                          <Add sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Box>

                      {/* Remove button */}
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        size="small"
                        sx={{
                          width: 50,
                          minWidth: 50,
                          height: 12,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: '#e53935',
                          p: 0,
                          textTransform: 'none',
                          '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* ── RIGHT: Price Details ──────────────────────── */}
          <Box
            sx={{
              width: { xs: '100%', md: '488px' },
              minHeight: { xs: 'auto', md: '320px' },
              bgcolor: '#fff',
              borderRadius: '5px',
              border: '1px solid #ebebeb',
              p: 3,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            {/* Heading */}
            <Typography fontWeight={700} fontSize="1rem" color="text.primary" sx={{ mb: 1 }}>
              Price Details&nbsp;
              <Typography component="span" fontSize="0.85rem" color="text.secondary" fontWeight={400}>
                ({cartItems.reduce((c, i) => c + i.quantity, 0)} items)
              </Typography>
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {/* Subtotal row */}
            <Box
              sx={{
                width: '156px',
                height: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mb: 0.5,
              }}
            >
              <Typography fontSize="0.9rem" color="text.secondary">Subtotal</Typography>
              <Typography fontSize="0.9rem" color="text.primary" fontWeight={500}>
                LKR {originalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>

            {/* Discount row */}
            {discount > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 0.5 }}>
                <Typography fontSize="0.9rem" color="text.secondary">Discount</Typography>
                <Typography fontSize="0.9rem" color="success.main" fontWeight={500}>
                  − LKR {discount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            )}

            <Divider sx={{ my: 1.5 }} />

            {/* Total row */}
            <Box
              sx={{
                height: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                mb: 2,
              }}
            >
              <Typography fontWeight={700} fontSize="1rem" color="text.primary">Total</Typography>
              <Typography fontWeight={700} fontSize="1rem" color="text.primary">
                LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
            </Box>

            {/* Spacer */}
            <Box sx={{ flex: 1 }} />

            {/* Checkout Button */}
            <Button
              onClick={() => navigate('/checkout')}
              variant="contained"
              color="primary"
              sx={{
                width: '100%',
                height: '45px',
                borderRadius: '5px',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { boxShadow: '0 4px 12px rgba(107,33,168,0.3)' },
              }}
            >
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
