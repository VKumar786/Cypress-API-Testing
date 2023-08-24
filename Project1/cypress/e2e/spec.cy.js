/// <reference types="cypress" />

describe('template spec', () => {

  let url = `https://demoqa.com/select-menu`
  it('passes', () => {
    cy.visit(url)

    cy.getBySel('myButton').click()
  })
})