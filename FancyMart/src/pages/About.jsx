import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar, useTheme, useMediaQuery } from '@mui/material';
import SliderLib from "react-slick";
const Slider = SliderLib.default ? SliderLib.default : SliderLib;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  VerifiedUser as QualityIcon, 
  LocalShipping as ShippingIcon, 
  SupportAgent as SupportIcon,
  Recycling as EcoIcon 
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnFocus: false,
    arrows: false,
    swipeToSlide: true,
    cssEase: "ease-in-out"
  };



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
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 0 }, textAlign: 'center' }}>
        <Typography variant="overline" color="primary" fontWeight="bold" sx={{ letterSpacing: 2 }}>
          OUR STORY
        </Typography>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mt: 1, mb: 3, color: 'primary.main' }}>
          Born from a passion for excellence.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
          Founded in 2026, FancyMart started with a simple idea: to create a curated marketplace where quality meets accessibility. Frustrated by the endless sea of mediocre products online, our founders set out to build a platform they would want to use themselves.
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'text.secondary' }}>
          Today, we serve thousands of customers globally, bringing them hand-picked items from independent creators and established luxury brands alike. We don't just sell products; we deliver a standard of living.
        </Typography>
      </Container>


      {/* Team Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 1 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" fontWeight="bold" align="center" sx={{ color: '#1a2b4c' }}>
            Meet the Team
          </Typography>
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 2, fontWeight: 400 }}>
            The creative minds behind the curation.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '60px',mb:8 }}>
          {team.map((member, index) => (
            <Box key={index} sx={{ textAlign: 'center', minWidth: '200px' }}>
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
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default About;
