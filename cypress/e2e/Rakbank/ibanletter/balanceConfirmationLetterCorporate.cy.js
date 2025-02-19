import { dashboard } from "../../../locators/dashboard";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking - Balance Confirmation Letter Request", () => {
  // Before each test, load the IBAN data fixture and navigate to the URL
  beforeEach(function () {
    cy.fixture('balanceConfirmationLetterCorporate').as('balanceConfirmationLetter');
    cy.visit("https://conv.rakbankonline.ae/corp3/AuthenticationController?__START_TRAN_FLAG__=Y&FORMSGROUP_ID__=AuthenticationFG&__EVENT_ID__=LOAD&FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&LANGUAGE_ID=001&CORP_USER_FLG=Y");
  });

    it("Balance confirmation letter for myself and Delivery by Email", function() {
      cy.loginCorporate(this.balanceConfirmationLetter.user.corporateID, this.balanceConfirmationLetter.user.username, 
          this.balanceConfirmationLetter.user.password);
      cy.wait(3000);
     cy.takeStepScreenshot('Login_Success'); // Screenshot after login 
     cy.get(dashboard.Services.css).click();
     cy.wait(3000);
      cy.get(dashboard.bankingRequests.css).click();
      cy.wait(5000);
     cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
      cy.get(dashboard.serviceSelector.css).should('be.visible').click();
     cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked
      cy.get(dashboard.accountsSelector.balanceConfirmation.css).should('be.visible').click();
     cy.takeStepScreenshot('Balance confirmation letter visible'); // Final screenshot when IBAN Letter is visible
     cy.wait(3000);
     cy.get(serviceSquad.balanceConfirmationaddress.css)
     .select("Self", { force: true })
     .should('have.value', "Self"); 
     cy.takeStepScreenshot('Selected the Address to as Self'); //
    //  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.CONFIRM_BALANCE_AS_OF_DATE_comboText"]').click()
    //  .type('31/12/2024',{force: true})
    //  .should('have.value', '31/12/2024');
    //  cy.get('selector-for-dropdown-options')
    // .contains('YourOption') // Adjust the selector for your dropdown list
    // .click();
    cy.get(serviceSquad.balanceasof.css).click(); // Click the dropdown button to display options

  // Select the desired option (31/12/2024)
  cy.get('.ui-autocomplete') // Adjust this selector to match the dropdown list container
    .contains('31/12/2024') // Find the option with the date
    .click(); // Click to select the date

  // Assert the input has been updated with the selected value
  cy.get(serviceSquad.selectedDate.css)
    .should('have.value', '31/12/2024'); // Confirm the selected date

     //cy.get(serviceSquad.balanceasof.css).should('be.visible').click(); //Clicked Continue button
     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT"]').should('be.visible').click(); //Clicked Continue button
     cy.takeStepScreenshot('Clicked on contiinue button');
      cy.wait(3000);

      //Navigated to Second screen
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.R2.C1"]').should('be.visible').click(); //Selected Delievery method By Email option
      cy.takeStepScreenshot('Selected Delievery method by Email');
      cy.wait(3000);


      cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
      cy.wait(3000);
      cy.takeStepScreenshot('Clicked on pay from option');
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]"]').should('be.visible').click(); //Account number selected

      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG"]').should('be.visible').click(); //Selected the Terms and conditions checkbox

      cy.wait(4000);

      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.BCL_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT"]').scrollIntoView();
      cy.wait(4000);

      cy.wait(4000);
      cy.get('[name="Action.PROCESS_FORM_EVENT::Y--FormManagementFG.REQUEST_ID::BCL_INITIATE--FormManagementFG.SECTION_NAME::BCL_GENERAL_DETAILS--FormManagementFG.ACTION_ID::SUBMIT_ONLINE--FormManagementFG.REQUEST_MODE::O"]').click();  //Clicked on continue button
      cy.takeStepScreenshot('Clicked on continue button');

      //Navigated to third screen

      cy.contains("You can't change the details once you submit, so make sure you've entered the right information.").should('exist');

      cy.takeStepScreenshot('Validated Review and submit page');

      cy.wait(8000);

      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT"]')
    .scrollIntoView()
    .click();
cy.wait(2000);
    //Navigated to fourth screen
    cy.get('#PageConfigurationMaster_RSRUX3W__1\:BACK_TO_PARENT_FG').click();
    //Validation after submission of Balance confirmation letter
cy.wait(3000);
    cy.get('[id="ID_CACUX3"]').should('be.visible').click();
    cy.takeStepScreenshot('Navigated to Overview screen');
    cy.get(dashboard.Services.css).click();
    cy.wait(3000);
    cy.takeStepScreenshot('Clicked on Services');
     cy.get(dashboard.bankingRequests.css).click();
     cy.wait(3000);
    //cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.wait(3000);
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:QRY_REQUEST"]').should('be.visible').click(); // Clicked on New request
    cy.wait(4000);
    cy.wait(3000);


    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('Balance Confirmation Letter'); //Passing Balance confirmation letter text in Request type
    cy.wait(3000);
    cy.takeStepScreenshot('Filtered balance confirmation letter in Request type');
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{downarrow}') // CLiked on down arrow in request type
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{enter}'); //Clicked on Enter in request type
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:SEARCH"]').click(); //Clicked on search after filterin
    //cy.takeStepScreenshot('Clicked on search button')

    })


    it("Balance confirmation letter for myself and Delivery by Email", function() {


      cy.loginCorporate(this.balanceConfirmationLetter.user.corporateID, this.balanceConfirmationLetter.user.username, 
          this.balanceConfirmationLetter.user.password);
      cy.wait(3000);
    // cy.takeStepScreenshot('Login_Success'); // Screenshot after login 
     cy.get(dashboard.Services.css).click();
     cy.wait(3000);
      cy.get(dashboard.bankingRequests.css).click();
      cy.wait(5000);
     cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
      cy.get(dashboard.accountsSelector.css).should('be.visible').click();
     cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked
      cy.get(dashboard.accountsSelector.balanceConfirmation.css).should('be.visible').click();
     cy.takeStepScreenshot('Balance confirmation letter visible'); // Final screenshot when IBAN Letter is visible
     cy.wait(3000);
     cy.get(serviceSquad.balanceConfirmationaddress.css)
     .select("Other entity", { force: true })
     .should('have.value', "Other entity"); 
     cy.takeStepScreenshot('Selected the Address to as Other Enity'); //
     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ENTITY_NAME"]').type('Test Entity',{force: true});
     // Click on the input to activate the dropdown
  // Step 1: Click the input to activate the dropdown
  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.EMIRATE_comboText').click();

  // Step 2: Type "Dubai" into the input field
  cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.EMIRATE_comboText')
    .clear() // Clear existing value if necessary
    .type('Dubai'); // Type the desired value


     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE1"]').type('Test Address',{force: true});
     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE2"]').type('Test Address',{force: true});
    cy.get(serviceSquad.balanceasof.css).click(); // Click the dropdown button to display options

  cy.get('.ui-autocomplete') // Adjust this selector to match the dropdown list container
    .contains('31/12/2024') // Find the option with the date
    .click(); // Click to select the date

  // Assert the input has been updated with the selected value
  cy.get(serviceSquad.selectedDate.css)
    .should('have.value', '31/12/2024'); // Confirm the selected date

     //cy.get(serviceSquad.balanceasof.css).should('be.visible').click(); //Clicked Continue button
     cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT"]').should('be.visible').click(); //Clicked Continue button
     cy.takeStepScreenshot('Clicked on contiinue button');
      cy.wait(3000);

      //Navigated to Second screen
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:DisplayForm.R2.C1"]').should('be.visible').click(); //Selected Delievery method By Email option
      cy.takeStepScreenshot('Selected Delievery method by Email');
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ENTITY_EMAIL1"]').type('test@gmail.com',{force: true});
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ENTITY_EMAIL2"]').type('test@gmail.com',{force: true});
      cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
      cy.wait(3000);
      cy.takeStepScreenshot('Clicked on pay from option');
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]"]').should('be.visible').click(); //Account number selected

      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG"]').should('be.visible').click(); //Selected the Terms and conditions checkbox

      cy.wait(4000);

      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.BCL_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT"]').scrollIntoView();
      cy.wait(4000);

      cy.wait(4000);
      cy.get('[name="Action.PROCESS_FORM_EVENT::Y--FormManagementFG.REQUEST_ID::BCL_INITIATE--FormManagementFG.SECTION_NAME::BCL_GENERAL_DETAILS--FormManagementFG.ACTION_ID::SUBMIT_ONLINE--FormManagementFG.REQUEST_MODE::O"]').click();  //Clicked on continue button
      cy.takeStepScreenshot('Clicked on continue button');

      //Navigated to third screen

      cy.contains("You can't change the details once you submit, so make sure you've entered the right information.").should('exist');

      cy.takeStepScreenshot('Validated Review and submit page');

      cy.wait(8000);

    //   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT"]')
    // .scrollIntoView();
    //.click();

    //Navigated to fourth screen


    //Validation after submission of Balance confirmation letter

    cy.get('[id="ID_CACUX3"]').should('be.visible').click();
    cy.takeStepScreenshot('Navigated to Overview screen');
    cy.get(dashboard.Services.css).click();
    cy.wait(3000);
    cy.takeStepScreenshot('Clicked on Services');
     cy.get(dashboard.bankingRequests.css).click();
     cy.wait(3000);
    //cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.wait(3000);
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:QRY_REQUEST"]').should('be.visible').click(); // Clicked on New request
    cy.wait(4000);
    cy.wait(3000);


    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('Balance Confirmation Letter'); //Passing Balance confirmation letter text in Request type
    cy.wait(3000);
    cy.takeStepScreenshot('Filtered balance confirmation letter in Request type');
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{downarrow}') // CLiked on down arrow in request type
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{enter}'); //Clicked on Enter in request type
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:SEARCH"]').click(); //Clicked on search after filterin
    //cy.takeStepScreenshot('Clicked on search button')

    })

  it("Balance confirmation letter for myself and Delivery by branch", function () {
    cy.loginCorporate(this.balanceConfirmationLetter.user.corporateID, this.balanceConfirmationLetter.user.username,
      this.balanceConfirmationLetter.user.password);
    cy.wait(3000);
    // cy.takeStepScreenshot('Login_Success'); // Screenshot after login 
    cy.get(dashboard.Services.css).click();
    cy.wait(3000);
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(5000);
    cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.get(dashboard.accountsSelector.css).should('be.visible').click();
    cy.takeStepScreenshot('Service_Selector_Clicked'); // Screenshot after Service Selector clicked
    cy.get(dashboard.accountsSelector.balanceConfirmation.css).should('be.visible').click();
    cy.takeStepScreenshot('Balance confirmation letter visible'); // Final screenshot when IBAN Letter is visible
    cy.wait(3000);
    cy.get(serviceSquad.balanceConfirmationaddress.css)
      .select("Other entity", { force: true })
      .should('have.value', "Other entity");
    cy.takeStepScreenshot('Selected the Address to as Other Enity'); //
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ENTITY_NAME"]').type('Test Entity', { force: true });
    // Click on the input to activate the dropdown
    // Step 1: Click the input to activate the dropdown
    cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.EMIRATE_comboText').click();

    // Step 2: Type "Dubai" into the input field
    cy.get('#PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.EMIRATE_comboText')
      .clear() // Clear existing value if necessary
      .type('Dubai'); // Type the desired value


    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE1"]').type('Test Address', { force: true });
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE2"]').type('Test Address', { force: true });
    cy.get(serviceSquad.balanceasof.css).click(); // Click the dropdown button to display options

    cy.get('.ui-autocomplete') // Adjust this selector to match the dropdown list container
      .contains('31/12/2024') // Find the option with the date
      .click(); // Click to select the date

    // Assert the input has been updated with the selected value
    cy.get(serviceSquad.selectedDate.css)
      .should('have.value', '31/12/2024'); // Confirm the selected date

    //cy.get(serviceSquad.balanceasof.css).should('be.visible').click(); //Clicked Continue button
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT"]').should('be.visible').click(); //Clicked Continue button
    cy.takeStepScreenshot('Clicked on contiinue button');
    cy.wait(3000);

    // Step 1: Locate the radio button for "Collect from branch" by its ID and click it

    cy.get('input[type="radio"][value="B"]')
      .should('exist') // Ensure the element exists
      .click({ force: true }); // Click to select it

    // Assert that the third option is selected
    cy.get('input[type="radio"][value="B"]').should('be.checked');

    // Optionally, verify related text appears correctly
    cy.contains('Collect from branch').should('be.visible');
    cy.contains('Total fees: AED 105.00 (including VAT)').should('be.visible');

    cy.takeStepScreenshot('Selected Delievery method by branch');
    cy.wait(3000);
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.BRANCH_DELIVERY_EMIRATE_comboText"]').clear().type('Dubai', { force: true });
    //  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.BRANCH_DELIVERY_BRANCH_comboText"]').clear().wait(500)

    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.BRANCH_DELIVERY_BRANCH_comboText"]').clear().wait(2000).type('Dragon Mart Branch', { force: true }).select('Dragon Mart Branch');
    cy.wait(5000);
    cy.get('[name="Action.CustomAcctListFG.LOOK_UP__"]').eq(1).click();  //Selected Pay from option
    cy.wait(3000);

    cy.takeStepScreenshot('Clicked on pay from option');
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY\[0\]"]').should('be.visible').click(); //Account number selected

    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.T_AND_C_FLAG"]').should('be.visible').click(); //Selected the Terms and conditions checkbox

    cy.wait(4000);

    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.BCL_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT"]').scrollIntoView();
    cy.wait(4000);

    cy.wait(4000);
    cy.get('[name="Action.PROCESS_FORM_EVENT::Y--FormManagementFG.REQUEST_ID::BCL_INITIATE--FormManagementFG.SECTION_NAME::BCL_GENERAL_DETAILS--FormManagementFG.ACTION_ID::SUBMIT_ONLINE--FormManagementFG.REQUEST_MODE::O"]').click();  //Clicked on continue button
    cy.takeStepScreenshot('Clicked on continue button');

    //Navigated to third screen

    cy.contains("You can't change the details once you submit, so make sure you've entered the right information.").should('exist');

    cy.takeStepScreenshot('Validated Review and submit page');

    cy.wait(8000);

    //   cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:BCL_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT"]')
    // .scrollIntoView();
    //.click();

    //Navigated to fourth screen


    //Validation after submission of Balance confirmation letter

    cy.get('[id="ID_CACUX3"]').should('be.visible').click();
    cy.takeStepScreenshot('Navigated to Overview screen');
    cy.get(dashboard.Services.css).click();
    cy.wait(3000);
    cy.takeStepScreenshot('Clicked on Services');
    cy.get(dashboard.bankingRequests.css).click();
    cy.wait(3000);
    //cy.takeStepScreenshot('Banking_Requests_Clicked'); // Screenshot after clicking Banking Requests
    cy.wait(3000);
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1:QRY_REQUEST"]').should('be.visible').click(); // Clicked on New request
    cy.wait(4000);
    cy.wait(3000);


    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('Balance Confirmation Letter'); //Passing Balance confirmation letter text in Request type
    cy.wait(3000);
    cy.takeStepScreenshot('Filtered balance confirmation letter in Request type');
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{downarrow}') // CLiked on down arrow in request type
    cy.get('input[id="PageConfigurationMaster_RSRUX3W__1:SRQueryListFG.RQST_ID_comboText"]').type('{enter}'); //Clicked on Enter in request type
    cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:SEARCH"]').click(); //Clicked on search after filterin
    //cy.takeStepScreenshot('Clicked on search button')

  })

})