/// <reference types= "cypress" />
import { expect } from 'chai'

describe('Parsing JSON Response', () => {
  //* https://fakestoreapi.com/products
  let url = `https://fakestoreapi.com/products`

  it.skip('Parsing simple JSON Response', () => {
    cy.request({
      method: 'GET',
      url,
    })
      .then((res) => {
        cy.log(res)
        expect(res.status).to.equal(200)

        //? validate 0th object
        expect(res.body[0].id).to.equal(1)
        expect(res.body[0].title).to.equal('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')
        expect(res.body[0].price).to.equal(109.95)
        expect(res.body[0].rating.rate).to.equal(3.9)

        //? validate 20th object
        expect(res.body[19].id).to.equal(20)
        expect(res.body[19].price).to.equal(12.99)
        expect(res.body[19].rating.rate).to.equal(3.6)
        expect(res.body[19].title).to.equal('DANVOUY Womens T Shirt Casual Cotton Short')
      })

  })

  it.only('', () => {
    let totalPrice = 0, totalPrice1 = 0;
    cy.request({
      method: 'GET',
      url,
      qs: {
        limit: 5
      }
    })
      .then((res) => {
        cy.log(res)
        expect(res.status).to.equal(200)

        res.body.map((item, idx) => {
          // console.warn(item);
          totalPrice += item.price
        })

        res.body.forEach(element => {
          totalPrice1 += element.price
        })

        expect(totalPrice).to.equal(899.23)
        cy.log(totalPrice, totalPrice1)

      })

  });
})