// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// cypress/support/e2e.js or cypress/support/index.js
Cypress.on('uncaught:exception', (err, runnable) => {
    // Log the error to the console for debugging
    console.error('Uncaught exception:', err);
  
    // Suppress the error and allow the test to continue
    // Return false to prevent Cypress from failing the test
    return false; 
  });
  