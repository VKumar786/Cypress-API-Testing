/// <reference types="cypress" />

describe('Http Request', () => {
  let url = `https://jsonplaceholder.typicode.com/posts/1`
  it('GET Request', () => {

    cy.request('GET', url)
      .then((res) => {
        cy.log(res)
      })

    cy.request('GET', url)
      .its('status')
      .should('equal', 200)

  });

  it('POST Request', () => {
    cy.request({
      method: 'POST',
      url: `https://reqres.in/api/users`,
      // body: {
      //   userId: 719292,
      //   id: 123981293789121,
      //   title: "Vishal BOIII",
      //   body: "Badmash"
      // }
      body: {
        name: "morpheus",
        job: "leader"
      }
    })
      .its('status')
      .should('eq', 201)
  });

  it('PUT Request', () => {
    cy.request({
      method: 'PUT',
      url: url,
      body: {
        userId: 1,
        id: 1,
        title: "Vishal BOIII",
        body: "Badmash"
      }
    })
      .its('status')
      .should('equal', 200)

  });

  it.only('Delete Request', () => {
    cy.request({
      method: 'DELETE',
      url,
    })
    .its('status')
    .should('equal', 200)
  });
})