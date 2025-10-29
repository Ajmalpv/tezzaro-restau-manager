import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import api from '../api';
import EditDialog from '../widgets/EditDialog';

export default function MenuCard({ item, onDeleteSuccess, onUpdated }) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Delete this item?')) return;
    try {
      setDeleting(true);
      await api.delete(`/${item.id}`);
      onDeleteSuccess(item.id);
    } catch (err) {
      console.error(err);
      alert('Failed to delete.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Card sx={{ borderRadius: 2, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="160"
            image={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={item.name}
            sx={{ transition: 'transform .25s', '&:hover': { transform: 'scale(1.04)' } }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ color: '#800020', fontWeight: 700 }}>{item.name}</Typography>
          <Typography variant="body2" sx={{ mb: 1, color: '#555' }}>{item.category} • ₹{item.price}</Typography>
          <Typography variant="body2" sx={{ color: '#333' }}>{item.description}</Typography>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: '#cca700ff',
              color: 'white',
              '&:hover': { backgroundColor: '#66001A' }
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={handleDelete}
            disabled={deleting}
            sx={{
              backgroundColor: deleting ? '#ccc' : '#800020',
              color: 'white',
              '&:hover': { backgroundColor: deleting ? '#ccc' : '#66001A' }
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      <EditDialog open={open} onClose={() => setOpen(false)} item={item} onSaved={(updated) => { onUpdated(updated); setOpen(false); }} />
    </>
  );
}
