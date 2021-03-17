describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Taneli Testimies',
      username: 'tmies',
      password: 'tane'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      
      cy.get('#username').type('tmies')
      cy.get('#password').type('tane')
      cy.contains('login').click()
      cy.contains('Taneli Testimies logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('tmies')
      cy.get('#password').type('taneli')
      cy.contains('login').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'tmies', password: 'tane'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy')
      cy.get('#author').type('Tane')
      cy.get('#url').type('www.taneli.fi')
      cy.contains('save').click()
      cy.contains('Test Cy')
      cy.contains('Tane')
      cy.contains('show')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy')
      cy.get('#author').type('Tane')
      cy.get('#url').type('www.taneli.fi')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('0')
      cy.contains('like').click()
      cy.contains('1')

    })

    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy')
      cy.get('#author').type('Tane')
      cy.get('#url').type('www.taneli.fi')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('delete').click()
      //cy.contains('Test Cy').should('not.exist')
      //cy.contains('Tane').should('not.exist') 
      cy.contains('www.taneli.fi').should('not.exist') 
  
    })
  })
  describe('Liking', function() {
    beforeEach(function() {
      cy.get('#username').type('tmies')
      cy.get('#password').type('tane')
      cy.contains('login').click()
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy1')
      cy.get('#author').type('Tane1')
      cy.get('#url').type('www.taneli.fi1')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      
      
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy2')
      cy.get('#author').type('Tane2')
      cy.get('#url').type('www.taneli.fi2')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      
      
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy3')
      cy.get('#author').type('Tane3')
      cy.get('#url').type('www.taneli.fi3')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      
      
      cy.contains('new blog').click()
      cy.get('#title').type('Test Cy4')
      cy.get('#author').type('Tane4')
      cy.get('#url').type('www.taneli.fi4')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.wait(500)
      cy.contains('like').click()
      cy.wait(500)
      cy.contains('like').click()
      
    })
    it('A blogs are in like order', function() {
      
      //   cy.get('?').then(() => {
       
      //   })

    
    })
    
  })
})