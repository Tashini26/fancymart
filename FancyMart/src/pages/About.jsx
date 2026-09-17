import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import { 
  VerifiedUser as QualityIcon, 
  LocalShipping as ShippingIcon, 
  SupportAgent as SupportIcon,
  Recycling as EcoIcon 
} from '@mui/icons-material';

const About = () => {
  const values = [
    {
      icon: <QualityIcon fontSize="large" color="primary" />,
      title: "Premium Quality",
      description: "We source only the finest materials and partner with trusted brands to ensure every product meets our strict quality standards."
    },
    {
      icon: <ShippingIcon fontSize="large" color="primary" />,
      title: "Fast & Reliable",
      description: "Experience seamless shopping with our expedited shipping options and reliable global delivery network."
    },
    {
      icon: <SupportIcon fontSize="large" color="primary" />,
      title: "24/7 Support",
      description: "Our dedicated customer success team is available around the clock to assist you with any questions or concerns."
    },
    {
      icon: <EcoIcon fontSize="large" color="primary" />,
      title: "Sustainable Focus",
      description: "We are committed to reducing our carbon footprint by utilizing eco-friendly packaging and supporting sustainable brands."
    }
  ];

  const team = [
    { name: "Eleanor Vance", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=47" },
    { name: "Marcus Chen", role: "Head of Product", img: "https://i.pravatar.cc/150?img=11" },
    { name: "Sophia Martinez", role: "Design Director", img: "https://i.pravatar.cc/150?img=32" },
    { name: "James Wilson", role: "Customer Experience", img: "https://i.pravatar.cc/150?img=60" }
  ];

  return (
    <Box className="animate-fade-in">
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '4rem' } }}>
            Redefining Retail
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400, px: { xs: 2, md: 10 }, lineHeight: 1.6 }}>
            At FancyMart, we believe shopping should be an experience—not just a transaction. We curate premium products that elevate your everyday life.
          </Typography>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 4 }, pb: { xs: 8, md: 12 } }}>
        <Grid container spacing={8} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <Box 
                sx={{ 
                  width: '100%', 
                  height: '400px', 
                  bgcolor: '#e0e0e0', 
                  borderRadius: '24px',
                  backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="overline" color="primary" fontWeight="bold" sx={{ letterSpacing: 2 }}>
              OUR STORY
            </Typography>
            <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1, mb: 3, color: 'primary.main' }}>
              Born from a passion for excellence.
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              Founded in 2026, FancyMart started with a simple idea: to create a curated marketplace where quality meets accessibility. Frustrated by the endless sea of mediocre products online, our founders set out to build a platform they would want to use themselves.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
              Today, we serve thousands of customers globally, bringing them hand-picked items from independent creators and established luxury brands alike. We don't just sell products; we deliver a standard of living.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Values Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'primary.main' }}>
              Why Choose Us
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, fontWeight: 400 }}>
              The pillars that hold up the FancyMart experience.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%', border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', borderRadius: 4, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 2, display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'rgba(0, 200, 83, 0.1)' }}>
                      {value.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: '#1a2b4c' }}>
            Meet the Team
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2, fontWeight: 400 }}>
            The creative minds behind the curation.
          </Typography>
        </Box>

        <Grid container spacing={6} justifyContent="center">
          {team.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box textAlign="center">
                <Avatar 
                  src={member.img} 
                  alt={member.name}
                  sx={{ 
                    width: 140, 
                    height: 140, 
                    mx: 'auto', 
                    mb: 3,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)' 
                  }} 
                />
                <Typography variant="h6" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="primary" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1, mt: 0.5 }}>
                  {member.role}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
