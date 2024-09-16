describe('My First Test', () => {
  it('Visits the React app', () => {
    cy.visit('http://localhost:3000')
    cy.contains('PARKINGBOX') // Reemplaza con un texto que exista en tu app
  })
})
