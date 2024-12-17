import { dashboard } from "../../../locators/dashboard";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking", () => {
  // Before each test, load the IBAN data fixture and navigate to the URL
  beforeEach(function () {
    cy.fixture('dbo').as('ibanData');
    cy.visit("https://conv.rakbankonline.ae/corp4/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&USER_TYPE=1"); // Base URL already set in config
  });

  it("Balance confirmation letter for myself", function() {
    cy.login(this.ibanData.user.username, this.ibanData.user.password);
    cy.wait(4000)
   cy.takeStepScreenshot('Login_Success'); // Screenshot after login   
    cy.get(dashboard.Services.css).click();
   cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(6000);
   cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked 
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL1"]').should('be.visible').click();
   cy.takeStepScreenshot('IBAN_Letter_Visible'); // Final screenshot when IBAN Letter is visible

   cy.wait(3000);
   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO"]')
   .select('Self', { force: true });
   cy.get('#PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT').click();
  });

  it("Balance confirmation letter for other Enitity", function() {

  });
  
});
