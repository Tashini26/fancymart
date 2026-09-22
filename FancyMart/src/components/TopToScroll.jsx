import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const TopToScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(window.scrollY > 300);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Zoom in={isVisible} unmountOnExit>
      <Fab
        color="primary"
        onClick={scrollToTop}
        aria-label="scroll back to top"
        sx={{
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          boxShadow: '0 4px 12px rgba(107,33,168,0.3)',
          '&:hover': {
            transform: 'scale(1.05)',
            transition: 'transform 0.2s',
          },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
      </Fab>
    </Zoom>
  );
};

export default TopToScroll;
