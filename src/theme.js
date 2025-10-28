import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800020' // Maroon
    },
    secondary: {
      main: '#d4af37' // Gold
    },
    background: {
      default: '#fafafa'
    }
  },
  typography: {
    fontFamily: ['"Playfair Display"', 'serif'].join(','),
    h4: { fontWeight: 600 }
  }
});

export default theme;
