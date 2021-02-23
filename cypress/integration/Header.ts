(() => {
  const testCases = ({ width, height, name }: { width: number; height: number; name: string }) => {
    beforeEach(() => {
      cy.viewport(width, height);
    });

    it('renders correctly', () => {
      cy.visitStory({ storyId: 'swingbyheader--default' });
      cy.get('[data-testid="sb.header.logo"]').should('be.visible');
      cy.percySnapshot(`${name}: idle`, { widths: [width], minHeight: height });
    });

    if (width < 1280) {
      it('renders dropdown correctly', () => {
        cy.visitStory({ storyId: 'swingbyheader--default' });
        cy.get('[data-testid="sb.header.toggle"]').first().click();
        cy.get('[data-testid="sb.header.items.about"]').should('be.visible');
        cy.percySnapshot(`${name}: dropdown`, { widths: [width], minHeight: height });
      });
    }
  };

  describe('Narrow', () => {
    testCases({ width: 320, height: 600, name: 'Narrow' });
  });

  describe('Wide', () => {
    testCases({ width: 1280, height: 600, name: 'Wide' });
  });
})();
