
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })
})

describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http:localhost:3003/api/users', { 'username': 'kana', 'name':'kanamies', 'password':'kanala123' })
    cy.visit('http://localhost:5173')
  })
  it('succeeds with correct credentials', function() {
    cy.get('#username').type('kana')
    cy.get('#password').type('kanala123')
    cy.get('#login-button').click()
    cy.contains('blog')
    cy.contains('kanamies logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('kana')
    cy.get('#password').type('vääräsalasana')
    cy.get('#login-button').click()
    cy.contains('Wrong username or password')
  })
})
