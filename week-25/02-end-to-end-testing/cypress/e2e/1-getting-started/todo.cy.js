/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Testing app', () => {
  beforeEach(() => {
    cy.visit('https://workstream.rakhshan.online/')
  })

  it('is able to log in', () => {
    cy.contains('Sign In').should('exist')
    cy.contains('Sign In').click()
    cy.contains('Sign in to WorkStream').should('exist', { timeout: 10000 })
    cy.get('#email').type('rakhshancoder@gmail.com');

    // Fill in the password field
    cy.get('#password').type('randomPassword');

    cy.get('button').click()

    cy.contains('Sign Out').should('exist', { timeout: 10000 })
  })

})
