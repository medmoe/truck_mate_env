export {}
describe('Authentication tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.contains('Username').should('be.visible');
    cy.contains('Password').should('be.visible');
  })
  it('should show the registration form and should register the user on submit', function () {
    cy.intercept('POST', 'http://localhost:8000/signup/', {
      statusCode: 200,
      body: {
        success: true,
        message: 'Registration successful'
      }
    }).as('registerAPI');
    cy.contains('Create account').should('be.visible').click();
    cy.contains('First name').should('be.visible');
    cy.get('#first_name').should('be.visible').type("first name");
    cy.contains('Last name').should('be.visible');
    cy.get('#last_name').should('be.visible').type('last name');
    cy.contains('Email').should('be.visible')
    cy.get('#email').should('be.visible').type('test@test.com');
    cy.contains('Username').should('be.visible');
    cy.get('#username').should('be.visible').type('username');
    cy.contains("Password").should('be.visible');
    cy.get("#password").should('be.visible').type("password");
    cy.contains("Renter password").should('be.visible');
    cy.get("#pass2").should('be.visible').type("password");
    cy.get("#submit_btn").should('be.visible').click()
    cy.wait('@registerAPI');
    cy.url().should('include', '/dashboard');
  })

})