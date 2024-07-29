describe("welcome to RakBank",()=>{
    it("test 1 to register",()=>{
        cy.visit("https://conv.rakbankonline.ae/IBRetailUAT/auth")
        cy.get('[data-testid="button-register"]').click()
        cy.get('[data-testid="method-select"]').click()
        cy.get('[data-testid="method-select"]').click(1)
        cy.wait(200)
       // cy.get('#react-select-2-input')
       //cy.get('#react-select-2-input').click()
       //cy.get('#react-select-2').click();
       //cy.get('#react-select-2-input')
        
    })
})