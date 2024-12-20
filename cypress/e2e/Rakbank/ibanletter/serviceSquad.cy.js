import { dashboard } from "../../../locators/dashboard";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking", () => {

  beforeEach(function () {
    cy.fixture('ibanData').as('ibanData'); // Load IBAN data fixture
    cy.visit("https://conv.rakbankonline.ae/corp6/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&USER_TYPE=1"); // Base URL already set in config
  });

  it("Login and check if IBAN Letter is Visible", function() {
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
    cy.get(serviceSquad.IBANLetter.css).should('be.visible');
   cy.takeStepScreenshot('IBAN_Letter_Visible'); // Final screenshot when IBAN Letter is visible
  });

  it("Request an IBAN Letter for Myself", function() {
    cy.login(this.ibanData.user.username, this.ibanData.user.password);
    cy.wait(4000)
   cy.takeStepScreenshot('Login_Success');
    cy.get(dashboard.Services.css).click();
   cy.takeStepScreenshot('Services_Clicked');
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(6000);
   cy.takeStepScreenshot('Banking_Requests_Clicked');   
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked');
    cy.get(serviceSquad.IBANLetter.css).click();
   cy.takeStepScreenshot('IBAN_Letter_Clicked'); 
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.Rc1.C2"]').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.SELECTED_INDEX_ARRAY"]').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').click();
   cy.takeStepScreenshot('Form_Submit_Clicked');
    cy.wait(1000);
    cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO_comboButton').click();

    // Force the selection of the "Myself" option even though the <select> is hidden
    cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO')
      .select('Myself', { force: true })  // Force selection on hidden element
      .should('have.value', 'Myself');
    // Continue with the rest of the form submission
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.CONTINUE.PROCESS_FORM_EVENT"]').should('be.visible').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.IBN_GENERAL_DETAILS.SUBMIT_ONLINE.PROCESS_FORM_EVENT"]').should('be.visible').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]').should('be.visible').click();
    cy.wait(6000);
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:PDF_DOWNLOAD"]').should('be.visible').click();
   cy.takeStepScreenshot('PDF_Download_Visible');
  });

  it("Request an IBAN Letter for Another Entity", function() {
    cy.login(this.ibanData.user.username, this.ibanData.user.password);
   cy.takeStepScreenshot('Login_Success');
   cy.wait(4000)
    cy.get(dashboard.Services.css).click();
   cy.takeStepScreenshot('Services_Clicked');
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(6000);
   cy.takeStepScreenshot('Banking_Requests_Clicked');   
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked');
    cy.get(serviceSquad.IBANLetter.css).click();
   cy.takeStepScreenshot('IBAN_Letter_Clicked');    
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.Rc1.C2"]').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.SELECTED_INDEX_ARRAY"]').click();
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').click();   
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO_comboButton"]').click({ force: true });
  
    // Select the option "Other entity" from the list
    cy.get('.ui-autocomplete').contains('Other entity').click({ force: true });
  
    // Iterate over each "Other Entity" to fill in the details
    this.ibanData.ibanOtherEntity.forEach((entity) => {
      // Ensure the entity name input field is ready before interaction
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]')
        .should('be.visible')
        .clear({ force: true }); // Clear the field first
  
      // Use a delay or wait for a specific condition if necessary
      cy.wait(100); // Adjust wait time as needed
  
      // Re-select the input before typing to ensure it's still in the DOM
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]').type(entity.entityName);
  
      // Repeat for address line 1
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE1"]')
        .should('be.visible')
        .clear({ force: true })
        .type(entity.addressLine1);
  
      // Repeat for address line 2
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE2"]')
        .should('be.visible')
        .clear({ force: true })
        .type(entity.addressLine2);
  
      // Handle dropdown selection for emirate
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]').click({ force: true });
      cy.get('.ui-autocomplete').contains(entity.emirate).click({ force: true });
  
      // Assert that the selected emirate is correctly reflected
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]')
        .should('have.value', entity.emirate);
        
    });
      // Continue with the submission process
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.CONTINUE.PROCESS_FORM_EVENT"]').click();
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.IBN_GENERAL_DETAILS.SUBMIT_ONLINE.PROCESS_FORM_EVENT"]').click();
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]').click();
      cy.wait(6000);
      
      // Check if PDF download is visible
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:PDF_DOWNLOAD"]').should('be.visible').click();
     cy.takeStepScreenshot('PDF_Download_Visible');
  
  
  });

  it("Valiadtion for MyRequests in Iban Letter", function(){
    cy.login(this.ibanData.user.username, this.ibanData.user.password);
   cy.takeStepScreenshot('Login_Success');
   cy.wait(6000);
    cy.get(dashboard.Services.css).click();
   cy.takeStepScreenshot('Services_Clicked');
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(6000);
   cy.takeStepScreenshot('Banking_Requests_Clicked');   
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked');
    cy.get(serviceSquad.IBANLetter.css).click();
   cy.takeStepScreenshot('IBAN_Letter_Clicked');    
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.Rc1.C2"]').click();
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.SELECTED_INDEX_ARRAY"]').click();
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').click();   
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO_comboButton"]').click({ force: true });
    
      // Select the option "Other entity" from the list
      cy.get('.ui-autocomplete').contains('Other entity').click({ force: true });
    
      // Iterate over each "Other Entity" to fill in the details
      this.ibanData.ibanOtherEntity.forEach((entity) => {
        // Ensure the entity name input field is ready before interaction
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]')
          .should('be.visible')
          .clear({ force: true }); // Clear the field first
    
        // Use a delay or wait for a specific condition if necessary
        cy.wait(100); // Adjust wait time as needed
    
        // Re-select the input before typing to ensure it's still in the DOM
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]').type("entity.entityName");
    
        // Repeat for address line 1
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE1"]')
          .should('be.visible')
          .clear({ force: true })
          .type(entity.addressLine1);
    
        // Repeat for address line 2
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE2"]')
          .should('be.visible')
          .clear({ force: true })
          .type(entity.addressLine2);
    
        // Handle dropdown selection for emirate
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]').click({ force: true });
        cy.get('.ui-autocomplete').contains(entity.emirate).click({ force: true });
    
        // Assert that the selected emirate is correctly reflected
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]')
          .should('have.value', entity.emirate);
    
      });
        // Continue with the submission process
        cy.get(serviceSquad.processForm.continue).should('be.visible').click();
        cy.get(serviceSquad.processForm.submitOnline).should('be.visible').click();
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]').click();
        cy.wait(6000);
        cy.get(serviceSquad.pdfDownload.css).should('be.visible').click();
       cy.takeStepScreenshot('PDF_Download_Visible');
    cy.wait(3000)
    cy.get(serviceSquad.Service.xpath).click();
    cy.wait(2000)
    cy.get(serviceSquad.myRequest.xpath).click()
})

});
