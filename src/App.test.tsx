import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './routes/Login';
import IncidentBrowser from './routes/IncidentsBrowser';
import { BrowserRouter } from 'react-router-dom';


test('renders the login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const login = screen.getAllByText('Login')[0];
  expect(login).toBeInTheDocument();
});


test('renders the IncidentBrowser page', () => {
  const [open, setOpen] = React.useState(false);

  render(
  <BrowserRouter>
    <IncidentBrowser  menuOpen={open} setMenuOpen={setOpen}/>
  </BrowserRouter>);
  const incidentBrowser = screen.getAllByText('Incidents')[0];
  expect(incidentBrowser).toBeInTheDocument();
});