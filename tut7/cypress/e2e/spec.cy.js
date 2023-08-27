/// <reference types= "cypress" />

describe('Authentication', () => {
  //* Basic Auth - 'GET' https://postman-echo.com/basic-auth
  //* Authorization -> basic auth -> { username: postman, password : password}

  it.skip('Basic Authentication', () => {
    cy.request({
      method: 'GET',
      url: 'https://postman-echo.com/basic-auth',
      auth: {
        user: 'postman', //? username
        pass: 'password', //? password
      }
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.authenticated).to.equal(true)
    })
  });

  //* Digest Auth - 'GET' https://postman-echo.com/digest-auth
  //* Authorization -> digest auth -> { username: postman, password : password}
  it.skip('Digest Auth', () => {
    cy.request({
      method: 'GET',
      url: 'https://postman-echo.com/basic-auth',
      auth: {
        username: 'postman', //? username
        password: 'password', //? password
        method: 'degest'
      }
    }).then((res) => {
      expect(res.status).to.equal(200)
      expect(res.body.authenticated).to.equal(true)
    })
  });

  let authToken
  before(() => {
    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/api-clients/',
      body: {
        clientName: "Test",
        clientEmail: Math.random().toString(5).substring(2) + "@gmail.com"
      }
    })
      .then((res) => {
        authToken = res.body.accessToken
      })
  });

  it.skip('Bearer Authentication', () => {
    cy.request({
      method: 'POST',
      url: 'https://simple-books-api.glitch.me/orders',
      headers: {
        Authorization: 'Bearer ' + authToken
      },
      body: {
        bookId: 1,
        customerName: "xyzabc"
      }
    }).then((res) => {
      expect(res.status).to.equal(200)
      cy.log(res)
    })
  });

  it('Api Key Authorization', () => {
    cy.request({
      method: 'POST',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      qs: {
        q: 'delhi',
        appid: '4920cecb9fb154c8c9d0b8c2cbb566e5'
      }
    }).then((res) => {
      expect(res.status).to.equal(200)
      cy.log(res)
    })

  });
})