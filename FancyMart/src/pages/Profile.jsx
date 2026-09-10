import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Divider
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5">Please login to view your profile.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 6, px: 2, textAlign: 'center' }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              margin: '0 auto', 
              mb: 2, 
              bgcolor: 'background.paper', 
              color: 'primary.main' 
            }}
          >
            <AccountIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Contact Information
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body1">{user.email}</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Contact Number</Typography>
                  <Typography variant="body1">{user.contactNum || 'Not provided'}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <HomeIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Address</Typography>
                  <Typography variant="body1">{user.address || 'Not provided'}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
