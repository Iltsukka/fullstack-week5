
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http:localhost:3003/api/users', { 'username': 'kana', 'name':'kanamies', 'password':'kanala123' })
      cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('kana')
      cy.get('#password').type('kanala123')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('kanamies logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('kana')
      cy.get('#password').type('vääräsalasana')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function()  {
    beforeEach(function() {
      cy.get('#username').type('kana')
      cy.get('#password').type('kanala123')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })
    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('e2e')
      cy.get('#author').type('Jussi')
      cy.get('#url').type('cypress.com')
      cy.get('#create-button').click()
      cy.contains('Succesfully added a blog')
      cy.contains('e2e Jussi')
    })

  })
  describe('After creating a blog', function() {
    beforeEach(function() {
      cy.get('#username').type('kana')
      cy.get('#password').type('kanala123')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('create blog').click()
      cy.get('#title').type('e2e')
      cy.get('#author').type('Jussi')
      cy.get('#url').type('cypress.com')
      cy.get('#create-button').click()
      cy.contains('Succesfully added a blog')
      cy.contains('e2e Jussi')
    })

    it('Blog can be liked', function() {
      cy.contains('show').click()
      cy.get('#like').click()
      cy.contains('likes: 1')
    })
    it('Blog can be deleted', function() {
      cy.contains('show').click()
      cy.contains('delete blog').click()
      cy.contains('Deleted blog e2e')
    })
  })
  describe('After liking blogs', function() {
    beforeEach(function() {
      cy.get('#username').type('kana')
      cy.get('#password').type('kanala123')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('create blog').click()
      cy.get('#title').type('e2e')
      cy.get('#author').type('Jussi')
      cy.get('#url').type('cypress.com')
      cy.get('#create-button').click()
      cy.contains('Succesfully added a blog')
      cy.contains('e2e Jussi')


    })
    it('blogs are arranged by the amount of likes', function() {
    })

  })})
