import normalizeUrl from 'normalize-url';

const REAL_BASE = 'http://simplesmiler.com';
const BASE = Cypress.env('BASE') || REAL_BASE;
const MVVM_RAMBLINGS_BASE = `${BASE}/mvvm-ramblings`;

function niceUrl(href) {
  return normalizeUrl(href + '/', { removeTrailingSlash: false });
}

function canonicalUrl(href) {
  let relativeHref = niceUrl(href).slice(BASE.length);
  return REAL_BASE + relativeHref;
}

describe('MVVM Ramblings', () => {

  it('should open automatically from the root domain', () => {
    cy.visit(BASE);
    cy.url().should('eq', niceUrl(MVVM_RAMBLINGS_BASE));
  });

  describe('Content pages', () => {

    afterEach(() => {
      // @NOTE: branding

      cy.url()
        .should('include', `mvvm-ramblings`);

      cy.title()
        .should('include', 'MVVM Ramblings');

      cy.get('h1:first')
        .should('contain', 'MVVM Ramblings');

      // @NOTE: authorship

      cy.get('meta[name=author]')
        .invoke('attr', 'content')
        .should('eq', 'Denis Karabaza');

      // @NOTE: keywords in description

      ['Vue', 'MVVM'].forEach(target => {
        cy.get('meta[name=description]')
          .invoke('attr', 'content')
          .should('include', target);
      });

      // @NOTE: correct canonical
      cy.url()
        .then(url => {
          cy.get('link[rel=canonical]')
            .invoke('attr', 'href')
            .should('eq', canonicalUrl(url));
        });
    });

    specify('Index', () => {
      cy.visit(niceUrl(MVVM_RAMBLINGS_BASE));
      cy.url().should('eq', niceUrl(MVVM_RAMBLINGS_BASE));
    });

    specify('Archives', () => {
      cy.visit(niceUrl(MVVM_RAMBLINGS_BASE + '/archives'));
      cy.url().should('eq', niceUrl(MVVM_RAMBLINGS_BASE + '/archives'));
    });

  });

});
