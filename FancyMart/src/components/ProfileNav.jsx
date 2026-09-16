import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import {
  AccountCircle as AccountIcon,
  DescriptionOutlined as GeneralIcon,
  ShoppingBagOutlined as OrdersIcon,
  LocalShippingOutlined as TrackingIcon,
} from '@mui/icons-material';

const NAV_ITEMS = [
  { id: 'general', label: 'General Overview', icon: <GeneralIcon sx={{ fontSize: 20 }} /> },
  { id: 'orders', label: 'My orders', icon: <OrdersIcon sx={{ fontSize: 20 }} /> },
  { id: 'tracking', label: 'Orders Tracking', icon: <TrackingIcon sx={{ fontSize: 20 }} /> },
];

const ProfileNav = ({ user, activeTab, onChangeTab }) => {
  return (
    <Box sx={{ width: { xs: '100%', md: 363 }, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      
      {/* ── Profile Icon & Name Box ── */}
      <Box
        sx={{
          height: 133,
          borderRadius: '5px',
          border: '1px solid #d3d3d3',
          display: 'flex',
          alignItems: 'center',
          px: '20px', // left padding to position avatar
          bgcolor: '#fff',
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: '#f0f0f0',
            color: '#999',
            mr: '20px',
          }}
        >
          {user?.firstName ? (
            <Typography variant="h3" fontWeight={600} color="#666">
              {user.firstName[0].toUpperCase()}
            </Typography>
          ) : (
            <AccountIcon sx={{ fontSize: 80 }} />
          )}
        </Avatar>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ fontSize: '14px', color: '#555', mb: '2px' }}>
            Hello,
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: 1,
              letterSpacing: 0,
              color: '#000',
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
      </Box>

      {/* ── Navigation Links ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              sx={{
                height: 40,
                borderRadius: '5px',
                border: '1px solid',
                borderColor: isActive ? '#555' : '#d3d3d3',
                bgcolor: isActive ? '#e8e8e8' : '#fff',
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                px: '14px',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: isActive ? '#e8e8e8' : '#f5f5f5',
                },
              }}
            >
              {/* Icon Box */}
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: '12px',
                  color: isActive ? '#000' : '#666',
                }}
              >
                {item.icon}
              </Box>

              {/* Label */}
              <Typography
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#000' : '#333',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

    </Box>
  );
};

export default ProfileNav;
