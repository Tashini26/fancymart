import React from 'react';
import { Container, Typography, Box, Paper, TextField, Button, Grid } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const Contactus = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }} className="animate-fade-in">
      <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4} align="center">
        Have questions? We'd love to hear from you.
      </Typography>
      
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
        <Box component="form" noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email Address" type="email" required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Message" multiline rows={4} required />
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                endIcon={<SendIcon />}
                sx={{ px: 4 }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contactus;
