/// <reference types= "cypress" />
import { expect } from 'chai'
const ajv = require('ajv')
const xml2js = require('xml2js')
const parser = new xml2js.Parser({
  explicitArray: false
});


describe('XML Parsing', () => {
  //* PET API - 'POST' https://petstore.swagger.io/v2/pet
  //* body xml - <?xml version="1.0" encoding="UTF-8"?> <Pet> <id>0</id> <Category> <id>0</id> <name>Dog</name> </Category> <name>Jimmy</name> <photoUrls> <photoUrl>string</photoUrl> </photoUrls> <tags> <Tag> <id>0</id> <name>string</name> </Tag> </tags> <status>available</status> </Pet> 

  const xmlPayload = "<Pet><id>0</id><Category><id>0</id><name>Dog</name></Category><name>Jimmy</name><photoUrls><photoUrl>string</photoUrl></photoUrls><tags><Tag><id>0</id><name>string</name></Tag></tags><status>available</status></Pet>"
  let petId;
  before("Creating PET", () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/pet',
      body: xmlPayload,
      headers: {
        'Content-Type': 'application/xml', //? sending payload
        'accept': 'application/xml' //? reciving payload
      }
    })
      .then((res) => {
        expect(res.status).to.eq(200)
        parser.parseString(res.body, (err, result) => {
          petId = result.Pet.id
        })
      })
  });

  it('Fetching Pet data-parsing xml response', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/pet/${petId}`,
      headers: {
        'accept': 'application/xml'
      }
    })
      .then((res) => {
        expect(res.status).to.eq(200)
        parser.parseString(res.body, (err, result) => {
          expect(result.Pet.id).equal(petId)
          expect(result.Pet.name).equal("Jimmy")
        })
      })
  })
})