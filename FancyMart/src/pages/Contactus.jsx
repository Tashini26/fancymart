import React, { useState } from 'react';
import {
  Container, Typography, Box, Paper, TextField, Button,
  Snackbar, Alert, IconButton
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Send as SendIcon,
} from '@mui/icons-material';

const SOCIAL_ICON_SIZE = 27.59;

// Flat outline-style social icons matching the reference image
const FacebookIcon = () => (
  <svg width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#555" strokeWidth="1.5" fill="none"/>
    <path d="M16 9.5h-1.5A1.5 1.5 0 0013 11v1.5h-1.5v2H13V19h2v-4.5h1.5l.5-2H15V11a.5.5 0 01.5-.5H16V9.5z" fill="#555"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#555" strokeWidth="1.5" fill="none"/>
    <rect x="8.5" y="8.5" width="11" height="11" rx="3" stroke="#555" strokeWidth="1.4" fill="none"/>
    <circle cx="14" cy="14" r="2.8" stroke="#555" strokeWidth="1.4" fill="none"/>
    <circle cx="17.8" cy="10.2" r="0.8" fill="#555"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width={SOCIAL_ICON_SIZE} height={SOCIAL_ICON_SIZE} viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="14" r="13" stroke="#555" strokeWidth="1.5" fill="none"/>
    <path d="M19.5 8.5C17.9 6.9 15.8 6 13.6 6C9 6 5.2 9.8 5.2 14.4C5.2 15.9 5.6 17.3 6.3 18.6L5 23L9.5 21.7C10.8 22.4 12.2 22.8 13.6 22.8C18.2 22.8 22 19 22 14.4C22 12.2 21.1 10.1 19.5 8.5ZM13.6 21.3C12.3 21.3 11 20.9 10 20.3L9.7 20.1L7 20.9L7.8 18.3L7.6 18C6.9 17 6.6 15.7 6.6 14.4C6.6 10.6 9.8 7.4 13.6 7.4C15.5 7.4 17.2 8.1 18.5 9.4C19.8 10.7 20.6 12.5 20.6 14.4C20.6 18.2 17.4 21.3 13.6 21.3ZM17.4 16.1C17.2 16 16.2 15.5 16 15.5C15.8 15.4 15.7 15.4 15.6 15.6C15.5 15.8 15.1 16.2 15 16.4C14.9 16.5 14.8 16.5 14.6 16.4C13.4 15.8 12.6 15.4 11.8 14C11.6 13.7 12 13.7 12.4 12.9C12.4 12.8 12.4 12.7 12.4 12.6C12.3 12.5 12 11.5 11.8 11.1C11.7 10.7 11.5 10.8 11.4 10.8C11.3 10.8 11.2 10.8 11 10.8C10.9 10.8 10.6 10.8 10.4 11.1C10.2 11.3 9.7 11.8 9.7 12.8C9.7 13.8 10.4 14.7 10.5 14.9C10.6 15 12 17.1 14 17.9C15.5 18.5 16 18.5 16.7 18.4C17.1 18.3 18 17.8 18.2 17.3C18.4 16.8 18.4 16.4 18.3 16.3C18.3 16.2 17.6 16.2 17.4 16.1Z" fill="#555"/>
  </svg>
);

