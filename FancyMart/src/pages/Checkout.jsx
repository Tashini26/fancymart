import React, { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  Divider,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormHelperText,
  styled,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  LocalShipping as ShippingIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { CartContext } from '../context/CartContext';

// Custom styled Radio to match design
const CustomRadio = styled(Radio)(({ theme }) => ({
  color: theme.palette.grey[400],
  '&.Mui-checked': {
    color: '#ff6b6b',
  },
}));

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  // Redirect if cart is empty
  if (!cartItems || cartItems.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Form states
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [slipFile, setSlipFile] = useState(null);
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    address: '',
    city: '',
    district: '',
    saveAsDefault: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSlipFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!shippingDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!shippingDetails.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\d{10}$/.test(shippingDetails.contactNumber.replace(/\s+/g, ''))) {
      newErrors.contactNumber = 'Enter a valid 10-digit number';
    }

    if (!shippingDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingDetails.email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!shippingDetails.address.trim()) newErrors.address = 'Address is required';
    if (!shippingDetails.city.trim()) newErrors.city = 'City is required';
    if (!shippingDetails.district.trim()) newErrors.district = 'District is required';

    if (paymentMethod === 'bank' && !slipFile) {
      newErrors.slip = 'Please upload a bank transfer slip';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmPay = () => {
    if (validateForm()) {
      alert('Order placed successfully! Thank you for shopping with FancyMart.');
      navigate('/');
      // Ideally here we would also clear the cart via a CartContext method
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', pb: 8 }}>
      {/* Top Banner */}
      <Box sx={{ width: '100%', bgcolor: '#f55c5c', py: 3, textAlign: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          Checkout <span style={{ fontWeight: 400, opacity: 0.9 }}>({String(itemCount).padStart(2, '0')} items)</span>
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={8}>
            
            {/* Payment Method Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2, px: 1 }}>
                Pay with
              </Typography>
              <Card variant="outlined" sx={{ borderRadius: 1 }}>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <RadioGroup
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    {/* Add New Card */}
                    <Box sx={{ p: 2, borderBottom: '1px solid #eaeaea' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                          value="card"
                          control={<CustomRadio />}
                          label={<Typography fontWeight={500}>Add new card</Typography>}
                          sx={{ mr: 2 }}
                        />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Box sx={{ bgcolor: '#1434CB', color: 'white', px: 1, py: 0.2, borderRadius: 0.5, fontSize: '0.65rem', fontWeight: 'bold' }}>VISA</Box>
                          <Box sx={{ bgcolor: '#FF5F00', color: 'white', px: 1, py: 0.2, borderRadius: 0.5, fontSize: '0.65rem', fontWeight: 'bold' }}>MC</Box>
                          <Box sx={{ bgcolor: '#2790C3', color: 'white', px: 1, py: 0.2, borderRadius: 0.5, fontSize: '0.65rem', fontWeight: 'bold' }}>AMEX</Box>
                        </Box>
                      </Box>
                      {paymentMethod === 'card' && (
                        <Box sx={{ mt: 2, ml: 4, pl: 1 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField fullWidth size="small" label="Card Number" placeholder="0000 0000 0000 0000" />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField fullWidth size="small" label="Expiry Date" placeholder="MM/YY" />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField fullWidth size="small" label="CVV" placeholder="123" />
                            </Grid>
                          </Grid>
                        </Box>
                      )}
                    </Box>

                    {/* Bank Transfer */}
                    <Box sx={{ p: 2, borderBottom: '1px solid #eaeaea' }}>
                      <FormControlLabel
                        value="bank"
                        control={<CustomRadio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <BankIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                            <Typography fontWeight={500}>Bank Transfer</Typography>
                          </Box>
                        }
                      />
                      {paymentMethod === 'bank' && (
                        <Box sx={{ mt: 2, ml: 4, pl: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Please upload your bank transfer slip/receipt below.
                          </Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            startIcon={<UploadIcon />}
                            sx={{ borderRadius: 1, textTransform: 'none', color: '#6b32a8', borderColor: '#d3c2e6' }}
                          >
                            Upload Slip
                            <input
                              type="file"
                              hidden
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                            />
                          </Button>
                          {slipFile && (
                            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'success.main' }}>
                              File attached: {slipFile.name}
                            </Typography>
                          )}
                          {errors.slip && (
                            <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                              {errors.slip}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Box>

                    {/* Cash on Delivery */}
                    <Box sx={{ p: 2 }}>
                      <FormControlLabel
                        value="cod"
                        control={<CustomRadio />}
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShippingIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                            <Typography fontWeight={500}>Cash on Delivery</Typography>
                          </Box>
                        }
                      />
                    </Box>
                  </RadioGroup>
                </FormControl>
              </Card>
            </Box>

            {/* Shipping Details Section */}
            <Box>
              <Card variant="outlined" sx={{ borderRadius: 1, p: { xs: 2, md: 4 } }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 3 }}>
                  Ship to
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>First Name</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="firstName"
                      value={shippingDetails.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Last Name</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="lastName"
                      value={shippingDetails.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Contact Number</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="contactNumber"
                      value={shippingDetails.contactNumber}
                      onChange={handleInputChange}
                      error={!!errors.contactNumber}
                      helperText={errors.contactNumber}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Email</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      value={shippingDetails.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 0.5 }}>
                      <Typography variant="caption">Shipping Address</Typography>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            size="small" 
                            sx={{ p: 0, mr: 0.5 }} 
                            name="saveAsDefault"
                            checked={shippingDetails.saveAsDefault}
                            onChange={handleInputChange}
                          />
                        }
                        label={<Typography variant="caption" color="text.secondary" sx={{ textDecoration: 'underline' }}>Set as default address</Typography>}
                        sx={{ m: 0 }}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      name="address"
                      value={shippingDetails.address}
                      onChange={handleInputChange}
                      error={!!errors.address}
                      helperText={errors.address}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>Nearest City</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="city"
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      error={!!errors.city}
                      helperText={errors.city}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" sx={{ mb: 0.5, display: 'block' }}>District</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      name="district"
                      value={shippingDetails.district}
                      onChange={handleInputChange}
                      error={!!errors.district}
                      helperText={errors.district}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1 } }}
                    />
                  </Grid>
                  
                  {/* Buttons */}
                  <Grid item xs={12} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button 
                      variant="outlined" 
                      onClick={() => navigate('/cart')}
                      sx={{ 
                        flex: 1, 
                        maxWidth: 150, 
                        borderColor: '#ff6b6b', 
                        color: '#ff6b6b', 
                        fontWeight: 'bold',
                        '&:hover': { borderColor: '#e55a5a', bgcolor: 'rgba(255, 107, 107, 0.04)' }
                      }}
                    >
                      CANCEL
                    </Button>
                    <Button 
                      variant="contained" 
                      sx={{ 
                        flex: 1, 
                        maxWidth: 150, 
                        bgcolor: '#ff6b6b', 
                        fontWeight: 'bold',
                        boxShadow: 'none',
                        '&:hover': { bgcolor: '#e55a5a', boxShadow: 'none' }
                      }}
                    >
                      SAVE
                    </Button>
                  </Grid>

                </Grid>
              </Card>
            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 1, p: 3, position: 'sticky', top: 24 }}>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" fontWeight={600} color="text.secondary">
                  Items({itemCount})
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Order total
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  LKR {cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleConfirmPay}
                startIcon={<CreditCardIcon />}
                sx={{
                  bgcolor: '#f55c5c',
                  color: 'white',
                  py: 1.5,
                  borderRadius: 1,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#e55a5a',
                    boxShadow: 'none',
                  }
                }}
              >
                Confirm and pay
              </Button>
            </Card>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
