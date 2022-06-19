import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from "./routes/Login";
import IncidentBrowser from './routes/IncidentsBrowser';
import axios from "axios";
import Dashboard from './routes/Dashboard';

function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<IncidentBrowser menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
          <Route path="/dashboard" element={<Dashboard menuOpen={menuOpen} setMenuOpen={setMenuOpen} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
