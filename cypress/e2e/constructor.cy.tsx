describe('Constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

    cy.intercept('POST', 'api/auth/login', {
      fixture: 'login.json'
    });

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });

    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    });

    cy.setCookie(
      'accessToken',
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OGMyZjViMTE5ZDQ1MDAxYjRmNTVkMSIsImlhdCI6MTcyMTA1NTI3MywiZXhwIjoxNzIxMDU2NDczfQ.YAP0MVANkX9bGQVV-Ndkjge0BEZGMgla1rwt7Si4Qo8`
    );
    window.localStorage.setItem(
      'refreshToken',
      '7848c013ef99b90baf09172d3ff23962362a2457a1c290a5e508c04b968fc6c133a5573b91dd38f7'
    );

    cy.visit('/');
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093c]').as('bun');
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa093e]').as('main1');
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa0946]').as('main2');
    cy.get('[data-cy=ingredient-643d69a5c3f7b9001cfa0943]').as('sauce');
    cy.get('@bun').find('button').as('bunBtn');
    cy.get('@main1').find('button').as('main1Btn');
    cy.get('@main2').find('button').as('main2Btn');
    cy.get('@sauce').find('button').as('sauceBtn');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Test loading', () => {
    it('Get ingredients request with success response', () => {
      cy.get('@bun').should('contain', 'Краторная булка N-200i');

      cy.get('@main1').should(
        'contain',
        'Филе Люминесцентного тетраодонтимформа'
      );

      cy.get('@main2').should('contain', 'Хрустящие минеральные кольца');

      cy.get('@sauce').should('contain', 'Соус фирменный Space Sauce');
    });
  });

  describe('Test adding ingredient', () => {
    it('Add ingredients to constructor by click add button on it', () => {
      cy.get('@bunBtn').click();
      cy.get('@main1Btn').click();
      cy.get('@main2Btn').click();
      cy.get('@sauceBtn').click();

      cy.get('[data-cy="bun-top-place-643d69a5c3f7b9001cfa093c"]').should(
        'exist'
      );

      cy.get('[data-cy="bun-bottom-place-643d69a5c3f7b9001cfa093c"]').should(
        'exist'
      );

      cy.get('[data-cy="ingredient-place-643d69a5c3f7b9001cfa093e"]').should(
        'exist'
      );

      cy.get('[data-cy="ingredient-place-643d69a5c3f7b9001cfa0946"]').should(
        'exist'
      );

      cy.get('[data-cy="ingredient-place-643d69a5c3f7b9001cfa0943"]').should(
        'exist'
      );
    });
  });

  describe('Test ingredient in modal', () => {
    it('Open ingredient in modal by click on it', () => {
      cy.get('@bun').click();
      cy.location('pathname').should(
        'eq',
        '/ingredients/643d69a5c3f7b9001cfa093c'
      );
      cy.get('[data-cy="ingredient-details-643d69a5c3f7b9001cfa093c"]').as(
        'bun-modal-ingredient'
      );
      cy.get('@bun-modal-ingredient').should('exist');

      cy.get('@bun-modal-ingredient')
        .find('h3')
        .should('contain', 'Краторная булка');
    });

    it('Close modal by click on close button', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-close"]').click();
      cy.location('pathname').should('eq', '/');
    });

    it('Close modal by click on overlay', () => {
      cy.get('@bun').click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('Test order', () => {
    it('Make order', () => {
      cy.get('@bunBtn').click();
      cy.get('@main1Btn').click();
      cy.get('@main2Btn').click();
      cy.get('@sauceBtn').click();

      cy.get('[data-cy="order-button"]').click();

      cy.get('[data-cy="modal-order-title"]').should('contain', '45888');

      cy.get('[data-cy="modal-close"]').click();

      cy.get('[data-cy="modal-overlay"]').should('not.exist');

      cy.get('[data-cy="burger-constructor"]')
        .find('div')
        .should('contain', 'Выберите булки');

      cy.get('[data-cy="burger-constructor"]')
        .find('ul')
        .find('div')
        .should('contain', 'Выберите начинку');
    });
  });
});
