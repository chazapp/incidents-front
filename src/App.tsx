import React from 'react';
import './App.css';
import { Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Login from "./routes/Login";
import IncidentBrowser from './routes/IncidentsBrowser';
import axios from "axios";

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}



function App() {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="about" element={<About />} />
          <Route path="/" element={<IncidentBrowser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
