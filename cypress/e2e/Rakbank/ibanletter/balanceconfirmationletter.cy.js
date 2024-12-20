import { dashboard } from "../../../locators/dashboard";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking", () => {
  // Before each test, load the IBAN data fixture and navigate to the URL
  beforeEach(function () {
    cy.fixture('dbo').as('ibanData');
    cy.visit("https://conv.rakbankonline.ae/corp4/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&USER_TYPE=1"); // Base URL already set in config
  });

  it("Balance confirmation letter for myself and Delivery by Email", function() {


    cy.login(this.ibanData.user.username, this.ibanData.user.password);
    cy.wait(4000)
   cy.takeStepScreenshot('Login_Success'); // Screenshot after login 
   cy.wait(6000);  
    cy.get(dashboard.Services.css).click();
   //cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
   cy.wait(5000);
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(5000);
   cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.get(dashboard.serviceSelector.css).should('be.visible').click();
   cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL1"]').should('be.visible').click();
   cy.takeStepScreenshot('Balance confirmation letter visible'); // Final screenshot when IBAN Letter is visible
 
   cy.wait(3000);
   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO"]')
   .select('Self', { force: true })
   .should('have.value', 'Self'); ;
   cy.takeStepScreenshot('Selected the Address to as Self'); //
   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT"]').should('be.visible').click(); //Clicked Continue button
   cy.takeStepScreenshot('Clicked on contiinue button');
    cy.wait(5000);
  
    //Navigated to Second screen
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.R2.C1"]').should('be.visible').click(); //Selected Delievery method By Email option
    cy.takeStepScreenshot('Selected Delievery method by Email');
    cy.wait(7000);
    //cy.get(serviceSquad.payFrom.css).should('be.visible').click({force: true}); //Selected Pay from option
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2 > .ddssearchbuttonnew').click({force: true});
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2 > .labelColumn > #PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.PAY_ACCOUNT_NUMBER').click();
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Rowset10 > #PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1 > #PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2').click();
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2 > .rakFileUpldBtnwpsIBN').click({force:true});
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2 > .rakFileUpldBtnwpsIBN').click();
    //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Ra1\.C2 > .labelColumn').click({force:true});

    cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
    cy.wait(5000);
    cy.takeStepScreenshot('Clicked on pay from option');
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]"]').should('be.visible').click(); //Account number selected
    cy.takeStepScreenshot('Account number selected');
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG"]').should('be.visible').click(); //Selected the Terms and conditions checkbox
    cy.takeStepScreenshot('Terms & conditions checkbox selected');

  });

//   it("Balance confirmation letter for myself and Delivery by Courier", function() {
//     cy.login(this.ibanData.user.username, this.ibanData.user.password);
//     cy.wait(4000)
//    cy.takeStepScreenshot('Login_Success'); // Screenshot after login  
//    //cy.get('#ID_RGNS').trigger('mouseover').should('be.visible').and('contain','Services'); //Mouseover on Services
//   cy.get(dashboard.Services.css).click({force: true});
//   //cy.get('[id="ID_RGNS"]').should('be.visible').click();
//   cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
//    cy.get(dashboard.bankingRequests.css).click();
//    cy.get('[id="Banking-Requests_Banking-Requests"').should('be.visible').click();
//     cy.wait(6000);
//    cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
//     cy.get(dashboard.serviceSelector.css).should('be.visible').click();
//    cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked 
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL1"]').should('be.visible').click();
//    cy.takeStepScreenshot('BALANCE_CONFIRMATION_LETTER_Visible'); // Final screenshot when IBAN Letter is visible

//    cy.wait(3000);
//    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO"]')
//    .select('Self', { force: true }).   // Force selection on hidden element
//    should('have.value', 'Self'); 
//    cy.get('#PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT').should('be.visible').click(); //Clicked Continue button
//     //Navigated to Second screen
//     cy.get('.null > #PageConfigurationMaster_RSRUX3W__1\:DELIVERY_METHOD').should('be.visible').click(); //Selected Delievery method By Courier option
//     cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
//     cy.wait(3000);
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]').should('be.visible').click(); //Account number selected
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG').should('be.visible').click(); //Selected the Terms and conditions checkbox

    
//   });

//   it("Balance confirmation letter for Other Entity and Delivery by Email", function() {

//     cy.login(this.ibanData.user.username, this.ibanData.user.password);
//     cy.wait(4000)
//    cy.takeStepScreenshot('Login_Success'); // Screenshot after login  
//    //cy.get('#ID_RGNS').trigger('mouseover').should('be.visible').and('contain','Services'); //Mouseover on Services
//   cy.get(dashboard.Services.css).click({force: true});
//   //cy.get('[id="ID_RGNS"]').should('be.visible').click();
//   cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
//    cy.get(dashboard.bankingRequests.css).click();
//    cy.get('[id="Banking-Requests_Banking-Requests"').should('be.visible').click();
//     cy.wait(6000);
//    cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
//     cy.get(dashboard.serviceSelector.css).should('be.visible').click();
//    cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked 
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL1"]').should('be.visible').click();
//    cy.takeStepScreenshot('BALANCE_CONFIRMATION_LETTER_Visible'); // Final screenshot when IBAN Letter is visible

