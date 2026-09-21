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

      {/* Values Section */}
      <Box sx={{ bgcolor: '#f8f9fa', py: { xs: 8, md: 8 } }}>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" fontWeight="bold" align="center" sx={{ color: 'primary.main' }}>
              Why Choose Us
            </Typography>
            <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 3, fontWeight: 400 }}>
              The pillars that hold up the FancyMart experience.
            </Typography>
          </Box>
          
          {isMobile ? (
            <Box sx={{ 
              maxWidth: '320px', 
              mx: 'auto', 
              mt: 6,
              mb: 4,
              '.slick-dots': { bottom: '-45px' },
              '.slick-dots li button:before': { fontSize: '14px', color: '#9e9e9e', opacity: 0.7, transition: 'all 0.3s' },
              '.slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1, transform: 'scale(1.2)' },
              '.slick-slide > div': { display: 'flex', justifyContent: 'center' }
            }}>
              <Slider {...sliderSettings}>
                {values.map((value, index) => (
                  <Card 
                    key={index}
                    sx={{ 
                      width: '295px !important',
                      height: '359px',
                      border: 'none', 
                      boxShadow: '0 4px 24px rgba(0,0,0,0.06)', 
                      borderRadius: '20px', 
                      display: 'flex !important',
                      flexDirection: 'column',
                      alignItems: 'center',
                      mx: 'auto'
                    }}
                  >
                    <CardContent sx={{ p: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                      <Box 
                        sx={{ 
                          mb: 3, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '56.69px',
                          height: '56.69px',
                          borderRadius: '56.69px', 
                          bgcolor: 'rgba(0, 200, 83, 0.1)',
                          padding: '14px',
                          boxSizing: 'border-box'
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1.1rem', mb: 2 }}>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Slider>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', gap: '20px', mt: 6 }}>
              {values.map((value, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    flex: 1,
                    minWidth: 0,
                    height: '359px',
                    border: 'none', 
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)', 
                    borderRadius: '20px', 
                    transition: 'all 0.3s ease', 
                    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <CardContent sx={{ p: '40px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                    <Box 
                      sx={{ 
                        mb: 3, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '56.69px',
                        height: '56.69px',
                        borderRadius: '56.69px', 
                        bgcolor: 'rgba(0, 200, 83, 0.1)',
                        padding: '14px',
                        boxSizing: 'border-box'
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: '1.1rem', mb: 2 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.9rem' }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>

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
