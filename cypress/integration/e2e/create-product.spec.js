/// <reference types="cypress" />

context('Create Product', () => {

    describe("Create Product Fail", ()=>{
        it("should be redirect to list when try to create a product without login", () => {
            cy.visit('http://localhost:3000/add')
            cy.intercept('GET','/v1/products').as('request');
            cy.location('pathname').should('eq', '/list')
        })

        it("should not create product if there is missing requireded filds", () => {
            cy.visit('http://localhost:3000')
    
            cy.get('a[href="/login"]').click()
            cy.get('input[name="username"]').type('test')
            cy.get('input[name="password"]').type('test')
            cy.get('button').click()
    
            cy.location('pathname').should('eq', '/add')

            cy.get('button').click()

            cy.get('div').contains('name field required')
            cy.get('div').contains('image field required')
            cy.get('div').contains('quantity field required')
            cy.get('div').contains('sku field required')
            cy.get('div').contains('price field required')

            cy.location('pathname').should('eq', '/add')
        })
    })
    
    describe("Create Product Success", ()=> {

        after(() => {
            //CLEANING TEST DATA
            cy.request("DELETE", "http://localhost:8080/v1/products/1234")
        })

        it("should login redirect to add product and create a product", () => {
            cy.visit('http://localhost:3000')
    
            cy.get('a[href="/login"]').click()
            cy.get('input[name="username"]').type('test')
            cy.get('input[name="password"]').type('test')
            cy.get('button').click()
    
            cy.location('pathname').should('eq', '/add')
    
            cy.get('input[name="image"]').type('http://img-att.com')
            cy.get('input[name="name"]').type('product-test')
            cy.get('input[name="description"]').type('product-description')
            cy.get('input[name="sku"]').type('1234')
            cy.get('input[name="quantity"]').type('1')
            cy.get('input[name="price"]').type('19.99')
    
            cy.get('button').click()
    
            cy.get('div').contains('Product created with success!')
            
            cy.visit('http://localhost:3000/list')
            cy.get('h5').last().invoke('text').should('eq', 'product-test')
            cy.get('div').find('img').last().should('have.attr', 'src').should('include','http://img-att.com')
        })
    })
})
