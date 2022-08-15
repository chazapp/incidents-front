/// <reference types="cypress" />

describe('Dashboard', () => {
    it("Displays the number of incidents", () => {
        cy.session("Dashboard", () => {
            const email = Cypress.env("INCIDENTS_USER");
            const password = Cypress.env("INCIDENTS_PASSWORD");

            cy.login(email, password);

            cy.get("[data-cy=nav-menu]").click();
            cy.get("[data-cy=nav-dashboard]").click();

            cy.get("[data-cy=incident-count]").should("exist");
        });
    });
    it("Can switch the application theme", () => {
        cy.session("Theme Switcher", () => {
            const email = Cypress.env("INCIDENTS_USER");
            const password = Cypress.env("INCIDENTS_PASSWORD");

            cy.login(email, password);
            cy.get("[data-cy=nav-menu]").click();
            cy.get("[data-cy=nav-dashboard]").click();

            // Find theme color now
         
            cy.get("[data-cy=theme-switcher]").click();
            // assert color changed
            cy.get("[data-cy=nav-incidents]").click();
            // assert color still the same
        });
    })
});
