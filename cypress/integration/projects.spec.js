context('Projects', () => {

    it('Check projects and form', () => {
    	cy.fixture('projects').as('projects')
    	cy.server()
    	cy.route('GET', '/api/projects?', '@projects')
    	cy.visit('http://localhost:3000')
    	
    	cy.get('.logo')
    	cy.get('*[name="client_full_name"]')
    	cy.get('*[name="project_number"]')
    	cy.get('*[name="address"]')

    	cy.get('.filter__link').click()
    	cy.get('.filter__link').contains('Less options')
    	cy.get('*[name="state"]')
    	cy.get('*[name="partner"]')
    	cy.get('*[name="staff"]')
    	cy.get('*[name="eta_status"]')
    	cy.get('*[name="communication"]')
    	cy.get('*[name="stage_title"]')

    	cy.get('.filter__link').click()
    	cy.get('*[name="state"]').should('not.be.visible')
    	cy.get('*[name="partner"]').should('not.be.visible')
    	cy.get('*[name="staff"]').should('not.be.visible')
    	cy.get('*[name="eta_status"]').should('not.be.visible')
    	cy.get('*[name="communication"]').should('not.be.visible')
    	cy.get('*[name="stage_title"]').should('not.be.visible')
    	
    	cy.get('.filter__button')
    	cy.get('.projects__title')
    	cy.get('.project:first .project__number').contains('SD999')
    	cy.get('.project:first .project__name')
    	cy.get('.project:first .project__client')
    	cy.get('.project:first .project__stage')
    	cy.get('.pag')
    })

    it('No results', () => {
    	cy.get('*[name="project_number"]').type('fjdkslfjdslk')
    	cy.get('.filter__button').click()
    	cy.get('.projects__noresults').contains('No results found')
    	cy.get('.pag').should('not.be.visible')
    })

    it('Pagination', () => {
    	cy.fixture('projects').as('projects')
    	cy.server()
    	cy.route('GET', '/api/projects?*', '@projects')
    	cy.get('.filter__button').click()
    	cy.get('.project:first .project__number').contains('SD999')
    	cy.get('.pag a').contains('2').click()
    	cy.get('.project:first .project__number').contains('SD999')
    })
})
