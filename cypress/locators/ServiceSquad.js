export const serviceSquad = {
    IBANLetter: {
        css: '[id="PageConfigurationMaster_RSRUX3W__1\:IBN5"]',
        xpath: '[id="PageConfigurationMaster_RSRUX3W__1\:IBN5"]'
      },
    Service:{
      css: '#PageConfigurationMaster_RSRUX3W__1\:BACK_TO_PARENT_FG',
      xpath: '[id="PageConfigurationMaster_RSRUX3W__1\:BACK_TO_PARENT_FG"]'
    },
    myRequest:{
      xpath:'[id="PageConfigurationMaster_RSRUX3W__1\:QRY_REQUEST"]'
    },
    submit: {
      css: '[id="PageConfigurationMaster_RSRUX3W__1\\:SUBMIT"]'
  },
  addressTo: {
      comboButton: '[id="PageConfigurationMaster_RSRUX3W__1\\:FormManagementFG\\.ADDRESS_TO_comboButton"]',
      comboOption: '.ui-autocomplete'
  },
  //cy.get('#PageConfigurationMaster_RSRUX3W__1\:IBN_INITIATE\.NO_SECTION\.SUBMIT_TO_HOST\.PROCESS_FORM_EVENT')
  processForm: {
      continue: '[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.CONTINUE.PROCESS_FORM_EVENT"]',
      submitOnline: '[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.IBN_GENERAL_DETAILS.SUBMIT_ONLINE.PROCESS_FORM_EVENT"]',
      submitToHost: '[id="PageConfigurationMaster_RSRUX3W__1:IBN_INITIATE.NO_SECTION.SUBMIT_TO_HOST.PROCESS_FORM_EVENT"]'
  },
  pdfDownload: {
      css: '[id="PageConfigurationMaster_RSRUX3W__1:PDF_DOWNLOAD"]'
  },
  search: {
    css: '[id="PageConfigurationMaster_RSRUX3W__1\\:SEARCH"]',
    href: '[id="HREF_PageConfigurationMaster_RSRUX3W__1\\:SRQueryListFG\\.REFERENCE_ID_ARRAY\\[0\\]"]'
  },

  payFrom: {
    css: '[class="labelcolumnsmallnew inputWidthPad new_bold_text type_FEBAUnboundString"]'
  }
   
};