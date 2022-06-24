/// <reference types="cypress" />

describe('Incidents App', () => {
  beforeEach(() => {
  });

  it('should redirect to login page', () => {
      cy.session("redirect", () => {
        cy.visit('/');
        cy.url().should('include', '/login');
      })
  });

  it('should be able to login', () => {
      cy.session("login", () => {
        cy.visit('/login');
        cy.get('[data-cy="login-email"]').type(Cypress.env("INCIDENTS_USER"));
        cy.get('[data-cy="login-password"]').type(Cypress.env("INCIDENTS_PASSWORD"));
        cy.get('[data-cy="login-submit"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/');
      });
  });
});