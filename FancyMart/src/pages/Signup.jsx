import React, { useState, useContext } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password, firstName, lastName, contactNum, address);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => setError('');

  const fieldStyle = {
    flex: '1 1 calc(50% - 8px)',
    minWidth: '180px',
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: '#fafafa',
      '&:hover fieldset': { borderColor: '#6b21a8' },
      '&.Mui-focused fieldset': { borderColor: '#6b21a8', borderWidth: 2 },
    },
    '& label.Mui-focused': { color: '#6b21a8' },
    mb: 0,
  };

  const adornment = (Icon) => ({
    startAdornment: (
      <InputAdornment position="start">
        <Icon style={{ color: '#6b21a8', fontSize: 20 }} />
      </InputAdornment>
    ),
  });

  return (
    <Container maxWidth="sm" sx={{ mt: { xs: 4, md: 8 }, mb: 8 }}>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card elevation={4} sx={{ borderRadius: 4, overflow: 'hidden' }}>

        {/* ── Purple Header ── */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 100%)',
            color: 'white',
            py: 4,
            px: 3,
            textAlign: 'center',
          }}
        >
          <Box sx={{
            width: 60, height: 60, mx: 'auto', mb: 2,
            bgcolor: 'rgba(255,255,255,0.18)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ShoppingBagIcon style={{ fontSize: 32, color: 'white' }} />
          </Box>
          <Typography variant="h4" fontWeight={700} letterSpacing={0.5}>Create Account</Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.85, mt: 0.5 }}>Join FancyMart today.</Typography>
        </Box>

        {/* ── Form Body ── */}
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>

            {/* Row 1: First Name + Last Name */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={fieldSx}
                  InputProps={adornment(PersonIcon)}
                />
              </Box>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={fieldSx}
                  InputProps={adornment(PersonIcon)}
                />
              </Box>
            </Box>

            {/* Row 2: Email + Contact */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="Email Address" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={fieldSx}
                  InputProps={adornment(EmailIcon)}
                />
              </Box>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="Contact Number"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  sx={fieldSx}
                  InputProps={adornment(PhoneIcon)}
                />
              </Box>
            </Box>

            {/* Row 3: Address + Password */}
            <Box sx={{ display: 'flex', gap: 2, mb: 2.5, flexWrap: 'wrap' }}>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={fieldSx}
                  InputProps={adornment(HomeIcon)}
                />
              </Box>
              <Box style={fieldStyle}>
                <TextField
                  required fullWidth label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={fieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon style={{ color: '#6b21a8', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword
                            ? <VisibilityOff style={{ fontSize: 20 }} />
                            : <Visibility style={{ fontSize: 20 }} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>

            {/* Sign Up Button */}
            <Button
              type="submit" fullWidth variant="contained" size="large"
              disabled={loading}
              sx={{
                mt: 1, mb: 2, py: 1.6,
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 100%)',
                boxShadow: '0 4px 15px rgba(107,33,168,0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5b1896 0%, #6d28d9 100%)',
                  boxShadow: '0 6px 20px rgba(107,33,168,0.45)',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" variant="subtitle2" color="primary.main" fontWeight="bold">
                  Sign in here
                </Link>
              </Typography>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
