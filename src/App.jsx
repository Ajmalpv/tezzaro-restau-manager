import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddMenu from './pages/AddMenu';
import ShowMenu from './pages/ShowMenu';
import About from './pages/About';
import { Box } from '@mui/material';

function App() {
  return (
    
    <BrowserRouter>
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddMenu />} />
          <Route path="/menu" element={<ShowMenu />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
    </BrowserRouter>

  );
}

export default App;
