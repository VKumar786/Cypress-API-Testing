/*
  * http://127.0.0.1:8000/todos
  * route.post('/todos', addTodo)
  * route.get('/todos', getAllTodos);
  * route.get('/todos/:id', toggleTodoDone);
  * route.put('/todos/:id', updateTodo);
  * route.delete('/todos/:id', deleteTodo);
 */

/// <reference types= "cypress" />
describe('Http Request', () => {
  it.skip('GET Call', () => {
    cy.request('GET', 'http://127.0.0.1:8000/todos')
      .its('status')
      .should('equal', 200)
      .as('GETCommand')
  });

  it.skip('POST Call', () => {
    cy.request({
      method: 'POST',
      url: 'http://127.0.0.1:8000/todo',
      // url: 'http://127.0.0.1:8000/todos',
      body: {
        data: "vishal",
        done: true
      }
    })
      .its('status')
      .should('equal', 200)
  });

  it.skip('PUT Call', () => {
    cy.request({
      method: 'PUT',
      url: 'http://127.0.0.1:8000/todos/64e9f2d37cabd9dfddae603d',
      body: {
        data: "vkumar786",
        done: true
      }
    })
      .its('status')
      .should('equal', 200)
  });

  it.skip('DELETE Call', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://127.0.0.1:8000/todos/64e9fa727cabd9dfddae60a0',
    })
      .its('status')
      .should('equal', 200)
  });
});