import React from 'react';
import { Box, Container, Typography, IconButton, Link, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText', mt: 'auto' }}>
      <Container maxWidth="lg">

        {/* ── Three-column row ── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
            gap: { xs: 4, sm: 2, md: 0 },
            py: { xs: 4, sm: 4, md: 5 },
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          {/* Column 1 — Brand description */}
          <Box sx={{ maxWidth: { xs: '100%', sm: '32%', md: '28%' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              FancyMart
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.9 }}>
              Your one-stop destination for<br />
              premium products. We bring you<br />
              the best quality items with a<br />
              seamless shopping experience.
            </Typography>
          </Box>

          {/* Column 2 — Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Quick Links
            </Typography>
            <Stack spacing={0.8} sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <Link
                component={RouterLink}
                to="/products"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Shop Products
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Contact Us
              </Link>
            </Stack>
          </Box>

          {/* Column 3 — Contact Details + Social Icons */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Contact Details
            </Typography>
            <Stack spacing={1.2} sx={{ mb: 2, alignItems: { xs: 'center', sm: 'flex-start' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                <LocationOnIcon fontSize="small" />
                <Typography variant="body2">123 Fancy Street, NY 10001</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.8 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">support@fancymart.com</Typography>
              </Box>
            </Stack>

            {/* Social icons */}
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 0.5 }}>
              <IconButton color="inherit" aria-label="Facebook" size="small" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" size="small" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram" size="small" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" size="small" sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* ── Copyright bar ── */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            py: 1.5,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            &copy; {new Date().getFullYear()} FancyMart. All rights reserved.
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;
