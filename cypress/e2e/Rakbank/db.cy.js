describe('Outer Rak Bank Digital Banking', () => {
  it('passes', () => {
    cy.visit("https://conv.rakbankonline.ae/IBRetailUAT/auth")
    cy.get('[data-testid="username-input"]').type('nandita12')
    cy.get('[data-testid="password-input"]').type('rakbank123')
    cy.get('[data-testid="button-login"]').click()
    cy.wait(20000)
    //cy.console("Clicked")
    //cy.get('[data-testid="menu-expand-send-money"]').click()
   // cy.get('[data-testid="menu-item-search"] > div').click()
    cy.get('[data-testid="menu-expand-send-money"]').click()
    cy.get('[data-testid="menu-link-send-internationally"]').click()
    cy.wait(1000)
    cy.get('[data-testid="to-select"]').click()

    cy.wait(1000)
   //cy.get('#react-select-2-option-2').click()
    //cy.get('[data-testid="to-select"]').select('react-select-2-option-0');
    //cy.get('#react-select-5-option-0').click()
    cy.get('[data-testid="from-select"]').click()
    cy.wait(1000)

    cy.get('[data-testid="button-next"]').click()
    cy.get('[data-testid="remittingCurrency-select"]').type("84")
    cy.wait(1000)
    cy.get('[data-testid="reasons[0]-select"]').click()

  })
})


// describe('Rak Bank digital banking register',()=>{
//   it('register',()=>{
//     cy.visit("https://conv.rakbankonline.ae/IBRetailUAT/auth")
//     cy.get('[data-testid="button-register"]').click()
//   })
// })

// describe('content check to be done',()=>{
//   it('register-button',()=>{
//     cy.visit("https://conv.rakbankonline.ae/IBRetailUAT/auth")
//   })
// })