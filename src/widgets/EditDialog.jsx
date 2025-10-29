import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Box,
  Typography
} from '@mui/material';
import api from '../api';

const categories = ['Main Course', 'Starters', 'Drinks', 'Desserts'];

export default function EditDialog({ open, onClose, item, onSaved }) {
  const [form, setForm] = useState({ ...item });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm({ ...item });
  }, [item]);

  // Handle text field changes
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Handle image upload (convert to base64)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle save
  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/${item.id}`, {
        ...form,
        price: Number(form.price)
      });
      onSaved(res.data);
    } catch (err) {
      console.error(err);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (!item) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg,#800020,#d4af37)',
          color: '#fff'
        }}
      >
        Edit Menu Item
      </DialogTitle>

      <DialogContent sx={{ background: '#fff8f0' }}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form?.name || ''}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={form?.category || ''}
          onChange={handleChange}
          sx={{ mt: 2 }}
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={form?.price || ''}
          onChange={handleChange}
          sx={{ mt: 2 }}
        />

        {/* Image Upload */}
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

        {/* Image Preview */}
        {form?.image && (
          <Box sx={{ mt: 2 }}>
            <Typography>Preview:</Typography>
            <img
              src={form.image}
              alt="Preview"
              style={{
                width: '100%',
                borderRadius: '10px',
                border: '1px solid #d4af37'
              }}
            />
          </Box>
        )}

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={form?.description || ''}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{ mt: 2 }}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
