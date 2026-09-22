import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Divider,
  TextField,
  Checkbox,
  FormControlLabel,
  Collapse,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  LocalShipping as ShippingIcon,
  CloudUpload as UploadIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { CartContext } from '../context/CartContext';

const THEME = '#f55c5c';
const BORDER = '1px solid #ddd';

// ─── Custom Radio ─────────────────────────────────────────────────────────────
const RoundRadio = ({ checked, onChange }) => (
  <Box
    onClick={(e) => { e.stopPropagation(); onChange(); }}
    sx={{
      width: 22,
      height: 22,
      borderRadius: '50%',
      border: `2px solid ${checked ? THEME : '#ccc'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0,
      transition: 'border-color 0.15s',
    }}
  >
    {checked && (
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: THEME }} />
    )}
  </Box>
);

// ─── Inline SVG Card Logos ────────────────────────────────────────────────────
const VisaLogo = () => (
  <svg width="34" height="11" viewBox="0 0 750 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M278.2 235.4L311 14.7H362.5L329.6 235.4H278.2ZM491.5 19.3C481.1 15.3 464.5 11 443.8 11C392.9 11 357.4 37.7 357.2 75.4C356.9 103.1 382.4 118.4 401.6 127.6C421.3 137 428.1 143 428 151.5C427.9 164.4 412.1 170.3 397.4 170.3C376.6 170.3 365.5 167.4 348.5 160.3L341.8 157.1L334.5 200.5C346.7 205.9 369.4 210.6 393 210.8C447.2 210.8 482 184.4 482.4 144C482.6 121.9 468.8 104.9 439.7 90.9C421.9 82.2 411 76 411.1 66.9C411.1 58.8 419.9 50.2 439 50.2C454.9 49.9 466.5 53.4 475.5 57.4L480 59.5L487.2 17.8L491.5 19.3ZM608.3 14.7H568.9C556.4 14.7 547.2 18.3 541.8 31.3L465.9 235.5H520.1L531.3 204.7L597.3 204.7L603.7 235.4H651.8L608.3 14.7ZM546.5 165.9C550.5 155.3 567.4 108.3 567.4 108.3C567.1 108.9 571.4 97.7 573.9 90.8L577.2 106.5C577.2 106.5 587.4 155.9 589.5 165.9H546.5ZM234.1 14.7L183.7 163.1L178.3 136.2C168.6 104.8 138.9 70.8 105.7 53.7L151.3 235.2L205.9 235.1L288.8 14.7H234.1Z" fill="#1434CB"/>
    <path d="M136.8 14.7H52.1L51.4 18.9C117.1 35.5 160.5 74.2 178.3 136.2L160.2 31.5C157 18.7 148.1 15.1 136.8 14.7Z" fill="#F9A533"/>
  </svg>
);

const MCLogo = () => (
  <svg width="26" height="18" viewBox="0 0 152 96" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="52" cy="48" r="46" fill="#EB001B"/>
    <circle cx="100" cy="48" r="46" fill="#F79E1B"/>
    <path d="M76 79.5C87.3 70.8 94.5 57.3 94.5 48C94.5 38.7 87.3 25.2 76 16.5C64.7 25.2 57.5 38.7 57.5 48C57.5 57.3 64.7 70.8 76 79.5Z" fill="#FF5F00"/>
  </svg>
);

const AmexLogo = () => (
  <Box sx={{ bgcolor: '#2E77BC', borderRadius: '2px', px: 0.7, py: 0.2 }}>
    <Typography sx={{ fontSize: '0.55rem', fontWeight: 800, color: 'white', letterSpacing: 0.3 }}>AMEX</Typography>
  </Box>
);

// ─── Payment Row ──────────────────────────────────────────────────────────────
const PaymentRow = ({ value, selected, onSelect, icon, label, badges, noBorderBottom, children }) => (
  <Box
    sx={{
      borderBottom: noBorderBottom ? 'none' : '1px solid #eee',
      cursor: 'pointer',
      '&:hover': { bgcolor: selected ? 'transparent' : '#fafafa' },
    }}
    onClick={() => onSelect(value)}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, minHeight: 56 }}>
      <RoundRadio checked={selected} onChange={() => onSelect(value)} />
      {icon && <Box sx={{ color: '#666', display: 'flex', alignItems: 'center' }}>{icon}</Box>}
      <Typography sx={{ fontWeight: 500, fontSize: '0.88rem', color: '#333', flex: 1 }}>
        {label}
      </Typography>
      {badges && (
        <Box sx={{ display: 'flex', gap: 0.75, alignItems: 'center' }}>
          {badges.map((b, i) => (
            <Box
              key={i}
              sx={{
                border: '1px solid #ddd',
                borderRadius: '3px',
                px: 0.8,
                py: 0.3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 44,
                height: 26,
                bgcolor: 'white',
              }}
            >
              {b}
            </Box>
          ))}
        </Box>
      )}
    </Box>
    <Collapse in={selected} unmountOnExit timeout={180}>
      <Box sx={{ px: 2, pb: 2 }} onClick={(e) => e.stopPropagation()}>
        {children}
      </Box>
    </Collapse>
  </Box>
);

// ─── Text Field ───────────────────────────────────────────────────────────────
const FField = ({ label, error, helperText, sx: sxProp, ...rest }) => (
  <Box sx={sxProp}>
    <Typography variant="caption" sx={{ fontWeight: 500, color: error ? '#d32f2f' : '#555', mb: 0.4, display: 'block' }}>
      {label}
    </Typography>
    <TextField
      fullWidth
      size="small"
      error={error}
      helperText={helperText}
      {...rest}
      sx={{
        mb: 0,
        '& .MuiOutlinedInput-root': {
          borderRadius: '3px',
          fontSize: '0.82rem',
          bgcolor: '#fff',
          '& fieldset': { borderColor: error ? '#d32f2f' : '#ccc' },
          '&:hover fieldset': { borderColor: THEME },
          '&.Mui-focused fieldset': { borderColor: THEME, borderWidth: '1.5px' },
        },
        '& .MuiFormHelperText-root': { mx: 0, fontSize: '0.68rem' },
      }}
    />
  </Box>
);

// ═══════════════════════════════════════════════════════════════════════════════
const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartItems || cartItems.length === 0) return <Navigate to="/cart" replace />;

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [slipFile, setSlipFile] = useState(null);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [ship, setShip] = useState({
    firstName: '', lastName: '', contactNumber: '',
    email: '', address: '', city: '', district: '', saveAsDefault: false,
  });
  const [errors, setErrors] = useState({});

  const handleShipChange = (e) => {
    const { name, value, checked, type } = e.target;
    setShip((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === 'number') v = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (name === 'expiry') v = value.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2');
    if (name === 'cvv') v = value.replace(/\D/g, '').slice(0, 3);
    setCardDetails((p) => ({ ...p, [name]: v }));
  };

  const validate = () => {
    const e = {};
    if (!ship.firstName.trim()) e.firstName = 'Required';
    if (!ship.lastName.trim()) e.lastName = 'Required';
    if (!ship.contactNumber.trim()) e.contactNumber = 'Required';
    else if (!/^\d{10}$/.test(ship.contactNumber.replace(/\s/g, ''))) e.contactNumber = 'Enter a valid 10-digit number';
    if (!ship.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(ship.email)) e.email = 'Invalid email';
    if (!ship.address.trim()) e.address = 'Required';
    if (!ship.city.trim()) e.city = 'Required';
    if (!ship.district.trim()) e.district = 'Required';
    if (paymentMethod === 'bank' && !slipFile) e.slip = 'Please upload your transfer slip';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleConfirm = () => {
    if (validate()) {
      alert('Order placed successfully! Thank you for shopping with FancyMart.');
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh' }}>

      {/* ── Banner ── */}
      <Box sx={{ width: '100%', bgcolor: THEME, py: 2.2, textAlign: 'center', mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
          Checkout{' '}
          <Typography component="span" sx={{ color: 'rgba(255,255,255,0.82)', fontWeight: 400 }}>
            ({String(itemCount).padStart(2, '0')} items)
          </Typography>
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8, px: { xs: 2, md: 6 } }}>
        {/* ── Outer flex row: Left (Pay with + Ship to) | Right (Confirm box) ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'flex-start',   // RIGHT column stays at top regardless of left height
          }}
        >

          {/* ═══════════ LEFT COLUMN ═══════════ */}
          <Box sx={{ flex: '1 1 0%', minWidth: 0 }}>

            {/* ── PAY WITH BOX ── */}
            <Box
              sx={{
                bgcolor: '#fff',
                border: BORDER,
                borderRadius: '5px',
                mb: 2.5,
                overflow: 'hidden',
              }}
            >
              {/* Header */}
              <Box sx={{ px: 2, pt: 1.8, pb: 1.2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#222' }}>
                  Pay with
                </Typography>
              </Box>
              <Divider />

              {/* Add New Card */}
              <PaymentRow
                value="card"
                selected={paymentMethod === 'card'}
                onSelect={setPaymentMethod}
                label="Add new card"
                badges={[<VisaLogo />, <MCLogo />, <AmexLogo />]}
              >
                <Grid container spacing={1.5} sx={{ mt: 0.5 }}>
                  <Grid item xs={12}>
                    <FField
                      label="Card Number"
                      name="number"
                      placeholder="0000 0000 0000 0000"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      inputProps={{ maxLength: 19 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FField
                      label="Expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardChange}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FField
                      label="CVV"
                      name="cvv"
                      placeholder="•••"
                      type="password"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      inputProps={{ maxLength: 3 }}
                    />
                  </Grid>
                </Grid>
              </PaymentRow>

              {/* Bank Transfer */}
              <PaymentRow
                value="bank"
                selected={paymentMethod === 'bank'}
                onSelect={setPaymentMethod}
                icon={<BankIcon sx={{ fontSize: 20 }} />}
                label="Bank Transfer"
              >
                <Box
                  sx={{
                    bgcolor: '#f7f7ff',
                    border: '1px solid #e8e8f0',
                    borderRadius: '4px',
                    p: 1.2,
                    mb: 1.2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Bank: <strong>Commercial Bank</strong> &nbsp;|&nbsp;
                    Acc: <strong>8001-2345-6789</strong>
                  </Typography>
                </Box>
                {/* Upload */}
                <Box
                  component="label"
                  htmlFor="slip-upload"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    p: 1.2,
                    border: `1px dashed ${errors.slip ? '#d32f2f' : slipFile ? '#4caf50' : '#ccc'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    '&:hover': { borderColor: THEME, bgcolor: 'rgba(245,92,92,0.02)' },
                  }}
                >
                  <input
                    id="slip-upload"
                    type="file"
                    hidden
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setSlipFile(e.target.files[0]);
                        setErrors((p) => ({ ...p, slip: '' }));
                      }
                    }}
                  />
                  {slipFile
                    ? <AttachFileIcon sx={{ color: '#4caf50', fontSize: 18 }} />
                    : <UploadIcon sx={{ color: '#999', fontSize: 18 }} />}
                  <Typography variant="body2" sx={{ color: slipFile ? '#4caf50' : '#888', fontSize: '0.8rem', fontWeight: slipFile ? 600 : 400 }}>
                    {slipFile ? slipFile.name : 'Upload payment slip (JPG / PNG / PDF)'}
                  </Typography>
                </Box>
                {errors.slip && (
                  <Typography variant="caption" sx={{ color: '#d32f2f', mt: 0.5, display: 'block' }}>
                    {errors.slip}
                  </Typography>
                )}
              </PaymentRow>

              {/* Cash on Delivery */}
              <PaymentRow
                value="cod"
                selected={paymentMethod === 'cod'}
                onSelect={setPaymentMethod}
                icon={<ShippingIcon sx={{ fontSize: 20 }} />}
                label="Cash on Delivery"
                noBorderBottom
              >
                <Box sx={{ bgcolor: '#fffbf0', border: '1px solid #ffe082', borderRadius: '4px', p: 1 }}>
                  <Typography variant="caption" sx={{ color: '#a07000' }}>
                    Pay with cash at the time of delivery. No extra charges.
                  </Typography>
                </Box>
              </PaymentRow>
            </Box>

            {/* ── SHIP TO BOX ── */}
            <Box sx={{ bgcolor: '#fff', border: BORDER, borderRadius: '5px', p: 2.2 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#222', mb: 2 }}>
                Ship to
              </Typography>

              {/* CSS grid — always exactly 2 columns, 4 rows */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '14px',
                }}
              >
                {/* Row 1 */}
                <FField label="First Name" name="firstName" value={ship.firstName}
                  onChange={handleShipChange} error={!!errors.firstName} helperText={errors.firstName} />
                <FField label="Last Name" name="lastName" value={ship.lastName}
                  onChange={handleShipChange} error={!!errors.lastName} helperText={errors.lastName} />

                {/* Row 2 */}
                <FField label="Contact Number" name="contactNumber" value={ship.contactNumber}
                  onChange={handleShipChange} error={!!errors.contactNumber} helperText={errors.contactNumber} />
                <FField label="Email" name="email" type="email" value={ship.email}
                  onChange={handleShipChange} error={!!errors.email} helperText={errors.email} />

                {/* Row 3 — Shipping Address (left) | Nearest City (right) */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.4 }}>
                    <Typography variant="caption" sx={{ fontWeight: 500, color: '#555' }}>
                      Shipping Address
                    </Typography>
                    <Typography
                      variant="caption"
                      onClick={() => setShip((p) => ({ ...p, saveAsDefault: !p.saveAsDefault }))}
                      sx={{ color: '#888', fontSize: '0.68rem', textDecoration: 'underline', cursor: 'pointer', fontWeight: ship.saveAsDefault ? 700 : 400 }}
                    >
                      Set as default address
                    </Typography>
                  </Box>
                  <TextField
                    fullWidth size="small" name="address"
                    value={ship.address} onChange={handleShipChange}
                    error={!!errors.address} helperText={errors.address}
                    sx={{
                      mb: 0,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '3px', fontSize: '0.82rem',
                        '& fieldset': { borderColor: errors.address ? '#d32f2f' : '#ccc' },
                        '&:hover fieldset': { borderColor: THEME },
                        '&.Mui-focused fieldset': { borderColor: THEME },
                      },
                      '& .MuiFormHelperText-root': { mx: 0, fontSize: '0.68rem' },
                    }}
                  />
                </Box>
                <FField label="Nearest City" name="city" value={ship.city}
                  onChange={handleShipChange} error={!!errors.city} helperText={errors.city} />

                {/* Row 4 — District (left) | Buttons (right) */}
                <FField label="District" name="district" value={ship.district}
                  onChange={handleShipChange} error={!!errors.district} helperText={errors.district} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 1.5, pb: '2px' }}>
                  <Button
                    variant="outlined" size="small" onClick={() => navigate('/cart')}
                    sx={{
                      borderColor: THEME, color: THEME, borderRadius: '4px',
                      px: 2.5, fontSize: '0.78rem', fontWeight: 700,
                      '&:hover': { bgcolor: 'rgba(245,92,92,0.05)', borderColor: THEME },
                    }}
                  >
                    CANCEL
                  </Button>
                  <Button
                    variant="contained" size="small"
                    sx={{
                      bgcolor: THEME, color: 'white', borderRadius: '4px',
                      px: 2.5, fontSize: '0.78rem', fontWeight: 700,
                      boxShadow: 'none', '&:hover': { bgcolor: '#e04040', boxShadow: 'none' },
                    }}
                  >
                    SAVE
                  </Button>
                </Box>

              </Box>{/* end CSS grid */}
            </Box>
          </Box>

          {/* ═══════════ RIGHT COLUMN — Confirm box only ═══════════ */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: '300px' },
              position: { md: 'sticky' },
              top: { md: 16 },
            }}
          >
            <Box
              sx={{
                bgcolor: '#fff',
                border: BORDER,
                borderRadius: '5px',
                p: 2.2,
              }}
            >
              {/* Items row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                  Items({itemCount})
                </Typography>
                <Typography variant="body2" sx={{ color: '#333', fontSize: '0.85rem', fontWeight: 500 }}>
                  LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              {/* Order total row */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.2 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#222' }}>
                  Order total
                </Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.92rem', color: '#222' }}>
                  LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              {/* Confirm button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirm}
                startIcon={<CreditCardIcon sx={{ fontSize: 17 }} />}
                sx={{
                  bgcolor: THEME,
                  color: 'white',
                  py: 1.3,
                  borderRadius: '4px',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.88rem',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#e04040', boxShadow: '0 2px 8px rgba(245,92,92,0.35)' },
                }}
              >
                Confirm and pay
              </Button>
            </Box>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default Checkout;
