/// <reference types= "cypress" />

describe('API Chaining', () => {
  //* 'GET' posts - https://jsonplaceholder.typicode.com/posts
  //* 'GET' comment on post - https://jsonplaceholder.typicode.com/comments?postid=1

  it('Getting all the posts', () => {
    cy.request({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/posts`
    })
      .then((res) => {
        expect(res.status).to.equal(200)
        const postId = res.body[0].id
        return postId
      })
      .then((postId) => {
        cy.request({
          method: 'GET',
          url: `https://jsonplaceholder.typicode.com/comments?postid=${postId}`
        })
          .then((res) => {
            expect(res.status).to.equal(200)
            //? used to find length 
            expect(res.body).to.have.length(500)
            cy.log(res.body)
          })
      })
  })

  
})