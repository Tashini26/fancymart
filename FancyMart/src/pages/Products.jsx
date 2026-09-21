import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Collapse,
  IconButton,
  RadioGroup,
  Radio,
  Slider,
  Drawer,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  Pagination,
} from '@mui/material';
import { Remove as RemoveIcon, Add as AddIcon, Tune as TuneIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import heroImage from '../assets/Product/hro.webp';
import Checkout from './Checkout';

import { DUMMY_PRODUCTS, BRANDS, CATEGORIES } from '../data/products';

/* ── Collapsible filter section — organized card style ── */
const SidebarFilterGroup = ({ title, icon, options = [], selected = [], onChange = () => { }, defaultExpanded = false, children }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <Box
      sx={{
        mb: '10px',
        bgcolor: '#fff',
        borderRadius: '10px',
        border: '1px solid #f0f0f0',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      {/* Section header */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          px: '14px',
          py: '10px',
          bgcolor: expanded ? 'rgba(0,200,83,0.06)' : '#fafafa',
          cursor: 'pointer',
          borderBottom: expanded ? '1px solid #f0f0f0' : 'none',
          transition: 'background 0.2s',
          '&:hover': { bgcolor: 'rgba(0,200,83,0.08)' },
        }}
      >

        <Typography
          sx={{
            flexGrow: 1,
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#1a2b4c',
            textTransform: 'uppercase',
            letterSpacing: 0.6,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: 22, height: 22,
            borderRadius: '50%',
            bgcolor: expanded ? '#00c853' : '#eee',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {expanded
            ? <RemoveIcon sx={{ fontSize: 14, color: '#fff' }} />
            : <AddIcon sx={{ fontSize: 14, color: '#999' }} />}
        </Box>
      </Box>

      {/* Collapsible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ px: '14px', py: '8px' }}>
          <FormGroup>
            {options.map((opt) => (
              <FormControlLabel
                key={opt}
                control={
                  <Checkbox
                    checked={selected.includes(opt)}
                    onChange={() => onChange(opt)}
                    size="small"
                    sx={{ color: '#d0d0d0', '&.Mui-checked': { color: '#00c853' } }}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontSize: '0.84rem',
                      color: selected.includes(opt) ? '#00c853' : '#444',
                      fontWeight: selected.includes(opt) ? 600 : 400,
                      transition: 'color 0.15s',
                    }}
                  >
                    {opt}
                  </Typography>
                }
                sx={{ ml: 0, mb: '2px' }}
              />
            ))}
          </FormGroup>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

/* ── Filter panel — organized into card sections ── */
const FilterContent = ({ minRating, setMinRating, selectedBrands, handleBrandToggle, selectedCategories, handleCategoryToggle, priceRange, handlePriceChange }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

    {/* Top Rating */}
    <SidebarFilterGroup title="⭐ Top Rating" defaultExpanded={true}>
      <RadioGroup value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
        {[
          { value: 0, label: 'Any Rating' },
          { value: 4.0, label: '4.0 & up' },
          { value: 4.5, label: '4.5 & up' },
        ].map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={
              <Radio
                size="small"
                sx={{ color: '#d0d0d0', '&.Mui-checked': { color: '#00c853' } }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: '0.84rem',
                  color: minRating === value ? '#00c853' : '#444',
                  fontWeight: minRating === value ? 600 : 400,
                }}
              >
                {label}
              </Typography>
            }
            sx={{ ml: 0, mb: '2px' }}
          />
        ))}
      </RadioGroup>
    </SidebarFilterGroup>

    {/* Brands */}
    <SidebarFilterGroup
      title="🏷 Brands"
      options={BRANDS}
      selected={selectedBrands}
      onChange={handleBrandToggle}
      defaultExpanded={true}
    />

    {/* Categories */}
    <SidebarFilterGroup
      title="📦 Categories"
      options={CATEGORIES}
      selected={selectedCategories}
      onChange={handleCategoryToggle}
      defaultExpanded={true}
    />

    {/* Price Range */}
    <SidebarFilterGroup title="💰 Price Range" defaultExpanded={true}>
      <Box sx={{ px: 1, pt: 1, pb: 1 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => `Rs ${v}`}
          min={0}
          max={5000}
          sx={{
            color: '#00c853',
            '& .MuiSlider-thumb': { width: 16, height: 16 },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#00c853', fontWeight: 600 }}>Rs {priceRange[0]}</Typography>
          <Typography variant="caption" sx={{ color: '#00c853', fontWeight: 600 }}>Rs {priceRange[1]}</Typography>
        </Box>
      </Box>
    </SidebarFilterGroup>
  </Box>
);

const Products = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // mobile filter drawer

  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const navigate = useNavigate();

  const handleBuyNow = (product) => setSelectedProduct(product);
  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const handleBrandToggle = (brand) => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  const handleCategoryToggle = (category) => setSelectedCategories((prev) => prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]);
  const handlePriceChange = (event, newValue) => setPriceRange(newValue);

  const filteredProducts = useMemo(() => {
    return DUMMY_PRODUCTS.filter(product => {
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.company);
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchRating = product.rating >= minRating;
      const effectivePrice = product.discountPrice || product.price;
      const matchPrice = effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
      const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchBrand && matchCategory && matchRating && matchPrice && matchSearch;
    });
  }, [selectedBrands, selectedCategories, minRating, priceRange, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedBrands, selectedCategories, minRating, priceRange, searchTerm]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, page]);

  const filterProps = { minRating, setMinRating, selectedBrands, handleBrandToggle, selectedCategories, handleCategoryToggle, priceRange, handlePriceChange };

  // Count active filters for badge
  const activeFilterCount = selectedBrands.length + selectedCategories.length + (minRating > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 5000 ? 1 : 0);

  return (
    <Box className="animate-fade-in">

      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          mb: 6,
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
          <Typography variant="h3" component="h1" fontWeight="bold" sx={{ color: '#134e2c', lineHeight: 1.2, fontSize: { xs: '1.6rem', md: '3rem' } }}>
            Purity. Power.<br />Personalization.
          </Typography>
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ color: '#134e2c', mb: 3, mt: 1, lineHeight: 1.2, fontSize: { xs: '1.4rem', md: '3rem' } }}>
            Your Ritual, Reimagined.
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', lineHeight: 1.7, fontSize: { xs: '0.9rem', md: '1.05rem' }, maxWidth: '600px' }}>
            Experience restorative care from the curated Nature's Secret & Bellos collections. Explore deep cleansing, aloe-infused hydration, and purifying blends for face, hair, and body.
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>

        {/* ── Search Bar ── */}
        <Box sx={{ mb: 6, px: { xs: 2, sm: 0 }, display: 'flex', justifyContent: 'center' }}>
          <Autocomplete
            freeSolo
            options={DUMMY_PRODUCTS.map((option) => option.name)}
            value={searchTerm}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
            }}
            sx={{ maxWidth: '800px', width: '100%' }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search products..."
                sx={{
                  bgcolor: 'white',
                  borderRadius: '40px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '40px',
                    paddingLeft: '24px',
                    fontSize: '1.1rem',
                    minHeight: '60px',
                    '& fieldset': {
                      borderColor: '#d1d1d1',
                      borderWidth: '1.5px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#00c853',
                      borderWidth: '2px',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00c853',
                      borderWidth: '2px',
                    },
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#999' }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        {/* ── Mobile: Filter button — left corner between hero and cards ── */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            justifyContent: 'flex-start',   // anchors to LEFT corner
            mb: '20px',
            mt: "-30px"
          }}
        >
          <Box
            onClick={() => setDrawerOpen(true)}
            sx={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              bgcolor: '#00c853',
              color: 'white',
              px: '16px',
              py: '8px',
              borderRadius: '10px',
              boxShadow: '0 4px 14px rgba(0,200,83,0.35)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: '#00a846', transform: 'translateY(-1px)', boxShadow: '0 6px 18px rgba(0,200,83,0.4)' },
            }}
          >
            <TuneIcon sx={{ fontSize: 20 }} />
            <Typography sx={{ fontSize: '13px', fontWeight: 700, letterSpacing: 0.5 }}>
              FILTERS
            </Typography>

            {/* Active filter count badge */}
            {activeFilterCount > 0 && (
              <Box
                sx={{
                  position: 'absolute',
                  top: -7,
                  right: -7,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  bgcolor: '#ff4444',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                {activeFilterCount}
              </Box>
            )}
          </Box>
        </Box>

        {/* ── Mobile Filter Drawer — polished & organized ───────────────────── */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 320,
              bgcolor: '#f8f9fa',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {/* ── Drawer Header ── */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: '16px',
              py: '14px',
              bgcolor: '#1a2b4c',
              color: 'white',
              flexShrink: 0,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TuneIcon sx={{ fontSize: 20 }} />
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: '1rem', letterSpacing: 0.5 }}>
                Filter Products
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeFilterCount > 0 && (
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#00c853',
                    bgcolor: 'rgba(0,200,83,0.15)',
                    px: '8px',
                    py: '2px',
                    borderRadius: '12px',
                  }}
                >
                  {activeFilterCount} active
                </Typography>
              )}
              <IconButton onClick={() => setDrawerOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* ── Scrollable filter content ── */}
          <Box sx={{ flex: 1, overflowY: 'auto', p: '12px' }}>
            <FilterContent {...filterProps} />
          </Box>

          {/* ── Footer actions ── */}
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              p: '12px 16px',
              borderTop: '1px solid #e8e8e8',
              bgcolor: '#fff',
              flexShrink: 0,
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                filterProps.setMinRating(0);
                filterProps.selectedBrands.forEach(b => filterProps.handleBrandToggle(b));
                filterProps.selectedCategories.forEach(c => filterProps.handleCategoryToggle(c));
                filterProps.handlePriceChange(null, [0, 5000]);
              }}
              sx={{
                flex: 1,
                borderColor: '#ddd',
                color: '#666',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.72rem',
                py: '5px',
                '&:hover': { borderColor: '#999', bgcolor: 'rgba(0,0,0,0.03)' },
              }}
            >
              Clear All
            </Button>
            <Button
              size="small"
              variant="contained"
              onClick={() => setDrawerOpen(false)}
              sx={{
                flex: 2,
                bgcolor: '#00c853',
                '&:hover': { bgcolor: '#00a846' },
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.75rem',
                py: '5px',
                boxShadow: '0 3px 8px rgba(0,200,83,0.3)',
              }}
            >
              Show {filteredProducts.length} Results
            </Button>
          </Box>
        </Drawer>

        {/* ── Desktop + Mobile layout row ─────────────────────────────────── */}
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>

          {/* Desktop Sidebar Filters — hidden on mobile */}
          <Box sx={{ width: { xs: '100%', md: '280px' }, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 100, pr: 2 }}>
              <FilterContent {...filterProps} />
            </Box>
          </Box>

          {/* Products grid and pagination */}
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: { xs: '16px', sm: '20px', md: '24px' },
                rowGap: { xs: '8px', sm: '10px', md: '12px' },
                justifyContent: 'center',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
              }}
            >
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onBuyNow={handleBuyNow} />
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 10, width: '100%' }}>
                  <Typography variant="h6" color="text.secondary">
                    No products match your selected filters.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Pagination Controls */}
            {filteredProducts.length > itemsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
                <Pagination
                  count={Math.ceil(filteredProducts.length / itemsPerPage)}
                  page={page}
                  onChange={(e, value) => {
                    setPage(value);
                    window.scrollTo({ top: 350, behavior: 'smooth' }); // Scroll to top of products smoothly
                  }}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>

        </Box>
      </Container>

      {/* Toast */}
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

      {selectedProduct && (
        <Checkout product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </Box>
  );
};

export default Products;
