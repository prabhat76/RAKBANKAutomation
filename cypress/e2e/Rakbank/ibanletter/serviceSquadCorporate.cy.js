import { dashboard } from "../../../locators/dashboard";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking", () => {

  beforeEach(function () {
    cy.fixture('ibanDatacorporate').as('ibanData'); // Load IBAN data fixture
    cy.visit("https://conv.rakbankonline.ae/corp6/AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&LANGUAGE_ID=001&CORP_USER_FLG=Y"); // Base URL already set in config
  });

  it("Login and check if IBAN Letter is Visible", function() {
    cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
   cy.takeStepScreenshot('Login_Success'); // Screenshot after login  
  cy.wait(4000) 
    cy.get(dashboard.Services.css).click();
   cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(6000);
   cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked 
    cy.get(serviceSquad.IBANLetter.css).should('be.visible');
   cy.takeStepScreenshot('IBAN_Letter_Visible'); // Final screenshot when IBAN Letter is visible
    cy.wait(1000);
  });

  it("Login and download IBAN Letter for myself", function() {
    cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
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

it("Login and download IBAN Letter for other Entity", function() {
  // Login
  cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
 cy.takeStepScreenshot('Login_Success');
 cy.wait(4000) 
  // Navigate to Services and Banking Requests
  cy.get(dashboard.Services.css).click();
 cy.takeStepScreenshot('Services_Clicked');
  cy.get(dashboard.bankingRequests.css).click();
  cy.wait(6000);
 cy.takeStepScreenshot('Banking_Requests_Clicked');   
  cy.get(dashboard.serviceSelector.css).should('be.visible').click();
 cy.takeStepScreenshot('Service_Selector_Clicked');
  cy.get(serviceSquad.IBANLetter.css).click();
 cy.takeStepScreenshot('IBAN_Letter_Clicked');    

  // Click on the necessary buttons to proceed
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




  it("Login and check myrequest ", function() {
    cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
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
        cy.get(serviceSquad.processForm.continue).should('be.visible').click();
        cy.get(serviceSquad.processForm.submitOnline).should('be.visible').click();
        cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]').click();
        cy.wait(6000);
        cy.get(serviceSquad.pdfDownload.css).should('be.visible').click();
       cy.takeStepScreenshot('PDF_Download_Visible');
    cy.wait(3000)
       cy.takeStepScreenshot('PDF_Download_Visible');

    cy.wait(3000)
    cy.get(serviceSquad.Service.xpath).click();
    cy.wait(2000)
    cy.get(serviceSquad.myRequest.xpath).click();
    cy.wait(1000)
  //   cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText')
  // .click();

  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText').click();

  // Ensure the dropdown is fully expanded and visible
  //cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID').should('be.visible');
  
  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID')
  // .invoke('show') // Force the dropdown to be visible
  // .select('IBAN LETTER'); 

  // Fill 'Reference ID'

  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText') // Replace with your dropdown element selector
  .click();

// Find the option "IBAN Letter" and select it from the dropdown
cy.get('.ui-autocomplete').contains('IBAN Letter').click();

// Validate that the dropdown now has the selected value
cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText')
  .should('have.value', 'IBAN Letter');


  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.BACKEND_REF_ID')
    .type('12010916');



  // Pick 'From' date
  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.FROM_DATE1')
  //   .type('01/01/2024'); // Assuming MM/DD/YYYY format

  // // Pick 'To' date
  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.TO_DATE1')
  //   .type('12/31/2024');

  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_STATUS_comboText') // Replace with your dropdown element selector
  .click();

// Find the option "Processed" and select it from the dropdown
cy.get('.ui-autocomplete').contains('Processed').click();

// Validate that the dropdown now has the selected value
cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_STATUS_comboText')
  .should('have.value', 'Processed');

  // Select 'Status' from dropdown
  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_STATUS_comboText')
  //   .click();
  // cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_STATUS option[value="SUC"]') // Selecting 'Processed'
  //   .click();

  // Submit the form
  // Select element with id "PageConfigurationMaster_RSRUX3W__1:SEARCH"
cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SEARCH')
.click(); // Or any other action you want to perform on the element

cy.get('#HREF_PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.REFERENCE_ID_ARRAY\\[0\\]')
.click(); // Perform the click or any other required action

  });


  it("Login and check myrequest and filter based on the reference no.", function(){
    cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
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
         cy.get(serviceSquad.processForm.continue).should('be.visible').click();
         cy.get(serviceSquad.processForm.submitOnline).should('be.visible').click();
         cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]').click();
         cy.wait(6000);
         cy.get(serviceSquad.pdfDownload.css).should('be.visible').click();
        cy.takeStepScreenshot('PDF_Download_Visible');
     cy.wait(3000)
        cy.takeStepScreenshot('PDF_Download_Visible');
 
     cy.wait(3000)
     cy.get(serviceSquad.Service.xpath).click();
     cy.wait(2000)
     cy.get(serviceSquad.myRequest.xpath).click();
     cy.wait(1000)
   
 
   cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText') // Replace with your dropdown element selector
   .click();
 
 // Find the option "IBAN Letter" and select it from the dropdown
 cy.get('.ui-autocomplete').contains('IBAN Letter').click();
 
 // Validate that the dropdown now has the selected value
 cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText')
   .should('have.value', 'IBAN Letter');
 
 
   cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.BACKEND_REF_ID')
     .type('12010916');
 
 
 
  // Pick 'From' date
  //  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.FROM_DATE1')
  //    .type('01/01/2024'); // Assuming MM/DD/YYYY format
 
  //  // Pick 'To' date
  //  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.TO_DATE1')
  //    .type('12/31/2024');
 
 cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SEARCH')
 .click(); // Or any other action you want to perform on the element
 
 cy.get('#HREF_PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.REFERENCE_ID_ARRAY\\[0\\]')
 .click(); // Perform the click or any other required action

 cy.wait(3000)
  })


  it("Login and check myrequest as per the date range", function(){
    cy.loginCorporate(this.ibanData.user.corporateID, this.ibanData.user.username, this.ibanData.user.password);
    cy.takeStepScreenshot('Login_Success');
    cy.wait(4000) 
     cy.get(dashboard.Services.css).click();
    cy.takeStepScreenshot('Services_Clicked');
     cy.get(dashboard.bankingRequests.css).click();
     cy.wait(6000);
    cy.takeStepScreenshot('Banking_Requests_Clicked');   
    
 
     cy.get(serviceSquad.myRequest.xpath).click();
     cy.wait(1000)
   
 
   cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText') // Replace with your dropdown element selector
   .click();
 
 // Find the option "IBAN Letter" and select it from the dropdown
 cy.get('.ui-autocomplete').contains('IBAN Letter').click();
 
 // Validate that the dropdown now has the selected value
 cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.RQST_ID_comboText')
   .should('have.value', 'IBAN Letter');
 
 
   cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.BACKEND_REF_ID')
     .type('12010916');
 
 
 cy.get('#PageConfigurationMaster_RSRUX3W__1\\:SEARCH')
 .click(); // Or any other action you want to perform on the element
 
 cy.get('#HREF_PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.REFERENCE_ID_ARRAY\\[0\\]')
 .click(); // Perform the click or any other required action

 cy.wait(3000)

  })
  
})