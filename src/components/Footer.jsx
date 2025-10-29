import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, textAlign: 'center', mt: 3 }}>
      <Typography variant="body2">
        © 2025 TEZZARO Restaurant | Cooked with ❤️ by Brandmefy
      </Typography>
    </Box>
  );
}

export default Footer;
