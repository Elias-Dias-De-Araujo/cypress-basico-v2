// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (user) => {
  cy.get("#firstName").should("be.visible").type(user.firstName);
  cy.get("#lastName").should("be.visible").type(user.lastName);
  cy.get("#email").should("be.visible").type(user.email, { delay: 10 });
  cy.get("#phone").should("be.visible").type(user.phone);
  cy.get("#open-text-area").should("be.visible").type(user.areaText);
  cy.sucessMessageClock();
});

Cypress.Commands.add("fillMandatoryFieldsAndSubmitAndFail", (user) => {
  cy.get("#firstName").should("be.visible").type(user.firstName);
  cy.get("#lastName").should("be.visible").type(user.lastName);
  cy.get("#email").should("be.visible").type(user.email, { delay: 10 });
  cy.get("#phone").should("be.visible").type(user.phone);
  cy.get("#open-text-area").should("be.visible").type(user.areaText);
  cy.failedMessageClock();
});

Cypress.Commands.add("sucessMessageClock", () => {
  cy.clock();
  cy.get(".button").should("be.visible").click();
  cy.get(".success")
    .should("be.visible")
    .contains("Mensagem enviada com sucesso.");
  cy.tick(3000);
  cy.get(".success").should("not.be.visible");
});

Cypress.Commands.add("failedMessageClock", () => {
  cy.clock();
  cy.get(".button").should("be.visible").click();
  cy.get(".error")
    .should("be.visible")
    .contains("Valide os campos obrigatórios!");
  cy.tick(3000);
  cy.get(".error").should("not.be.visible");
});
