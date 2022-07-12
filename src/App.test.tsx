import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './routes/Login';
import { BrowserRouter } from 'react-router-dom';
import IncidentCard from './components/IncidentCard';
import { Incident } from './index.d';
import IncidentSearch from './components/IncidentSearch';
import IncidentTable from './components/IncidentTable';


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
    created_at: new Date('2020-01-01'),
    updated_at: new Date('2020-01-01'),
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
      onSearch={() => {}}
    />
  )
});

test('renders the incident table component', () => {
  const incidents: Incident[] = [
    {
      id: 1,
      title: 'Test Incident',
      description: "",
      status: 'Open',
      severity: 'Low',
      created_at: new Date('2020-01-01'),
      updated_at: new Date('2020-01-01'),
    },
    {
      id: 2,
      title: 'Test Incident',
      description: "",
      status: 'Open',
      severity: 'Low',
      created_at: new Date('2020-01-01'),
      updated_at: new Date('2020-01-01'),
    },
  ];

  render(
    <IncidentTable
      rows={incidents}
      onSelect={() => {}}
      isLoading={false}
      pagination={{
          page: 1,
          rowsPerPage: 10,
          setPage: () => {},
          setRowsPerPage: () => {},
          totalRows: 2,
      }}
    />
  )
});
