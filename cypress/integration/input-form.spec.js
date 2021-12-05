// input-form.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" />

describe("Input form", () => {
  it("opens the site", () => {
    cy.visit("localhost:3000"); //this is the server that was started earlier
  });
});
