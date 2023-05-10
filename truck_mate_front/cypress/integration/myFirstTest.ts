export {}
describe('My first Test', () => {
    it("visits the website", () => {
        cy.visit('/');
        cy.contains("Username");
        cy.contains("Password");
    })
})