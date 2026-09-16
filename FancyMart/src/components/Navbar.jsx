import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingBag,
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingCart,
  HomeOutlined,
  StorefrontOutlined,
  InfoOutlined,
  ContactMailOutlined,
  Logout,
} from '@mui/icons-material';

/* ── Nav links shared between desktop and mobile drawer ── */
const NAV_LINKS = [
  { label: 'Home',       to: '/',         icon: <HomeOutlined /> },
  { label: 'Products',   to: '/products', icon: <StorefrontOutlined /> },
  { label: 'About',      to: '/about',    icon: <InfoOutlined /> },
  { label: 'Contact Us', to: '/contact',  icon: <ContactMailOutlined /> },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleToggleMobile = () => setMobileOpen((prev) => !prev);
  const handleCloseMobile  = () => setMobileOpen(false);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    handleCloseMobile();
    navigate('/');
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 2, md: 6 },
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* ── Logo (always visible) ── */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <ShoppingBag sx={{ color: 'primary.main', fontSize: { xs: 22, md: 26 } }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
              }}
            >
              FancyMart
            </Typography>
          </Box>

          {/* ── Desktop: Center nav links ── */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              gap: 1,
              ml: 4,
            }}
          >
            {NAV_LINKS.map(({ label, to }) => (
              <Button
                key={to}
                component={Link}
                to={to}
                sx={{
                  color: isActive(to) ? 'primary.main' : 'text.primary',
                  fontWeight: isActive(to) ? 700 : 500,
                  borderBottom: isActive(to) ? '2px solid' : '2px solid transparent',
                  borderColor: isActive(to) ? 'primary.main' : 'transparent',
                  borderRadius: 0,
                  px: 2,
                  '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          {/* ── Right side actions (desktop + mobile) ── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, md: 1.5 },
              ml: 'auto',
            }}
          >
            {/* Cart icon — always visible */}
            <IconButton component={Link} to="/cart" color="inherit" aria-label="cart" size="small">
              <Badge badgeContent={cartItemCount} color="error" showZero={false}>
                <ShoppingCart sx={{ color: 'text.secondary', fontSize: { xs: 22, md: 24 } }} />
              </Badge>
            </IconButton>

            {/* Desktop auth actions */}
            {user ? (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={handleOpenUserMenu}
                  startIcon={<AccountCircle />}
                  sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 600 }}
                >
                  {user.firstName}
                </Button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  sx={{ mt: 1 }}
                >
                  <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">My Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center" color="error">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                <Button component={Link} to="/login" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  Login
                </Button>
                <Button component={Link} to="/signup" variant="contained" color="primary" sx={{ fontWeight: 700 }}>
                  Sign Up
                </Button>
              </Box>
            )}

            {/* ── Mobile: Hamburger icon — RIGHT corner ── */}
            <IconButton
              size="large"
              aria-label="open navigation menu"
              onClick={handleToggleMobile}
              color="inherit"
              sx={{ display: { xs: 'flex', md: 'none' }, ml: '4px' }}
            >
              <MenuIcon sx={{ color: 'text.primary' }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* ── Mobile Navigation Drawer — slides from RIGHT ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleCloseMobile}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: '16px',
            py: '12px',
            bgcolor: 'primary.main',
            color: 'white',
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag sx={{ fontSize: 22 }} />
            <Typography fontWeight={700} fontSize="1.05rem" letterSpacing={0.3}>
              FancyMart
            </Typography>
          </Box>
          <IconButton
            onClick={handleCloseMobile}
            size="small"
            sx={{ color: 'rgba(255,255,255,0.85)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.12)' } }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* User info strip (if logged in) */}
        {user && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              px: '16px',
              py: '12px',
              bgcolor: 'rgba(107,33,168,0.06)',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36, fontSize: '14px' }}>
              {user.firstName?.[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography fontWeight={700} fontSize="0.9rem" color="text.primary">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography fontSize="0.75rem" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Nav Links */}
        <List sx={{ flex: 1, py: '8px' }}>
          {NAV_LINKS.map(({ label, to, icon }) => (
            <ListItem key={to} disablePadding>
              <ListItemButton
                component={Link}
                to={to}
                onClick={handleCloseMobile}
                selected={isActive(to)}
                sx={{
                  px: '20px',
                  py: '12px',
                  borderRadius: '8px',
                  mx: '8px',
                  mb: '2px',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(107,33,168,0.08)',
                    '& .MuiListItemText-primary': { color: 'primary.main', fontWeight: 700 },
                    '& svg': { color: 'primary.main' },
                  },
                  '&:hover': { bgcolor: 'rgba(107,33,168,0.05)' },
                }}
              >
                <Box sx={{ mr: '14px', display: 'flex', color: isActive(to) ? 'primary.main' : 'text.secondary' }}>
                  {icon}
                </Box>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: '0.92rem',
                    fontWeight: isActive(to) ? 700 : 500,
                    color: isActive(to) ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Bottom auth actions */}
        <Box sx={{ p: '16px', display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
          {user ? (
            <>
              <Button
                component={Link}
                to="/profile"
                onClick={handleCloseMobile}
                variant="outlined"
                fullWidth
                startIcon={<AccountCircle />}
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                My Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant="contained"
                fullWidth
                startIcon={<Logout />}
                color="error"
                sx={{ borderRadius: '8px', fontWeight: 600, textTransform: 'none' }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                onClick={handleCloseMobile}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderRadius: '8px',
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                onClick={handleCloseMobile}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ borderRadius: '8px', fontWeight: 700, textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
