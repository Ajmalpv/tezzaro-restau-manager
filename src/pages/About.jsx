import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2, color: '#800020', fontFamily: '"Playfair Display", serif' }}>About</Typography>
        <Typography variant="body1">
          Tezzaro Restau-Menu Manager — a demo application built with React, Material UI, Axios and JSON Server.
          Use it to manage menu items with create/read/update/delete operations.
        </Typography>
      </Paper>
    </Box>
  );
}
