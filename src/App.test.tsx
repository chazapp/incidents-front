import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './routes/Login';
import IncidentBrowser from './routes/IncidentsBrowser';
import { BrowserRouter } from 'react-router-dom';
import App from './App';


test('renders the login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const login = screen.getAllByText('Login')[0];
  expect(login).toBeInTheDocument();
});
