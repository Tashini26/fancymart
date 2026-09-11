import React, { useState, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
  RadioGroup,
  Radio,
  Slider
} from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/Product/hro.webp';

// Updated Dummy Product Data for Beauty/Skincare to match the new filters
const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: 'Nivea Purifying Face Wash',
    price: 850.00,
    discountPrice: 700.00,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80',
    company: 'Nivea',
    category: 'Face Wash',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Nature\'s Secret Aloe Vera Moisturizer',
    price: 1200.00,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80',
    company: 'Nature\'s Secret',
    category: 'Moisturizer',
    rating: 4.8
  },
  {
    id: 3,
    name: 'Bellos Deep Clean Shampoo',
    price: 950.00,
    discountPrice: 800.00,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&q=80',
    company: 'Bellos',
    category: 'Shampoo',
    rating: 4.2
  },
  {
    id: 4,
    name: 'Unilever Repair & Protect Conditioner',
    price: 950.00,
    discountPrice: null,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&q=80',
    company: 'Unilever',
    category: 'Conditioner',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Nivea Intensive Body Wash',
    price: 1100.00,
    discountPrice: 950.00,
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80',
    company: 'Nivea',
    category: 'Body Wash',
    rating: 4.7
  },
  {
    id: 6,
    name: 'Nature\'s Secret Heel Repair Footcare',
    price: 650.00,
    discountPrice: 500.00,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80',
    company: 'Nature\'s Secret',
    category: 'Footcare',
    rating: 4.9
  }
];

const BRANDS = ['Nature\'s Secret', 'Bellos', 'Nivea', 'Unilever'];
const CATEGORIES = ['Face Wash', 'Shampoo', 'Conditioner', 'Moisturizer', 'Footcare', 'Skincare', 'Body Wash'];

const SidebarFilterGroup = ({ title, options = [], selected = [], onChange = () => {}, defaultExpanded = false, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box sx={{ mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        {options.length > 0 && (
          <Checkbox 
            checked={options.some(opt => selected.includes(opt))}
            indeterminate={options.some(opt => selected.includes(opt)) && !options.every(opt => selected.includes(opt))}
            onChange={(e) => {
              e.stopPropagation();
              if (e.target.checked) {
                const toAdd = options.filter(opt => !selected.includes(opt));
                toAdd.forEach(opt => onChange(opt));
              } else {
                options.filter(opt => selected.includes(opt)).forEach(opt => onChange(opt));
              }
            }}
            sx={{ color: '#ccc', '&.Mui-checked': { color: '#00c853' }, '&.MuiCheckbox-indeterminate': { color: '#00c853' } }}
          />
        )}
        <Typography sx={{ flexGrow: 1, fontSize: '0.9rem', color: '#555', fontWeight: options.length === 0 ? 'bold' : 'normal' }}>{title}</Typography>
        <IconButton size="small" sx={{ color: '#00c853' }}>
          {expanded ? <RemoveIcon fontSize="small" /> : <AddIcon fontSize="small" />}
        </IconButton>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ ml: options.length > 0 ? 4 : 1, mt: 1 }}>
          <FormGroup>
            {options.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox 
                    checked={selected.includes(opt)}
                    onChange={() => onChange(opt)}
                    size="small"
                    sx={{ color: '#ccc', '&.Mui-checked': { color: '#00c853' } }}
                  />
                }
                label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>{opt}</Typography>}
              />
            ))}
          </FormGroup>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const Products = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) => 
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => 
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter(product => {
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.company);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchRating = product.rating >= minRating;
      const effectivePrice = product.discountPrice || product.price;
      const matchPrice = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
      
      return matchBrand && matchCategory && matchRating && matchPrice;
    });
  }, [selectedBrands, selectedCategories, minRating, priceRange]);

  return (
    <Box className="animate-fade-in">
      
      {/* Hero Section (Full Width) */}
      <Box sx={{ 
        display: 'flex', 
        mb: 6, 
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '350px'
      }}>
        <Box sx={{ p: { xs: 4, md: 6, lg: 8 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '800px' }}>
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#134e2c', lineHeight: 1.2 }}>
            Purity. Power.<br />Personalization.
          </Typography>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ color: '#134e2c', mb: 3, mt: 1, lineHeight: 1.2 }}>
            Your Ritual, Reimagined.
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.7, fontSize: '1.05rem', maxWidth: '600px' }}>
            Experience restorative care from the curated Nature's Secret & Bellos collections. Explore deep cleansing, aloe-infused hydration, and purifying blends for face, hair, and body. Curated with the finest natural ingredients. Restorative care tailored for you.
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
        
        {/* Left Sidebar Filters */}
        <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0 }}>
          <Box sx={{ position: 'sticky', top: 100, pr: 2 }}>
            
            {/* Top Rating */}
            <SidebarFilterGroup title="Top Rating" defaultExpanded={true}>
              <RadioGroup
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
              >
                <FormControlLabel value={0} control={<Radio size="small" sx={{ color: '#ccc', '&.Mui-checked': { color: '#00c853' } }} />} label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>Any Rating</Typography>} />
                <FormControlLabel value={4.0} control={<Radio size="small" sx={{ color: '#ccc', '&.Mui-checked': { color: '#00c853' } }} />} label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>4.0 & up</Typography>} />
                <FormControlLabel value={4.5} control={<Radio size="small" sx={{ color: '#ccc', '&.Mui-checked': { color: '#00c853' } }} />} label={<Typography sx={{ fontSize: '0.85rem', color: '#666' }}>4.5 & up</Typography>} />
              </RadioGroup>
            </SidebarFilterGroup>

            {/* Brands */}
            <SidebarFilterGroup 
              title="Brands" 
              options={BRANDS} 
              selected={selectedBrands} 
              onChange={handleBrandToggle} 
              defaultExpanded={true}
            />

            {/* Products (Categories) */}
            <SidebarFilterGroup 
              title="Products" 
              options={CATEGORIES} 
              selected={selectedCategories} 
              onChange={handleCategoryToggle} 
              defaultExpanded={true}
            />

            {/* Price Range */}
            <SidebarFilterGroup title="Price Range" defaultExpanded={true}>
              <Box sx={{ px: 2, pt: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={5000}
                  sx={{ color: '#00c853' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">Rs {priceRange[0]}</Typography>
                  <Typography variant="body2" color="text.secondary">Rs {priceRange[1]}</Typography>
                </Box>
              </Box>
            </SidebarFilterGroup>

          </Box>
        </Box>

        {/* Right Side Products Grid */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} onBuyNow={handleBuyNow} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h6" color="text.secondary">
                    No products match your selected filters.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      </Container>

      {/* Purchase Confirmation Toast */}
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
    </Box>
  );
};

export default Products;