const Contactus = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', inquiry: '' });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    
    if (!form.phone.trim()) {
      tempErrors.phone = "Contact number is required";
    } else if (!/^\+?[\d\s-]{7,15}$/.test(form.phone)) {
      tempErrors.phone = "Please enter a valid contact number";
    }
    
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!form.inquiry.trim()) tempErrors.inquiry = "Inquiry is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    // TODO: Wire up EmailJS using:
    //   import.meta.env.VITE_EMAILJS_SERVICE_ID
    //   import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    //   import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    setSnackbarOpen(true);
    setForm({ name: '', phone: '', email: '', inquiry: '' });
    setErrors({});
  };

  return (
    <Box className="animate-fade-in" sx={{ bgcolor: '#fff', minHeight: '100vh' }}>

      {/* ── Main Two-Column Section ──────────────────────────────── */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 6, md: 4, lg: '55px' },
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'center',
        }}>

          {/* ── LEFT: Get In Touch ──────────────────────────────── */}
          <Box sx={{
            width: { xs: '100%', md: '42%', lg: '492px' },
            maxWidth: '492px',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '31px',
            // Match top: 588px from spec = match form card top padding
            pt: { md: 2 },
            textAlign: { xs: 'center', md: 'left' },
          }}>
            {/* "Get In Touch" small label */}
            <Typography
              variant="subtitle2"
              color="primary"
              fontWeight="bold"
              sx={{ letterSpacing: 0.5, textTransform: 'none', mb: -1 }}
            >
              Get In Touch
            </Typography>

            {/* Big UPPERCASE heading */}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                textTransform: 'uppercase',
                lineHeight: 1.25,
                color: '#111',
                fontSize: { xs: '1.6rem', md: '1.85rem' },
              }}
            >
              Let's Connect and Build Stronger Communities
            </Typography>

            {/* Description */}
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              Whether you're interested in our products, need help with your order, exploring partnership opportunities, or simply want to say hello — we'd love to hear from you. Reach out to our team and we'll get back to you as soon as possible.
            </Typography>

            {/* Follow Us */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1.5, color: '#111' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: '9px', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <IconButton
                  href="https://facebook.com"
                  target="_blank"
                  sx={{ p: 0.5, '&:hover': { opacity: 0.7, transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com"
                  target="_blank"
                  sx={{ p: 0.5, '&:hover': { opacity: 0.7, transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  href="https://wa.me/94000000000"
                  target="_blank"
                  sx={{ p: 0.5, '&:hover': { opacity: 0.7, transform: 'scale(1.1)' }, transition: 'all 0.2s' }}
                >
                  <WhatsAppIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          {/* ── RIGHT: Contact Form Card ───────────────────────── */}
          <Paper
            elevation={0}
            sx={{
              width: { xs: '100%', md: '54%', lg: '623px' },
              maxWidth: '623px',
              minHeight: '514px',
              borderRadius: '20px',
              pt: '46px',
              pr: '42px',
              pb: '46px',
              pl: '42px',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              flexShrink: 0,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '45px',
              }}
            >
              {/* Your Name */}
              <TextField
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                error={!!errors.name}
                helperText={errors.name}
                variant="standard"
                fullWidth
                InputProps={{ disableUnderline: false }}
                sx={{
                  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
                  '& .MuiInput-underline:before': { borderBottomColor: '#ccc' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: '#888' },
                }}
              />

              {/* Contact Number with Country Code — single field */}
              <TextField
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Contact Number with Country Code"
                error={!!errors.phone}
                helperText={errors.phone}
                variant="standard"
                fullWidth
                type="tel"
                sx={{
                  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
                  '& .MuiInput-underline:before': { borderBottomColor: '#ccc' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: '#888' },
                }}
              />

              {/* Email Address */}
              <TextField
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                error={!!errors.email}
                helperText={errors.email}
                variant="standard"
                fullWidth
                sx={{
                  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
                  '& .MuiInput-underline:before': { borderBottomColor: '#ccc' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: '#888' },
                }}
              />

              {/* Your Inquiry */}
              <TextField
                name="inquiry"
                value={form.inquiry}
                onChange={handleChange}
                placeholder="Your Inquiry"
                error={!!errors.inquiry}
                helperText={errors.inquiry}
                multiline
                minRows={3}
                variant="standard"
                fullWidth
                sx={{
                  '& .MuiInputBase-input::placeholder': { color: '#999', opacity: 1 },
                  '& .MuiInput-underline:before': { borderBottomColor: '#ccc' },
                  '& .MuiInput-underline:hover:before': { borderBottomColor: '#888' },
                }}
              />

              {/* Send Message Button */}
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '10px',
                  padding: '10px',
                  fontWeight: 'bold',
                  fontSize: '0.95rem',
                  letterSpacing: 1.5,
                  bgcolor: '#0d1b6e',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#0a1560', boxShadow: '0 4px 16px rgba(13,27,110,0.3)' },
                }}
              >
                SEND MESSAGE
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>

      {/* ── Bottom "Contact Us" Info Section ──────────────────────── */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>

          {/* Section label */}
          <Typography
            variant="overline"
            fontWeight="bold"
            sx={{ color: 'primary.main', letterSpacing: 2, fontSize: '0.75rem' }}
          >
            CONTACT US
          </Typography>

          {/* Sub-heading */}
          <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5, mb: 5, color: '#111' }}>
            Get in Touch – We're Here to Help!
          </Typography>

          {/* 3 Icon Items */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 4, sm: '61px' },
            width: { xs: '100%', md: '489px' },
            mx: 'auto',
          }}>

            {/* Email Us */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%',
                bgcolor: '#2c2c2c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <EmailIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                Email Us
              </Typography>
              <Typography variant="caption" color="text.secondary">
                support@fancymart.com
              </Typography>
            </Box>

            {/* Contact Us (Phone) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%',
                bgcolor: '#2c2c2c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <PhoneIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                Contact Us
              </Typography>
              <Typography variant="caption" color="text.secondary">
                +94 071 234 5678
              </Typography>
            </Box>

            {/* Visit Us */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%',
                bgcolor: '#2c2c2c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <LocationIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>
              <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                Visit Us
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Colombo, Sri Lanka
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Success Toast ────────────────────────────────────────── */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          Thank you! Your message has been sent successfully.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contactus;
