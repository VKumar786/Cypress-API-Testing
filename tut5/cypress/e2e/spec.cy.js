/// <reference types= "cypress" />
import { expect } from 'chai'

const AJV = require('ajv')
const ajv = new AJV()

describe('Schema Validation', () => {
  //* Install ajv libaray
  it('schema validation against response', () => {
    cy.request({
      method: 'GET',
      url: 'https://fakestoreapi.com/products'
    })
      .then((res) => {
        const schema = {
          "$schema": "http://json-schema.org/draft-07/schema#",
          "title": "Generated schema for Root",
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": { "type": "number" },
              "title": { "type": "string" },
              "price": { "type": "number" },
              "description": { "type": "string" },
              "category": { "type": "string" },
              "image": { "type": "string" },
              "rating": {
                "type": "object",
                "properties": {
                  "rate": { "type": "number" },
                  "count": { "type": "number" }
                },
                "required": ["rate", "count"]
              }
            },
            "required": ["id", "title", "price", "description", "category", "image", "rating"]
          }
        };
        //* schema ended

        const validate = ajv.compile(schema)
        const isValid = validate(res.body)
        expect(isValid).to.be.true
      })
  })
})
