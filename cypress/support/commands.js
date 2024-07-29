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

// cypress/support/commands.js
Cypress.Commands.add('takeScreenshotOnSuccess', (name = 'screenshot') => {
    // Define the path where the screenshot will be saved
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const screenshotName = `${name}-${timestamp}`;
  
    // Use Cypress’s built-in screenshot functionality
    cy.screenshot(screenshotName, {
      capture: 'viewport', // You can capture full page, viewport or a specific element
      scale: true // Optionally scale the image to fit the viewport
    });
  });
  