//    cy.wait(3000);
//   //  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO"]')
//   //  .select('Other entity', { force: true }).   // Force selection on hidden element
//   //  should('have.value', 'Other entity');

//   // Select the option "Other entity" from the list
//   cy.get('.ui-autocomplete').contains('Other entity').click({ force: true });
  
//   // Iterate over each "Other Entity" to fill in the details
//   this.ibanData.ibanOtherEntity.forEach((entity) => {
//     // Ensure the entity name input field is ready before interaction
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]')
//       .should('be.visible')
//       .clear({ force: true }); // Clear the field first

//     // Use a delay or wait for a specific condition if necessary
//     cy.wait(100); // Adjust wait time as needed

//     // Re-select the input before typing to ensure it's still in the DOM
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]').type(entity.entityName);

//     // Repeat for address line 1
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE1"]')
//       .should('be.visible')
//       .clear({ force: true })
//       .type(entity.addressLine1);

//     // Repeat for address line 2
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE2"]')
//       .should('be.visible')
//       .clear({ force: true })
//       .type(entity.addressLine2);

//     // Handle dropdown selection for emirate
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]').click({ force: true });
//     cy.get('.ui-autocomplete').contains(entity.emirate).click({ force: true });

//     // Assert that the selected emirate is correctly reflected
//     cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]')
//       .should('have.value', entity.emirate);    
//   });

//   cy.get('#PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT').should('be.visible').click(); //Clicked Continue button

//      //Navigated to Second screen
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.DELIVERY_METHOD').should('be.visible').click(); //Selected Delievery method By Email option
//     cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
//     cy.wait(3000);
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]').should('be.visible').click(); //Account number selected
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG').should('be.visible').click(); //Selected the Terms and conditions checkbox
// })

// });

// it("Balance confirmation letter for Other Entity and Delivery by Courier", function() {

//   cy.login(this.ibanData.user.username, this.ibanData.user.password);
//   cy.wait(4000)
//  cy.takeStepScreenshot('Login_Success'); // Screenshot after login  
//  //cy.get('#ID_RGNS').trigger('mouseover').should('be.visible').and('contain','Services'); //Mouseover on Services
// cy.get(dashboard.Services.css).click({force: true});
// //cy.get('[id="ID_RGNS"]').should('be.visible').click();
// cy.takeStepScreenshot('Services_Clicked'); // Screenshot after clicking Services   
//  cy.get(dashboard.bankingRequests.css).click();
//  cy.get('[id="Banking-Requests_Banking-Requests"').should('be.visible').click();
//   cy.wait(6000);
//  cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
//   cy.get(dashboard.serviceSelector.css).should('be.visible').click();
//  cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked 
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL1"]').should('be.visible').click();
//  cy.takeStepScreenshot('BALANCE_CONFIRMATION_LETTER_Visible'); // Final screenshot when IBAN Letter is visible

//  cy.wait(3000);
// //  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO"]')
// //  .select('Other entity', { force: true }).   // Force selection on hidden element
// //  should('have.value', 'Other entity');

// // Select the option "Other entity" from the list
// cy.get('.ui-autocomplete').contains('Other entity').click({ force: true });

// // Iterate over each "Other Entity" to fill in the details
// this.ibanData.ibanOtherEntity.forEach((entity) => {
//   // Ensure the entity name input field is ready before interaction
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]')
//     .should('be.visible')
//     .clear({ force: true }); // Clear the field first

//   // Use a delay or wait for a specific condition if necessary
//   cy.wait(100); // Adjust wait time as needed

//   // Re-select the input before typing to ensure it's still in the DOM
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ENTITY_NAME"]').type(entity.entityName);

//   // Repeat for address line 1
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE1"]')
//     .should('be.visible')
//     .clear({ force: true })
//     .type(entity.addressLine1);

//   // Repeat for address line 2
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_LINE2"]')
//     .should('be.visible')
//     .clear({ force: true })
//     .type(entity.addressLine2);

//   // Handle dropdown selection for emirate
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]').click({ force: true });
//   cy.get('.ui-autocomplete').contains(entity.emirate).click({ force: true });

//   // Assert that the selected emirate is correctly reflected
//   cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.EMIRATE_comboText"]')
//     .should('have.value', entity.emirate);    
// });

// cy.get('#PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT').should('be.visible').click(); //Clicked Continue button


//     cy.get('.null > #PageConfigurationMaster_RSRUX3W__1\:DELIVERY_METHOD').should('be.visible').click(); //Selected Delievery method By courier option
//     cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
//     cy.wait(3000);
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]').should('be.visible').click(); //Account number selected
//     cy.get('#PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG').should('be.visible').click(); //Selected the Terms and conditions checkbox
})
