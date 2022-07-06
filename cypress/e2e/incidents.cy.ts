/// <reference types="cypress" />

describe('Incidents CRUD', () => {

    // Recursively find an element in table
    function findIncidentInTable(incidentName: string): void {
        cy.wait(5000); // Dirty hack to wait for table to load in CI
        cy.get("[data-cy='incidents-table-linear-progress']").should('not.exist');
        cy.get("[data-cy='incident-table']").then((item) => {
            if (item.text().includes(incidentName)) {
                return;
            } else {
                cy.get("[aria-label='incident-table-next-page']").then((item) => {
                    if (!item.prop('disabled')) {
                        cy.get("[aria-label='incident-table-next-page']").click();
                        findIncidentInTable(incidentName);
                    } else {
                        throw new Error(`Could not find ${incidentName} in table`);
                    }
                })
            }
        })
    }

    it('should be able to create, update and delete an incident', () => {
            cy.session("CRUD Incident", () => {
                const email = Cypress.env("INCIDENTS_USER");
                const password = Cypress.env("INCIDENTS_PASSWORD");
                
                cy.login(email, password);
                // Create an incident
                cy.get("[data-cy=incident-add]").click();
                cy.get("[data-cy=incident-title-input]").type("Test Incident");
                cy.get("[data-cy=incident-severity-select]").click();
                cy.get("[data-cy=incident-severity-low]").click();
                cy.get("[data-cy=incident-status-select]").click();
                cy.get("[data-cy=incident-status-open]").click();
                cy.get("[data-cy=incident-description]").click()
                cy.get("[data-cy=incident-description-input]").type("Test Incident Description");
                cy.get("[data-cy=incident-submit]").click();
                // Assert the incident was created and is present in the table
                findIncidentInTable("Test Incident");
                // Update the incident
                cy.get("[data-cy=incident-table]").contains("Test Incident").click();
                cy.get("[data-cy=incident-edit-title]").click();
                cy.get("[data-cy=incident-title-input]").clear().type("Test Incident Updated");
                cy.get("[data-cy=incident-severity-select]").click();
                cy.get("[data-cy=incident-severity-medium]").click();
        });
    });
  });