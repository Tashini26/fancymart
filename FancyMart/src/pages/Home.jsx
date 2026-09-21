import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
  useTheme,
  useMediaQuery
} from '@mui/material';
import SliderLib from "react-slick";
const Slider = SliderLib.default ? SliderLib.default : SliderLib;
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DUMMY_PRODUCTS, BRANDS } from '../data/products';
import ProductCard from '../components/ProductCard';
import Checkout from './Checkout';
import heroImage from '../assets/Product/hro.webp';

// Testimonial Data (using placeholders)
const TESTIMONIALS = [
  { id: 1, name: 'Sarah M.', review: 'Absolutely love the Nivea Face Wash! My skin has never felt so clear.', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
  { id: 2, name: 'Jessica K.', review: 'The Aloe Vera Moisturizer is a game changer for dry skin.', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
  { id: 3, name: 'Michael B.', review: 'Fast shipping and authentic products. Highly recommend FancyMart.', rating: 4, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
];

const Home = () => {
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

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
  };

  // Derive products from dummy data
  const topSelling = DUMMY_PRODUCTS.slice(0, 3);
  const topRated = [...DUMMY_PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 3);

  // Repeat brands to create a seamless infinite loop
  const loopingBrands = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];

  return (
    <Box className="animate-fade-in" sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          mb: 8,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: { xs: '300px', md: '550px' },
          borderRadius: { xs: 0, md: '0 0 32px 32px' },
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Overlay for text readability */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(255, 255, 255, 0.4)' }} />

        <Box
          sx={{
            p: { xs: 3, md: 6, lg: 8 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: '800px',
            zIndex: 1
          }}
        >
          <Typography variant="h2" component="h1" fontWeight="bold" sx={{ color: '#134e2c', lineHeight: 1.2, fontSize: { xs: '2.5rem', md: '4.5rem' } }}>
            Glow Every Day
          </Typography>
          <Typography variant="h5" sx={{ color: '#333', mb: 4, mt: 2, maxWidth: '600px', fontWeight: 600 }}>
            Discover our curated collection of premium beauty creams and skincare essentials. Your journey to flawless skin starts here.
          </Typography>
          <Box>
            <Button
              component={RouterLink}
              to="/products"
              variant="contained"
              size="large"
              sx={{ py: 1.5, px: 4, fontSize: '1.1rem', bgcolor: '#134e2c', '&:hover': { bgcolor: '#0f3d23' }, borderRadius: 2 }}
            >
              Shop the Collection
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Brand Marquee moved below Top Rated */}

      {/* Top Selling Products */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Top Selling
        </Typography>
        {/* We use flex-wrap here similar to Products.jsx to center cards securely */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: { xs: '16px', sm: '20px', md: '24px' },
            rowGap: { xs: '16px', sm: '20px', md: '24px' },
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
          }}
        >
          {topSelling.map(product => (
            <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
          ))}
        </Box>
      </Container>

      {/* Hot Deal Banner */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', py: { xs: 6, md: 10 }, mb: 10, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Special Hot Deal! 🔥
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Get up to 50% off on all selected Nature's Secret products. Limited time offer!
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            color="primary"
            size="large"
            sx={{ py: 1.5, px: 6, fontSize: '1.2rem', borderRadius: 8, boxShadow: 4 }}
          >
            Grab the Deal
          </Button>
        </Container>
      </Box>

      {/* Top Rated Products */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          Top Rated
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: { xs: '16px', sm: '20px', md: '24px' },
            rowGap: { xs: '16px', sm: '20px', md: '24px' },
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
          }}
        >
          {topRated.map(product => (
            <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
          ))}
        </Box>
      </Container>

      {/* Brand Marquee (Infinite Loop) */}
      <Container maxWidth="xl" sx={{ mb: 10, overflow: 'hidden' }}>
        <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom sx={{ mb: 3, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 'bold' }}>
          Trusted Brands
        </Typography>
        <Box
          sx={{
            display: 'flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            // Fade effect on edges
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              width: '100px',
              height: '100%',
              zIndex: 2,
            },
            '&::before': {
              left: 0,
              background: 'linear-gradient(to right, #f8fafc, transparent)',
            },
            '&::after': {
              right: 0,
              background: 'linear-gradient(to left, #f8fafc, transparent)',
            }
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              animation: 'scroll 15s linear infinite',
              gap: 10,
              pr: 10, // Must match gap for seamless loop
            }}
          >
            {loopingBrands.map((brand, idx) => (
              <Typography key={idx} variant="h4" fontWeight="bold" color="#cbd5e1" sx={{ minWidth: 'max-content' }}>
                {brand}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Customer Testimonials */}
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom sx={{ mb: 6 }}>
          What Our Customers Say
        </Typography>
        {isMobile ? (
          <Box sx={{
            maxWidth: '340px',
            mx: 'auto',
            mb: 4,
            '.slick-dots': { bottom: '-45px' },
            '.slick-dots li button:before': { fontSize: '14px', color: '#9e9e9e', opacity: 0.7, transition: 'all 0.3s' },
            '.slick-dots li.slick-active button:before': { color: 'primary.main', opacity: 1, transform: 'scale(1.2)' },
            '.slick-slide > div': { display: 'flex', justifyContent: 'center' }
          }}>
            <Slider {...sliderSettings}>
              {TESTIMONIALS.map(testimonial => (
                <Card
                  key={testimonial.id}
                  sx={{
                    width: '320px !important',
                    bgcolor: '#fff5f5',
                    borderRadius: '20px',
                    boxShadow: 'none',
                    display: 'flex !important',
                    flexDirection: 'column',
                    mx: 'auto'
                  }}
                >
                  <CardContent sx={{ textAlign: 'left', p: '32px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      sx={{ width: 70, height: 70, mb: 3 }}
                    />
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>
                      "{testimonial.review}"
                    </Typography>
                    <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 1 }} />
                    <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                      {testimonial.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Slider>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {TESTIMONIALS.map(testimonial => (
              <Card
                key={testimonial.id}
                sx={{
                  width: '320px',
                  bgcolor: '#fff5f5', // soft pink background
                  borderRadius: '20px',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' },
                }}
              >
                <CardContent sx={{ textAlign: 'left', p: '32px 24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Avatar
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 70, height: 70, mb: 3 }}
                  />
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1, lineHeight: 1.7, fontSize: '0.95rem' }}>
                    "{testimonial.review}"
                  </Typography>

                  {/* Keeping name and rating but left-aligned for context */}
                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 1 }} />
                  <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                    {testimonial.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Container>

<<<<<<< HEAD
=======
      {/* Checkout Modal & Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%', fontWeight: 'bold' }}>
          {selectedProduct?.name} added to cart!
        </Alert>
      </Snackbar>

>>>>>>> origin/Ta-shini
      {selectedProduct && (
        <Checkout product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* Global styles for animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            /* The translation distance depends on the number of original items vs duplicates */
            /* Assuming we want to shift precisely one block of BRANDS */
            100% { transform: translateX(calc(-100% / 4)); }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
