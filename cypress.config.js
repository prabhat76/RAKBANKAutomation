const { defineConfig } = require("cypress");
const mochawesome = require('mochawesome');
//const { startWebDriverServer, stopWebDriverServer } = require('cypress-webdriver');

//const perfectoConfig = require('perfecto-cypress/config');
//const PerfectoReporter = require('perfecto-cypress-reporter');

baseUrl="https://conv.rakbankonline.ae/corp6/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&USER_TYPE=1",
module.exports = defineConfig({
  e2e: {
    baseUrl:"https://conv.rakbankonline.ae/corp6/AuthenticationController?FORMSGROUP_ID__=AuthenticationFG&__START_TRAN_FLAG__=Y&__FG_BUTTONS__=LOAD&ACTION.LOAD=Y&AuthenticationFG.LOGIN_FLAG=1&BANK_ID=RAK&USER_TYPE=1",
    projectId: 'RAK_bank',
    reporter: 'mocha-allure-reporter',
    Browser:'chrome', 
    video: true, // Enable video recording
    videoCompression: 32, // Video compression level (0-100, where 0 is no compression)
    videoUploadOnPasses: false, // Set to true if you want to upload videos even when tests pass
    videosFolder: 'cypress/results/videos', // Folder where videos will be saved
    // other configuration options
    
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'report',
      overwrite: false,
      html: true,
      json: true,
      code: true,
      setupNodeEvents(on, config) {
        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
          console.error('Unhandled Rejection:', reason);
          // Handle or suppress the error as needed
        });
      },
    },
    screenshot: {
      // Specify the default screenshot settings here
      screenshotsFolder:'cypress/results/screenshots',
      capture: 'fullPage', // Capture the full page or the viewport
      // You can also configure other settings if needed
    },
    
    viewportWidth: 1080,
    viewportHeight: 720,
    


    
  },
  

  




});

