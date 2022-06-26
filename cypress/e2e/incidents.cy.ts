/// <reference types="cypress" />

describe('Incidents CRUD', () => {
    it('should be able to create, update and delete an incident', () => {
            cy.session("CRUD Incident", () => {
                const email = Cypress.env("INCIDENTS_USER");
            const password = Cypress.env("INCIDENTS_PASSWORD");
            
            cy.login(email, password);
            cy.get("[data-cy=incident-add]").click();
            cy.get("[data-cy=incident-title-input]").type("Test Incident");
            cy.get("[data-cy=incident-severity-select]").click();
            cy.get("[data-cy=incident-severity-low]").click();
            cy.get("[data-cy=incident-status-select]").click();
            cy.get("[data-cy=incident-status-open]").click();
            cy.get("[data-cy=incident-description]").click()
            cy.get("[data-cy=incident-description-input]").type("Test Incident Description");
            cy.get("[data-cy=incident-submit]").click();
        });
    });
  });