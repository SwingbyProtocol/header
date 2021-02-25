(() => {
  const testCases = ({
    width,
    height,
    name,
    theme,
  }: {
    width: number;
    height: number;
    name: string;
    theme: 'light' | 'dark';
  }) => {
    beforeEach(() => {
      cy.viewport(width, height);
    });

    it('renders correctly', () => {
      cy.visitStory({ storyId: `swingbyheader--${theme}` });
      cy.get('[data-testid="sb.header.logo"]').should('be.visible');
      cy.percySnapshot(`${name}: idle`, { widths: [width], minHeight: height });
    });

    if (width < 1280) {
      it('renders dropdown correctly', () => {
        cy.visitStory({ storyId: `swingbyheader--${theme}` });
        cy.get('[data-testid="sb.header.toggle"]').first().click();
        cy.get('[data-testid="sb.header.items.about"]').should('be.visible');
        cy.percySnapshot(`${name}: dropdown`, { widths: [width], minHeight: height });
      });
    }
  };

  describe('Narrow (light)', () => {
    testCases({ width: 320, height: 600, name: 'Narrow (light)', theme: 'light' });
  });

  describe('Narrow (dark)', () => {
    testCases({ width: 320, height: 600, name: 'Narrow (dark)', theme: 'dark' });
  });

  describe('Wide (light)', () => {
    testCases({ width: 1280, height: 600, name: 'Wide (light)', theme: 'light' });
  });

  describe('Wide (dark)', () => {
    testCases({ width: 1280, height: 600, name: 'Wide (dark)', theme: 'dark' });
  });
})();
