import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./routes/Login";
import IncidentBrowser from './routes/IncidentsBrowser';
import axios from "axios";
import Dashboard from './routes/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  }
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  }
})

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;

  
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState(lightTheme);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<IncidentBrowser setTheme={setTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
            <Route path="/dashboard" element={<Dashboard setTheme={setTheme} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
