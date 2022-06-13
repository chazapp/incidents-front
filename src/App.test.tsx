import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './routes/Login';
import IncidentBrowser from './routes/IncidentsBrowser';


test('renders the login page', () => {
  render(<Login />);
  const login = screen.getAllByText('Login')[0];
  expect(login).toBeInTheDocument();
});


test('renders the IncidentBrowser page', () => {
  render(<IncidentBrowser />);
  const incidentBrowser = screen.getAllByText('Incidents')[0];
  expect(incidentBrowser).toBeInTheDocument();
});