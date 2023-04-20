// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
import { faker } from "@faker-js/faker";
/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  const user = {};
  beforeEach(() => {
    cy.visit("./src/index.html");
    user.firstName = faker.name.firstName();
    user.lastName = faker.name.lastName();
    user.email = faker.internet.exampleEmail(user.firstName, user.lastName);
    user.phone = faker.phone.number();
    user.areaText = faker.lorem.paragraph();
  });
  it("verify aplication title", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });
  it("fill require fields and send form", () => {
    cy.get("#firstName").type("Claudia");
    cy.get("#lastName").type("Maria");
    cy.get("#email").type("Claudia@gmail.com", { delay: 10 });
    cy.get("#phone").type("88908930849");
    cy.get("#open-text-area").type("testando texto");
    cy.get(".button").click();
    cy.get(".success")
      .should("be.visible")
      .contains("Mensagem enviada com sucesso.");
  });
  it("show error message in send form when email formatation is wrong", () => {
    cy.get("#firstName").type("Claudia");
    cy.get(".button").click();
    cy.get(".error")
      .should("be.visible")
      .contains("Valide os campos obrigatórios!");
  });
  it("testing phone, only numbers", () => {
    cy.get("#phone").type("abcdefghijklmnopqrstuvxz!@#$%¨&*()_+=");
    cy.get("#phone").should("be.empty");
  });
  it("displays error message when phone becomes required but not filled in before form submission", () => {
    cy.get("#firstName").type("Claudia");
    cy.get("#lastName").type("Maria");
    cy.get("#email").type("Claudia@gmail.com", { delay: 10 });
    cy.get("#open-text-area").type("testando texto");
    cy.get("#phone-checkbox").click();
    cy.get(".button").click();
    cy.get(".error")
      .should("be.visible")
      .contains("Valide os campos obrigatórios!");
  });
  it("fill in and clear the first name, last name, email and phone fields", () => {
    cy.get("#firstName").type("Claudia").should("have.value", "Claudia");
    cy.get("#firstName").clear().should("have.value", "");

    cy.get("#lastName").type("Maria").should("have.value", "Maria");
    cy.get("#lastName").clear().should("have.value", "");

    cy.get("#email")
      .type("Claudia@gmail.com")
      .should("have.value", "Claudia@gmail.com");
    cy.get("#email").clear().should("have.value", "");

    cy.get("#phone").type("88908930849").should("have.value", "88908930849");
    cy.get("#phone").clear().should("have.value", "");

    cy.get("#open-text-area")
      .type("testando texto")
      .should("have.value", "testando texto");
    cy.get("#open-text-area").clear().should("have.value", "");
  });
  it.only("displays error message when submitting the form without filling in the required fields", () => {
    user.firstName = " ";
    user.lastName = " ";
    user.email = " ";
    user.phone = " ";
    user.areaText = " ";
    cy.fillMandatoryFieldsAndSubmitAndFail(user);
  });
  it("successfully submit the form using a custom command", () => {
    cy.fillMandatoryFieldsAndSubmit(user);
  });
});
