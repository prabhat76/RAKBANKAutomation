const { defineConfig } = require("cypress");
const mochawesome = require('mochawesome');

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://conv.rakbankonline.ae/IBRetailUAT/auth",
    projectId: 'RAK_bank',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      reportFilename: 'report',
      overwrite: true,
      html: true,
      json: true,
      code: false,
      video:true,
      setupNodeEvents(on, config) {
        // Handle unhandled promise rejections
        process.on('unhandledRejection', (reason, promise) => {
          console.error('Unhandled Rejection:', reason);
          // Handle or suppress the error as needed
        });
      },
    },

    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
