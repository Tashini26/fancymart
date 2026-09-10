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
  Grid
} from '@mui/material';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 4, px: 2, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold">Create Account</Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.8, mt: 1 }}>Join FancyMart today.</Typography>
        </Box>
        
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Contact Number" value={contactNum} onChange={(e) => setContactNum(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 4, mb: 2, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
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
