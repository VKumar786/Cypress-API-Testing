/// <reference types= "cypress" />
import { expect } from 'chai'

describe('API Testing', () => {
  //? Query Parameters
  it.skip('Passing Query Parameters', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users',
      qs: { //? Query Params
        page: 2
      }
    })
      .then((res) => {
        cy.log(res)
        expect(res.status).to.eq(200)
        expect(res.status).to.equal(200)
        expect(res.status).equal(200)
        expect(res.body.data[0].first_name).to.eq("Michael")
        expect(res.body.page).to.eq(2)

        //? Number of record 
        expect(res.body.data).has.length(6)

        expect(res.body.data[0]).have.property('id', 7)
        expect(res.body.data[0]).have.property('first_name', 'Michael')
      })
  });

  // ? Cookies, Headers
  // ? Token Authorization

  let authToken, orderId;
  before("Generating Token", () => {
    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/api-clients/',
      headers: { 'Content-Type': 'application/json' },
      body: {
        clientName: 'Test',
        clientEmail: Math.random().toString(5).substring(2) + '@gmail.com'
      }
    })
      .then(val => {
        cy.log(val.body)
        authToken = val.body.accessToken
        console.warn(authToken);
      })
  });

  before("Creating new Order", () => {
    if (authToken)
      //* Order 
      cy.request({
        method: 'POST',
        url: 'https://simple-books-api.glitch.me/orders',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        body: {
          bookId: 1,
          customerName: "Test"
        }
      }).then(val => {
        // expect(val.body.orderId).to.equal(val.body)
        expect(val.body.created).to.equal(true)
        expect(val.status).to.equal(201)
        orderId = val.body.orderId
      })
  });

  it('Header & Cookie', () => {
    //* Generate Token - 'POST' https://simple-books-api.glitch.me/api-clients/
    //* { "clientName": "Test", "clientEmail": "testsdsada@gmail.com" }
    //* { "accessToken": "75e593ffb61b858f18db1b57c7ce71fc14c8940959a4dea31f4d4fb82b12172b" }

    //* Order - 'POST' https://simple-books-api.glitch.me/orders
    //* { "bookId": 1, "customerName": "xyzabc" }
    //* { "created": true, "orderId": "kyo4tzurVoc63n1fHOG9M" }

    //* Get an order - 'GET' https://simple-books-api.glitch.me/orders/kyo4tzurVoc63n1fHOG9M

    cy.request({
      method: 'GET',
      url: `https://simple-books-api.glitch.me/orders/${orderId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
      },
      cookies: {
        'cookieName': 'mycookie'
      }
    })
      .then((val) => {
        expect(val.status).to.equal(200)
        expect(val.body).has.length(1)
        cy.log(val)
      })

  });

});