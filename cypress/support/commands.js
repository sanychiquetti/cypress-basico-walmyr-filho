Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Sany')
    cy.get('#lastName').type('Garcia')
    cy.get('#email').type('sany@hotmail.com')
    cy.get('#open-text-area').type('Olá, tudo bem?')
    cy.contains('button', 'Enviar').click()
})