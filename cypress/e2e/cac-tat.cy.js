describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html")
  })

  const TRES_SEGUNDOS_EM_MS = 3000
  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT")
  })

  it("preenchendo os campos obrigatórios e enviando o formulário", () => {
    const textoLongo =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ultricies risus nec massa sagittis vestibulum. Nullam quis elit facilisis, luctus dui at, fringilla diam.";
    cy.clock()

    cy.get("#firstName").type("Sany")
    cy.get("#lastName").type("Garcia")
    cy.get("#email").type("sanymara@hotmail.com");
    cy.get("#open-text-area").type(textoLongo, { delay: 0 })
    cy.contains("button", "Enviar").click()
    cy.get(".success").should("be.visible")
    cy.tick(TRES_SEGUNDOS_EM_MS)
    cy.get(".success").should("not.be.visible")
  })

  it("exibindo msg de erro ao submeter o formulário com email com formatação errada", () => {
    cy.clock()
    cy.get("#firstName").type("Sany")
    cy.get("#lastName").type("Garcia")
    cy.get("#email").type("sanymara.hotmail.com")
    cy.get("#open-text-area").type("Olá, Como digitar na próxima linha?")
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(TRES_SEGUNDOS_EM_MS)
    cy.get(".error").should("not.be.visible")
  })

  Cypress._.times(3, () => {
    it("validando que campo telefone só aceita números", () => {
      cy.get("#phone").type("Nao preencher").should("have.value", "")
    })
  })

  it("exibe msg de erro ao submeter o formulário qdo o campo se torna obrigatório mas não está preenchido", () => {
    cy.clock()
    cy.get("#firstName").type("Sany")
    cy.get("#lastName").type("Garcia")
    cy.get("#email").type("sany@hotmail.com")
    cy.get("#phone-checkbox").check()
    cy.get("#open-text-area").type("Olá, Como digitar na próxima linha?")
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(TRES_SEGUNDOS_EM_MS)
    cy.get(".error").should("not.be.visible")
  })

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Sany")
      .should("have.value", "Sany")
      .clear()
      .should("have.value", "")
    cy.get("#lastName")
      .type("Garcia")
      .should("have.value", "Garcia")
      .clear()
      .should("have.value", "")
    cy.get("#email")
      .type("sany@hotmail.com")
      .should("have.value", "sany@hotmail.com")
      .clear()
      .should("have.value", "")
    cy.get("#phone")
      .type("5599991122")
      .should("have.value", "5599991122")
      .clear()
      .should("have.value", "")
  })

  it("exibindo msg de erro ao submeter o formulário com campos obrigatórios vazio", () => {
    cy.clock()
    cy.contains("button", "Enviar").click()
    cy.get(".error").should("be.visible")
    cy.tick(TRES_SEGUNDOS_EM_MS)
    cy.get(".error").should("not.be.visible")
  })

  it("enviando o formulário com sucesso usando um comando customizado", () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.get(".success").should("be.visible")
    cy.tick(TRES_SEGUNDOS_EM_MS)
    cy.get(".success").should("not.be.visible")
  })

  it("selecionando um produto (Youtube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube")
  })

  it("selecionando um produto (Mentoria) por seu value", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria")
  })

  it("selecionando um produto (Blog) por seu indice", () => {
    cy.get("#product").select(1).should("have.value", "blog")
  })

  it('marcar o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback').check().should("have.value", "feedback")
  })

  it("marcar o tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .check()
      .each(function ($radio) {
        cy.wrap($radio).check()
      })
  })

  it("marcando os dois checkboxes, e desmarcando o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked")
  })
  it('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('input[type="file"]')
    .should('not.have.value')
      .selectFile('./cypress/fixtures/oracleInfrastructure.jpg')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('oracleInfrastructure.jpg')
      })
  })

  it('seleciona um arquivo simulando um drag-and=drop', () =>{
    cy.get('input[type="file"]')
    .should('not.have.value')
      .selectFile('./cypress/fixtures/oracleInfrastructure.jpg', { action: 'drag-drop'})
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('oracleInfrastructure.jpg')
      })
  })

  it('seleciona um arquivo utilizando uma fixture na qual foi dado um alias', () => {
    cy.fixture('oracleInfrastructure.jpg').as('certificadoFile')
    cy.get('input[type="file"]')
      .selectFile('@certificadoFile')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('oracleInfrastructure.jpg')
      })
  })  

  it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um click', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing').should('be.visible')
  })

  it('exibe e esconde mensagem de erro usando o .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', "Mensagem enviada com sucesso.")
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', "Valide os campos obrigatórios!")
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando .invoke', () => {
    const textoLongo = Cypress._.repeat('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 6)

    cy.get('#open-text-area')
      .invoke('val', textoLongo)
      .should('have.value', textoLongo)
  })

  it('faz uma requiscao HTTP', () =>{
    cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
      .should((response) => {
        const { status, statusText, body } = response
        expect(status).to.equal(200)
        expect(statusText).to.equal('OK')
        expect(body).to.include('CAC TAT')
      })
  })

  it('encontre o miau escondido', () => {
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'I love Cat!')
  })
})
