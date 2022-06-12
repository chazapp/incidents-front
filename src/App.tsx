import React from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Login from "./routes/Login";
import IncidentBrowser from './routes/IncidentsBrowser';


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
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="/" element={<IncidentBrowser />} />
      </Routes>
    </div>
  );
}

export default App;
