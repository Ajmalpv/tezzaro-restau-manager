import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, TextField, MenuItem, Chip, CircularProgress } from '@mui/material';
import api from '../api';
import MenuCard from '../widgets/MenuCard';

const categories = ['All', 'Main Course', 'Starters', 'Drinks', 'Desserts'];

export default function ShowMenu() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await api.get('/');
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch menu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  const handleDeleteLocal = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const handleUpdateLocal = (updated) => setItems(prev => prev.map(i => i.id === updated.id ? updated : i));

  const filtered = items.filter(i => (filter === 'All' || i.category === filter) && i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#800020', fontWeight: 700 }}>Menu</Typography>

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        {categories.map(c => (
          <Chip
            key={c}
            label={c}
            clickable
            color={filter === c ? 'secondary' : 'default'}
            onClick={() => setFilter(c)}
            sx={{ px: 1.5, py: 0.5 }}
          />
        ))}

        <Box sx={{ ml: 'auto', width: 260 }}>
          <TextField size="small" placeholder="Search by name" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress color="secondary" /></Box>
      ) : (
        <Grid container spacing={3}>
          {filtered.length > 0 ? filtered.map(item => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuCard item={item} onDeleteSuccess={handleDeleteLocal} onUpdated={handleUpdateLocal} />
            </Grid>
          )) : (
            <Box sx={{ p: 4 }}>No items found.</Box>
          )}
        </Grid>
      )}
    </Box>
  );
}
  