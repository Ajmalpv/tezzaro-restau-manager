import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Button } from '@mui/material';
import api from '../api';

const categories = ['Main Course', 'Starters', 'Drinks', 'Desserts'];

export default function EditDialog({ open, onClose, item, onSaved }) {
  const [form, setForm] = useState({ ...item });
  const [loading, setLoading] = useState(false);

  useEffect(() => { setForm({ ...item }); }, [item]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/menu/${item.id}`, { ...form, price: Number(form.price) });
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
      <DialogTitle sx={{ background: 'linear-gradient(90deg,#800020,#d4af37)', color: '#fff' }}>Edit Menu Item</DialogTitle>
      <DialogContent sx={{ background: '#fff8f0' }}>
        <TextField fullWidth label="Name" name="name" value={form?.name||''} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField select fullWidth label="Category" name="category" value={form?.category||''} onChange={handleChange} sx={{ mt: 2 }}>
          {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
        <TextField fullWidth label="Price" name="price" value={form?.price||''} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Image URL" name="image" value={form?.image||''} onChange={handleChange} sx={{ mt: 2 }} />
        <TextField fullWidth label="Description" name="description" value={form?.description||''} onChange={handleChange} multiline rows={3} sx={{ mt: 2 }} />
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="secondary" onClick={handleSave} disabled={loading}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
