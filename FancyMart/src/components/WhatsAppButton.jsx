import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  return (
    <Tooltip title="Chat on WhatsApp" placement="left">
      <Fab
        color="success"
        aria-label="whatsapp"
        onClick={handleClick}
        sx={{
          width: { xs: 48, md: 56 },
          height: { xs: 48, md: 56 },
          bgcolor: '#25D366',
          color: 'white',
          '&:hover': { bgcolor: '#128C7E' },
          boxShadow: '0 8px 24px rgba(37,211,102,0.4)',
        }}
      >
        <WhatsAppIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
