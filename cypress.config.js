const { defineConfig } = require("cypress");
const mochawesome = require('mochawesome');

module.exports = defineConfig({
  e2e: {
    baseUrl:"https://conv.rakbankonline.ae/IBRetailUAT/auth",
    projectId: 'RAK_bank',
    reporter: 'mochawesome',
    Browser:'chrome', 
    video: true, // Enable video recording
    videoCompression: 32, // Video compression level (0-100, where 0 is no compression)
    videoUploadOnPasses: false, // Set to true if you want to upload videos even when tests pass
    videosFolder: 'cypress/videos', // Folder where videos will be saved
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

    viewportWidth: 1440,
    viewportHeight: 1280,
  },
});
