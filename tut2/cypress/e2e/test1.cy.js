/// <reference types= "cypress" />
import { expect } from 'chai'

describe('api testing', () => {
  it.skip('Approach1 - Hard coded json object', () => {
    // it.only('Approach1 - Hard coded json object', () => {
    const requestBody = {
      data: "tushar",
      done: true
    }
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/todos',
      body: requestBody
    })
      .then((res) => {
        // cy.log(res.json())
        expect(res.status).to.equal(200)
        expect(res.body.data).to.equal("tushar")
        expect(res.body.done).to.equal(true)
      })
  });

  it.skip('Approach2 - Dynamically geerating json object', () => {
    // it.only('Approach2 - Dynamically geerating json object', () => {

    const requestBody = {
      data: Math.random().toString(5).substring(2),
      done: true
    }

    console.warn(requestBody);
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/todos',
      body: requestBody
    })
      .then((res) => {
        // cy.log(res.json())
        cy.log(res.body)
        expect(res.status).to.equal(200)
        expect(res.body.data).to.equal(requestBody.data)
        expect(res.body.done).to.equal(false)
      })
  });

  it.only('Approach 3 - Fixture', () => {
    cy.fixture('data.json')
      .then(val => {
        cy.log(val)
        cy.request({
          method: 'POST',
          url: 'http://127.0.0.1:8000/todos',
          body: {
            data: val.data,
          }
        })
          .then((res) => {
            // cy.log(res.json())
            cy.log(res.body)
            expect(res.status).to.equal(200)
            expect(res.body.data).to.equal(val.data)
            expect(res.body.done).to.equal(false)

            //?
            expect(res.body).has.property('data', val.data)
            expect(res.body).to.have.property('data', val.data)
          })
      })
  });

});