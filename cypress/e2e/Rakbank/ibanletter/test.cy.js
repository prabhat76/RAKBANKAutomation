import { loginPageLocators } from "../../../locators/loginpage";
import { dashboard } from "../../../locators/dashboard";
import { commonLocators } from "../../../locators/commonlocators";
import { serviceSquad } from "../../../locators/ServiceSquad";

describe("Service Squad Business Banking ",()=>{
    beforeEach(()=>{
        cy.wait(2000);
        cy.fixture('example').as('userData')
       
    })

    it ("Login and chekc if IBAN Letter is Visible",()=>{
        cy.fixture('example').then((example) => {
            cy.visit("");
            cy.login('ORAMA1','rakbank123'); })
        cy.wait(2000)
        cy.get(dashboard.Services.css).click()
        cy.get(dashboard.bankingRequests.css).click()
       cy.wait(6000)       
       cy.get(dashboard.serviceSelector.css).click()
       cy.get(dashboard.serviceSelector.css).should('be.visible')
    
    })

    it("Request on IBan Letter",()=>{
        cy.visit("");
        cy.login('ORAMA1','rakbank123');
        cy.wait(2000)
        cy.get(dashboard.Services.css).click()
        cy.get(dashboard.bankingRequests.css).click()
        cy.wait(6000)       
        cy.get(dashboard.serviceSelector.css).click()
        cy.get(dashboard.serviceSelector.css).should('be.visible')
       //cy.get('#PageConfigurationMaster_RSRUX3W__1\:IBN5').click()
      // cy.get('#PageConfigurationMaster_RSRUX3W__1\:IBN5').should('be.visible')
      //cy.get('#PageConfigurationMaster_RSRUX3W__1\:DisplayForm\.Rc1\.C2').click()
      cy.get(serviceSquad.IBANLetter.css).click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.LOOK_UP__"]').click()
      //cy.get('[class="HW_textwithpadding_new2"]').click()
      cy.wait(3000)
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY"]').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').and('not.be.disabled');
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').click()
      //cy.get('[class="ui-button-icon-primary ui-icon ui-icon-triangle-1-s"]').click()
      //cy.get('#PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_TO_comboButton > .ui-button-icon-primary').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_TO_comboText"]').click();
      cy.wait(2000);
      //cy.get('[value="Myself"]').click();
      cy.get('select') // Adjust this selector to target your specific <select> element.select('Myself');
    })


    it("Request on IBan Letter for Myself",()=>{
        cy.visit("");
        cy.get(loginPageLocators.usernameField.css).type("ORAMA1")
        cy.get(loginPageLocators.passwordField.css).type("rakbank123")
        cy.get(loginPageLocators.loginButton.css).click()
        cy.wait(2000)
        cy.get(dashboard.Services.css).click()
        cy.get(dashboard.bankingRequests.css).click()
       cy.wait(6000)       
       cy.get(dashboard.serviceSelector.css).click()
       cy.get(dashboard.serviceSelector.css).should('be.visible')
       cy.get(serviceSquad.IBANLetter.css).click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.LOOK_UP__"]').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY"]').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').and('not.be.disabled');
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').click()
      cy.wait(2000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_TO_comboText"]').focus().clear().type("Myself")
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.CONTINUE.PROCESS_FORM_EVENT"]').click()
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.IBN_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT"]').click()
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT"]').click()
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:PDF_DOWNLOAD"]').click()
    
   
    })


    it("Request ob IBan Letter for other Entity",()=>{
        cy.visit("");
        cy.get(loginPageLocators.usernameField.css).type("ORAMA1")
        cy.get(loginPageLocators.passwordField.css).type("rakbank123")
        cy.get(loginPageLocators.loginButton.css).click()
        cy.wait(2000)
        cy.get(dashboard.Services.css).click()
        cy.get(dashboard.bankingRequests.css).click()
       cy.wait(6000)       
       cy.get(dashboard.serviceSelector.css).click()
       cy.get(dashboard.serviceSelector.css).should('be.visible')
       cy.get(serviceSquad.IBANLetter.css).click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:CustomAcctListFG.LOOK_UP__"]').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:CustomAcctListFG\.SELECTED_INDEX_ARRAY"]').click()
      //cy.get('[class="HW_textwithpadding_new2"]').click()
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').should('be.visible').and('not.be.disabled');
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:SUBMIT"]').click()
      cy.wait(2000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1:FormManagementFG.ADDRESS_TO_comboText"]').focus().clear().type("Other entity")
      cy.wait(3000);
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ENTITY_NAME"]').type("Thakur Dayal Singh")
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE1"]').type("Pandit Deen Dayal Upadhyay Junction")
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.ADDRESS_LINE2"]').type("Uttar pradesh ")
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:FormManagementFG\.EMIRATE_comboText"]').click().focus().clear().type("Ajman")
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.NO_SECTION\.CONTINUE\.PROCESS_FORM_EVENT"]').click();
     // cy.get('#PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.IBN_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT')
      cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.IBN_GENERAL_DETAILS\.SUBMIT_ONLINE\.PROCESS_FORM_EVENT"]').click()
  cy.wait(4000);
  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT"]').click()
  cy.get('[id="PageConfigurationMaster_RSRUX3W__1\:PDF_DOWNLOAD"]').click()
    })
})