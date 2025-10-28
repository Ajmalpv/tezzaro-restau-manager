import React, { useState } from 'react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { FaSave } from 'react-icons/fa';

function AddMenu() {
  const [menuData, setMenuData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '' // base64 string
  });

  const categories = ['Main Course', 'Starters', 'Drinks', 'Desserts'];

  // Convert image file to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setMenuData({ ...menuData, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setMenuData({
      ...menuData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!menuData.name || !menuData.category || !menuData.price || !menuData.image) {
      alert('Please fill all required fields including image!');
      return;
    }
    try {
      await axios.post('http://localhost:5000/menu', menuData);
      alert('Menu item added successfully!');
      setMenuData({
        name: '',
        category: '',
        price: '',
        description: '',
        image: ''
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '500px',
          borderRadius: '20px',
          border: '2px solid #d4af37',
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#800020', fontWeight: 'bold' }}>
          Add New Menu Item
        </Typography>

        <TextField
          fullWidth
          label="Food Name"
          name="name"
          value={menuData.name}
          onChange={handleChange}
          margin="normal"
          required
        />

        <TextField
          fullWidth
          select
          label="Select Category"
          name="category"
          value={menuData.category}
          onChange={handleChange}
          margin="normal"
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="Price (₹)"
          name="price"
          value={menuData.price}
          onChange={handleChange}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          component="label"
          color="secondary"
          sx={{ mt: 2, mb: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>

        {menuData.image && (
          <Box sx={{ mt: 2 }}>
            <Typography>Preview:</Typography>
            <img src={menuData.image} alt="Preview" style={{ width: '100%', borderRadius: '10px' }} />
          </Box>
        )}

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={menuData.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<FaSave />}
          sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '16px' }}
          onClick={handleSubmit}
        >
          Save Menu Item
        </Button>
      </Paper>
    </Box>
  );
}

export default AddMenu;
