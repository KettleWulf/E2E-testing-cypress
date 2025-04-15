/// <reference types="cypress" />


Cypress.Commands.add("getById", (selector) => {
	return cy.get(`[id="${selector}"]`);
});