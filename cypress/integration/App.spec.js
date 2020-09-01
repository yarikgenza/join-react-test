/// <reference types="cypress" />

const endpoint = "http://localhost:4000";

const candidate = { // TODO: convert it to dynamic fixture
  fullName: 'generic user',
  password: '123',
  phone: '+38034565435654',
  email: 'user@example.com',
}

context('General / Meta', () => { 
    before(() => {
      cy.visit(endpoint);
    });

    it('page should have correct title', () => {
      cy.title().should('be', 'JOIN [front-end] assigment');
    });
});

context('General / rendering & routing', () => {
  before(() => {
    cy.visit(endpoint);
  });

  it ('should redirect to [apply] route by-default', () => {
    cy.url().should('include', '/apply');
  });

  it ('should render [apply] screen', () => {
    cy.get('[data-cy="apply_screen:form_title"]').contains('Apply to position');
  });
});

context('Apply screen / Form', () => {
  before(() => {
    cy.visit(endpoint);
  });

  it(`Fill in fullName"`, () => {
    cy.get('[data-cy="apply_screen:form:fullName"]')
      .type(candidate.fullName);
  })

  it(`Fill in password"`, () => {
    cy.get('[data-cy="apply_screen:form:password"]')
      .type(candidate.password);
  })

  it(`Fill in phone"`, () => {
    cy.get('[data-cy="apply_screen:form:phone"]')
      .type(candidate.phone);
  })

  it(`Fill in email"`, () => {
    cy.get('[data-cy="apply_screen:form:email"]')
      .type(candidate.email)
  })

  it('submit -> redirects to candidates screen', () => {
    cy.get('[data-cy="apply_screen:form:submit"]').click();

    cy.url().should('contain', '/candidates');
  })

  it ('check if candidates list has newly created candidate', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`);
  })
})


context('Candidates Screen', () => {
  before(() => {
    cy.visit(endpoint);
  });

  it ('navigate to candidates screen', () => {
    cy.get('[data-cy="header:candidates_link"]').click();

    cy.url().should('contain', '/candidates');
  });

  it ('candidate should be listed', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`);
  });

  it ('candidate card should have fullName', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`).contains(candidate.fullName);
  })

  it ('candidate card should have email', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`).contains(candidate.email);
  })

  it ('candidate card should have phone', () => {
    cy.get(`[data-cy="candidate_card_content:${candidate.fullName}"]`).contains(candidate.phone);
  })

  it ('candidate card should have correct score', () => {
    cy.get(`[data-cy="candidate_card_content:${candidate.fullName}"]`).contains('100%');
  })

  it ('candidate should have `submitted` state', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`).contains('submitted');
  })
});

context('Candidates Screen / Interactions', () => {
  before(() => {
    cy.visit(endpoint);
  });

  it ('navigate to candidates screen', () => {
    cy.get('[data-cy="header:candidates_link"]').click();

    cy.url().should('contain', '/candidates');
  });

  it ('candidate should be listed', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`);
  });

  it ('Set new status to candidate', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`)
      .find('[data-cy="candidate_card:menu_btn"]')
      .first()
      .click()

    cy
      .get('[data-cy="candidate_card:update_state_btn"]:visible')
      .click()

    cy.get('[data-cy="state_selector:not a fit"]')
      .click()

    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`)
      .first()
      .contains('not a fit')
  })

  it('delete (hide) candidate', () => {
    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`)
      .find('[data-cy="candidate_card:menu_btn"]')
      .first()
      .click()

    cy
      .get('[data-cy="candidate_card:delete_btn"]:visible')
      .click()

    cy.get(`[data-cy="candidate_card:${candidate.fullName}"]`).should('not.exist');
  })
})