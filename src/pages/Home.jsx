import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaList } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', height: '90vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      >
        <source src="/restau.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))',
          zIndex: 0
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          zIndex: 1,
          p: 2
        }}
      >
        <Paper
          elevation={10}
          sx={{
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            p: 5,
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            maxWidth: '600px'
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to Tezzaro Restau-manager
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Manage your restaurant menu with elegance and ease
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              startIcon={<FaPlus />}
              onClick={() => navigate('/add')}
              sx={{
                fontWeight: 'bold',
                px: 4,
                '&:hover': { backgroundColor: '#b58b17' }
              }}
            >
              Add Menu
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<FaList />}
              onClick={() => navigate('/menu')}
              sx={{
                fontWeight: 'bold',
                px: 4,
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.2)',
                  borderColor: '#d4af37'
                }
              }}
            >
              View Menu
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default Home;
