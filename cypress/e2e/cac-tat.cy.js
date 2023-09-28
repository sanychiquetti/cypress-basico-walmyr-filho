describe("Central de Atendimento ao Cliente TAT", () => {
   beforeEach(() => {
     cy.visit("./src/index.html")
   })
   
   it('verifica o título da aplicação', () => {
     cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
   })
 
   it('preenchendo os campos obrigatórios e enviando o formulário', () => {
     const textoLongo =
       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies risus nec massa sagittis vestibulum. Nullam quis elit facilisis, luctus dui at, fringilla diam.";
     cy.get('#firstName').type('Sany')
     cy.get('#lastName').type('Garcia')
     cy.get('#email').type('sanymara@hotmail.com')
     cy.get('#open-text-area')
       .type(textoLongo, { delay: 0})
     cy.contains('button', 'Enviar').click()
     cy.get('.success').should('be.visible')
   })

   it('exibindo msg de erro ao submeter o formulário com email com formatação errada', () => {
     cy.get('#firstName').type('Sany')
     cy.get('#lastName').type('Garcia')
     cy.get('#email').type('sanymara.hotmail.com')
     cy.get('#open-text-area')
       .type('Olá, Como digitar na próxima linha?')
     cy.contains('button', 'Enviar').click()
     cy.get('.error').should('be.visible')
   })
 
   it('validando que campo telefone só aceita números', () => {
     cy.get('#phone')
       .type('Nao preencher')
       .should('have.value', '')
   })
 
   it('exibe msg de erro ao submeter o formulário qdo o campo se torna obrigatório mas não está preenchido', () => {
     cy.get('#firstName').type('Sany')
     cy.get('#lastName').type('Garcia')
     cy.get('#email').type('sany@hotmail.com')
     cy.get('#phone-checkbox').check()
     cy.get('#open-text-area')
       .type('Olá, Como digitar na próxima linha?')
     cy.contains('button', 'Enviar').click()
     cy.get('.error').should('be.visible')
   })
 
   it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
     cy.get('#firstName')
       .type('Sany')
       .should('have.value', 'Sany')
       .clear()
       .should('have.value', '')
     cy.get('#lastName')
       .type('Garcia')
       .should('have.value', 'Garcia')
       .clear()
       .should('have.value', '')
     cy.get('#email')
       .type('sany@hotmail.com')
       .should('have.value', 'sany@hotmail.com')
       .clear()
       .should('have.value', '')
     cy.get('#phone')
       .type('5599991122')
       .should('have.value', '5599991122')
       .clear()
       .should('have.value', '')
   })
 
   it('exibindo msg de erro ao submeter o formulário com campos obrigatórios vazio', () => {
     cy.contains('button', 'Enviar').click()
     cy.get('.error').should('be.visible')
   })
 
   it('enviando o formulário com sucesso usando um comando customizado', () => {
     cy.fillMandatoryFieldsAndSubmit()
     cy.get('.success').should('be.visible')
   })
 
   it('selecionando um produto (Youtube) por seu texto', () => {
     cy.get('#product')
       .select('YouTube')
       .should('have.value', 'youtube')
   })
 
   it('selecionando um produto (Mentoria) por seu value', () => {
     cy.get('#product')
       .select('mentoria')
       .should('have.value', 'mentoria')
   })

   it('selecionando um produto (Blog) por seu indice', () => {
     cy.get('#product')
       .select(1)
       .should('have.value', 'blog')
   })

   it('marcar o tipo de atendimento "Feedback"', () => {
     cy.get('input[value="feedback')
       .check()
       .should('have.value', 'feedback')
   })
 
   it('marcar o tipo de atendimento', () => {
     cy.get('input[type="radio"]')
     .should('have.length', 3)
       .check()
       .each(function($radio){
         cy.wrap($radio).check()
       })
   })

   it('marcando os dois checkboxes, e desmarcando o último', () => {
     cy.get('input[type="checkbox"]')
       .check()
       .should('be.checked')
       .last()
       .uncheck()
       .should('not.be.checked')
   })
 })