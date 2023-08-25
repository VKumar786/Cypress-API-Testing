/// <reference types="cypress" />

describe('template spec', () => {
  let url = `https://practicetestautomation.com/practice-test-login/`
  it('passes', () => {
    cy.visit(url)

    cy.get('#username')
      .as('userName')
    cy.get('@userName')
      .clear()
      .type('student', {
        delay: 50
      })

    cy.get('#password').as('Password')
    cy.get('@Password')
      .clear()
      .type('Password123', {
        delay: 50
      })

    cy.get('#submit')
      .click()
  })

  it('Intercept Response Approach 1', () => {
    const url = `https://dummyapi.io/explorer`
    cy.visit(url);

    cy.intercept({
      path: `/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10`
    }).as('comments')

    cy.get('.flex > :nth-child(5)')
      .click()

    cy.wait('@comments').then((intercept) => {
      cy.log(intercept)
      console.warn('👍👍👍', intercept);
      expect(intercept.response.statusCode).equal(200)

      expect(intercept.response.body.limit).equal(10)
    })
  });

  //? Develop a fake response to develop API
  it('Mock API Reponse', () => {
    const url = `https://dummyapi.io/explorer`
    cy.visit(url)

    cy.intercept('GET', '/data/v1/post/60d21af267d0d8992e610b8d/comment?limit=10', {
      limit: 10,
      Name: 'Testing Funda'
    })
      .as('comments')


    cy.get('.flex > :nth-child(5)')
      .click()

    cy.wait('@comments').then((intercept) => {
      cy.log(intercept)
      console.warn('👍👍👍', intercept);
      expect(intercept.response.statusCode).equal(200)

      expect(intercept.response.body.limit).equal(10)
      expect(intercept.response.body.Name).equal('Testing Funda')
    })
  });

  it('Wrap Approach 1 | JQuery to Cypress', () => {
    cy.visit(url)

    cy.get('#username')
      .then(($input) => {
        //? Cypress to JQuery using then
        cy.log($input)
        $input.val('Hey Vishal')

        //? JQuery to Cypress
        cy.wrap($input)
          .clear()
          .type('student')
      })
  });

  it('Wrap Approach 2 | Sync to ASync', () => {

    let name = 'vishal'
    // name.should('eq', 'vishal')
    cy.wrap(name).should('eq', 'vishal')


    let channel = { name: 'Onemind Services LLC' }
    // channel.should('have.property', 'name' , 'Onemind Services LLC')
    cy.wrap(channel).should('have.property', 'name', 'Onemind Services LLC')

    let arr = ['dynamic programming', 'oops', 'java']
    // arr.should('include', 'oops')
    cy.wrap(arr).should('include', 'oops')

  });

  const person = (pname, ms) => {
    console.warn('Promise Begin');
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ name: pname })
      }, ms);
    })
  }

  it.only('Wrap Approach 3 | Promises', () => {
    const p = person('vishal', 3000)
    cy.wrap(p)
      .should('have.property', 'name', 'vishal')

    cy.wrap(p)
  })
})