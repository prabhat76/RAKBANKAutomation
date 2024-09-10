Cypress.Commands.add('loginToPerfecto', (deviceName, platformName) => {
    const perfectoToken = Cypress.env('PERFECTO_TOKEN');
    const perfectoUrl = Cypress.env('PERFECTO_URL');
    const capabilities = {
      'platformName': platformName,
      'deviceName': deviceName,
      'browserName': 'Chrome'
    };
  
    cy.request({
      method: 'POST',
      url: `${perfectoUrl}/nexperience/perfecto-api/adb/device`,
      headers: {
        'Authorization': `Bearer ${perfectoToken}`
      },
      body: capabilities
    }).then(response => {
      // Perform any additional setup or verification here
      cy.log('Device successfully connected to Perfecto');
    });
  });
  