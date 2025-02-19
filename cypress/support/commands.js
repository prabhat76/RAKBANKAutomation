import { loginPageLocators } from "../locators/loginpage";


Cypress.Commands.add('login', (username, password) => {
  if (!username || !password) {
    throw new Error('Username or password is undefined');
  }
  cy.get(loginPageLocators.usernameField.css).type(username)
  cy.get(loginPageLocators.passwordField.css).type(password)
  cy.get(loginPageLocators.loginButton.css).click()
});

Cypress.Commands.add('loginCorporate', (corporateID ,username, password) => {
  if (!corporateID || !username || !password) {
    throw new Error('Username or password is undefined');
  }
  cy.get('[id="AuthenticationFG.CUSTOM_CORP_ID"]').type(corporateID, { force: true });
  cy.get('[id="AuthenticationFG\.CUSTOM_USER_ID"]').type(username,{force: true});
  cy.get(loginPageLocators.passwordField.css).type(password)
  cy.get(loginPageLocators.loginButton.css).click()
});


// Cypress.Commands.add('takeStepScreenshot', (stepDescription) => {
//   const today = new Date();
//   const yyyy = today.getFullYear();
//   const mm = String(today.getMonth() + 1).padStart(2, '0');
//   const dd = String(today.getDate()).padStart(2, '0');
//   const hour = String(today.getHours()).padStart(2, '0');
//   const min = String(today.getMinutes()).padStart(2, '0');
//   const sec = String(today.getSeconds()).padStart(2, '0');

//   // Format the filename based on date and time
//   const timestamp = `${yyyy}-${mm}-${dd}_${hour}-${min}-${sec}`;
//   const filename = `${timestamp}_${stepDescription}`;

//   // Take the screenshot with the filename
//   cy.screenshot(filename);
// });

Cypress.Commands.add('takeStepScreenshot', (stepDescription) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const hour = String(today.getHours()).padStart(2, '0');
  const min = String(today.getMinutes()).padStart(2, '0');
  const sec = String(today.getSeconds()).padStart(2, '0');

  // Format the filename based on date and time
  const timestamp = `${yyyy}-${mm}-${dd}_${hour}-${min}-${sec}`;
  const filename = `${timestamp}_${stepDescription}`;

  // Get the current spec file name and the test case name
  const specName = Cypress.spec.name.replace('.js', ''); // Remove '.js' extension
  const testCaseName = Cypress.currentTest.title;

  // Define custom path with test scenario and test case name (e.g., "cypress/screenshots/testname/testcasename/")
  const screenshotPath = `/results/screenshots/${specName}/${testCaseName}/${filename}`;

  // Take the screenshot with the custom filename and path
  cy.screenshot(screenshotPath);
});


