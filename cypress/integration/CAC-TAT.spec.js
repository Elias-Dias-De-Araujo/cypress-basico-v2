// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => cy.visit("./src/index.html"));
  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it.only("preenche os campos obrigatórios e envia formulário", () => {
    cy.get("#firstName").type("Claudia");
    cy.get("#lastName").type("Maria");
    cy.get("#email").type("Claudia@gmail.com");
    cy.get("#phone").type("88908930849");
    cy.get("#open-text-area").type("testando texto");
    cy.get(".button").click();
    cy.get(".success")
      .should("be.visible")
      .contains("Mensagem enviada com sucesso.");
  });
});
