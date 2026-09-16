import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  TextField,
  Chip,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  VpnKey as KeyIcon
} from '@mui/icons-material';
import ProfileNav from '../components/ProfileNav';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', contactNum: '', address: '' });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });

  const handleEditClick = () => {
    setEditForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      contactNum: user.contactNum || '',
      address: user.address || ''
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (updateUser) {
      updateUser({
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        contactNum: editForm.contactNum,
        address: editForm.address
      });
    }
    setIsEditing(false);
  };

  const handlePasswordUpdate = () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      alert("Please enter both current and new passwords.");
      return;
    }
    alert("Password updated successfully!");
    setPasswordForm({ currentPassword: '', newPassword: '' });
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5">Please login to view your profile.</Typography>
      </Container>
    );
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'orders':
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>My Orders</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Order #ORD-9831</Typography>
                <Chip label="Delivered" color="success" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>Placed on: 12 Sept 2026</Typography>
              <Typography variant="body2">2x Nivea Intensive Body Wash</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>Total: Rs 1,900.00</Typography>
            </Box>

            <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Order #ORD-9832</Typography>
                <Chip label="Processing" color="warning" size="small" />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>Placed on: 14 Sept 2026</Typography>
              <Typography variant="body2">1x L'Oreal Paris Shampoo</Typography>
              <Typography variant="subtitle2" sx={{ mt: 1 }}>Total: Rs 850.00</Typography>
            </Box>
          </Box>
        );
      case 'tracking':
        return (
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>Orders Tracking</Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ border: '1px solid #eee', borderRadius: 2, p: { xs: 2, md: 3 } }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>Order #ORD-9832</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Expected Delivery: 18 Sept 2026</Typography>
              
              <Stepper activeStep={1} alternativeLabel>
                <Step>
                  <StepLabel>Placed</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Processing</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Shipped</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Delivered</StepLabel>
                </Step>
              </Stepper>
            </Box>
          </Box>
        );
      case 'general':
      default:
        return (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Contact Information
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={4}>
              {/* Row 0: Name fields */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <PersonIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>First Name</Typography>
                    {isEditing ? (
                      <TextField size="small" fullWidth value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} variant="outlined" placeholder="First Name" />
                    ) : (
                      <TextField size="small" fullWidth value={user.firstName} variant="outlined" InputProps={{ readOnly: true }} inputProps={{ sx: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }} />
                    )}
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ width: 24, mr: 2 }} /> {/* Spacer instead of redundant icon */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Last Name</Typography>
                    {isEditing ? (
                      <TextField size="small" fullWidth value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} variant="outlined" placeholder="Last Name" />
                    ) : (
                      <TextField size="small" fullWidth value={user.lastName} variant="outlined" InputProps={{ readOnly: true }} inputProps={{ sx: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' } }} />
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Row 1: Email & Phone */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <EmailIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Email Address</Typography>
                    <TextField
                      size="small"
                      fullWidth
                      value={user.email}
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                      inputProps={{
                        sx: {
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <PhoneIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Contact Number</Typography>
                    {isEditing ? (
                      <TextField
                        size="small"
                        fullWidth
                        value={editForm.contactNum}
                        onChange={(e) => setEditForm({ ...editForm, contactNum: e.target.value })}
                        placeholder="Enter phone number"
                        variant="outlined"
                      />
                    ) : (
                      <TextField
                        size="small"
                        fullWidth
                        value={user.contactNum || 'Not provided'}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        inputProps={{
                          sx: {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Row 2: Address & Action Buttons */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <HomeIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Address</Typography>
                    {isEditing ? (
                      <TextField
                        size="small"
                        fullWidth
                        value={editForm.address}
                        onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                        placeholder="Enter address"
                        variant="outlined"
                      />
                    ) : (
                      <TextField
                        size="small"
                        fullWidth
                        value={user.address || 'Not provided'}
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        inputProps={{
                          sx: {
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* Action Buttons in right cell */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Box sx={{ width: 24, mr: 2, mt: 1 }} /> {/* Spacer matching icon width */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" sx={{ display: 'block', mb: 0.5, visibility: 'hidden' }}>Spacer</Typography>
                    {!isEditing ? (
                      <Button fullWidth startIcon={<EditIcon />} onClick={handleEditClick} size="small" variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', height: 40 }}>
                        Edit Contact Information
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <Button fullWidth startIcon={<CloseIcon />} onClick={() => setIsEditing(false)} size="small" color="inherit" variant="outlined" sx={{ textTransform: 'none', borderRadius: '8px', height: 40 }}>
                          Cancel
                        </Button>
                        <Button fullWidth startIcon={<SaveIcon />} onClick={handleSave} size="small" variant="contained" color="primary" sx={{ textTransform: 'none', borderRadius: '8px', height: 40 }}>
                          Save Changes
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* Change Password Section */}
            <Box sx={{ mt: 6, mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Security Settings
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <LockIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>Current Password</Typography>
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="Enter current password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <KeyIcon color="primary" sx={{ mr: 2, mt: 3.5 }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>New Password</Typography>
                    <TextField
                      fullWidth
                      type="password"
                      placeholder="Enter new password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Grid>

              {/* Update Password Button */}
              <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }} /> {/* Empty left cell on desktop */}
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: { xs: 2, md: 1 } }}>
                  <Box sx={{ width: 24, mr: 2 }} /> {/* Spacer matching icon width */}
                  <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={handlePasswordUpdate}
                      sx={{ textTransform: 'none', borderRadius: '8px', px: 4, width: { xs: '100%', md: 'auto' }, height: 40 }}
                    >
                      Update Password
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 }, mb: 8 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 } }}>
        {/* Left Sidebar */}
        <ProfileNav user={user} activeTab={activeTab} onChangeTab={setActiveTab} />
        
        {/* Right Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: '5px', height: '100%' }}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              {renderContent()}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
