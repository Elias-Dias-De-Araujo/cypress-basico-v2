// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />
import { faker } from "@faker-js/faker";

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
    user.email = "di@.com@";
    cy.fillMandatoryFieldsAndSubmitAndFail(user);
  });
  it("testing phone, only numbers", () => {
    cy.get("#phone").type("abcdefghijklmnopqrstuvxz!@#$%¨&*()_+=");
    cy.get("#phone").should("be.empty");
  });
  it("displays error message when phone becomes required but not filled in before form submission", () => {
    user.phone = " ";
    cy.get("#phone-checkbox").check();
    cy.fillMandatoryFieldsAndSubmitAndFail(user);
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
  it("displays error message when submitting the form without filling in the required fields", () => {
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
  it("selects a product by its text", () => {
    cy.get("#product").select("youtube");
    cy.get("#product").should("have.value", "youtube");

    cy.get("#product").select("mentoria");
    cy.get("#product").should("have.value", "mentoria");

    cy.get("#product").select("blog");
    cy.get("#product").should("have.value", "blog");
  });

  it("test type of service", () => {
    cy.get("#support-type input[type='radio']")
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check().should("be.checked");
      });
  });

  it("check both checkboxes, then uncheck the last one", () => {
    cy.get("#email-checkbox").check().should("be.checked");
    cy.get("#phone-checkbox").check().should("be.checked");

    cy.get("#check input[type='checkbox']")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("selects a file from the fixtures folder", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("selects a file simulating a drag-and-drop", () => {
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("selects a file using a fixture that has been given an alias", () => {
    cy.fixture("example.json").as("sampleExample");
    cy.get("input[type='file']#file-upload")
      .should("not.have.value")
      .selectFile("@sampleExample", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifies that the privacy policy opens in another tab without the need for a click", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("access the privacy policy page by removing the target and then clicking on the link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
  });
});
