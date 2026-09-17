import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, TextField, Button, Grid, 
  List, ListItem, ListItemIcon, ListItemText, Snackbar, Alert, Divider
} from '@mui/material';
import { 
  Send as SendIcon, 
  LocationOn as LocationIcon, 
  Phone as PhoneIcon, 
  Email as EmailIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';

const Contactus = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSnackbarOpen(true);
  };

  return (
    <Box className="animate-fade-in">
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        py: { xs: 8, md: 12 },
        textAlign: 'center',
        mb: 8,
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
            Whether you have a question about our products, need assistance with your order, or just want to say hello, we are here for you.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={6}>
          {/* Left Column: Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Send us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                Fill out the form below and our team will get back to you within 24 hours.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="First Name" required variant="filled" sx={{ bgcolor: 'white' }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Last Name" required variant="filled" sx={{ bgcolor: 'white' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Email Address" type="email" required variant="filled" sx={{ bgcolor: 'white' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" required variant="filled" sx={{ bgcolor: 'white' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Your Message" multiline rows={5} required variant="filled" sx={{ bgcolor: 'white' }} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit"
                      variant="contained" 
                      color="primary" 
                      size="large" 
                      endIcon={<SendIcon />}
                      sx={{ px: 5, py: 1.5, borderRadius: '30px', fontWeight: 'bold' }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Contact Information (Dummy Data) */}
          <Grid item xs={12} md={5}>
            <Box sx={{ p: { xs: 0, md: 3 } }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={4}>
                We're open for any suggestion or just to have a chat.
              </Typography>

              <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                    <LocationIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Headquarters" 
                    secondary="123 Fancy Avenue, Commerce City, NY 10001, USA"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
                
                <ListItem disablePadding>
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone Support" 
                    secondary="+1 (555) 123-4567"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>

                <ListItem disablePadding>
                  <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Email" 
                    secondary="support@fancymart.com"
                    primaryTypographyProps={{ fontWeight: 'bold' }}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 4 }} />

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Business Hours
              </Typography>
              <List>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                    <TimeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Monday - Friday: 9am to 6pm EST" />
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                    <TimeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Saturday: 10am to 4pm EST" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ color: 'text.secondary', minWidth: 40 }}>
                    <TimeIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sunday: Closed" />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Toast Notification */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={4000} 
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          Thank you! Your message has been sent.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contactus;
