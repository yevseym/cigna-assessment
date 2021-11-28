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
// -- Testing Library commands for Cypress
import '@testing-library/cypress/add-commands';
//
// -- This is a parent command --
 Cypress.Commands.add("generateUUID", () => {
        let
          d = new Date().getTime(),
          d2 = (performance && performance.now && (performance.now() * 1000)) || 0
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          let r = Math.random() * 16
          if (d > 0) {
            r = (d + r) % 16 | 0
            d = Math.floor(d / 16)
          } else {
            r = (d2 + r) % 16 | 0
            d2 = Math.floor(d2 / 16)
          }
          return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
        })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
