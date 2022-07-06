import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './routes/Login';
import IncidentBrowser from './routes/IncidentsBrowser';
import { BrowserRouter, Router } from 'react-router-dom';
import App from './App';
import IncidentCard from './components/IncidentCard';
import { Incident } from '.';
import IncidentSearch from './components/IncidentSearch';
import PersistentDrawer from './components/Navigation';


test('renders the login page', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const login = screen.getAllByText('Login')[0];
  expect(login).toBeInTheDocument();
});

test('renders the incident card component', () => {
  const incident: Incident = {
    id: 1,
    title: 'Test Incident',
    description: "",
    status: 'Open',
    severity: 'Low',
    created_at: '2020-01-01',
    updated_at: '2020-01-01',
  };

  render(
    <IncidentCard 
      incident={incident}
      onCreate={() => {}}
      onUpdate={() => {}}
      onDelete={() => {}}
    />
  );
});

test('renders the incident search component', () => {
  render(
    <IncidentSearch
      setIncidents={() => {}}
      setIsLoading={() => {}}
    />
  )
})
