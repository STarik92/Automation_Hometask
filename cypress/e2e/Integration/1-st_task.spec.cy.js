describe ('Firts part of tests', () => {
  context ('1080 resolution', () => {
  beforeEach (() => {
    cy.viewport (1920,1080)
  })
    it ('Should contain the same title', () => {
        cy.visit ('https://www.epam.com/')
        cy.title('[property="og:title"]').should('be.equal','EPAM | Software Engineering & Product Development Services')

    });

    it('Switches between Light and Dark mode', () => {
      cy.visit('https://www.epam.com/');
      cy.get('[class="switch"]').click({multiple:true, force:true});
      cy.get('body').should('not.have.class', 'dark-mode');

    });

    it('Should change the site language to UA', () => {
      cy.visit('https://www.epam.com');
      cy.get('[class="location-selector__button"]').click({force: true});
      cy.get('a[href="https://careers.epam.ua"').click({force: true, multiple: true}); 
    });

    it('should check the policies list', () => {
      cy.visit('https://www.epam.com/');
      cy.scrollTo('bottom');
      cy.get('[class="footer-inner"]')
        .contains('INVESTORS')
        .should('be.visible');
      cy.get('[class="footer-inner"]')
        .contains('COOKIE POLICY')
        .should('be.visible');
      cy.get('[class="footer-inner"]')
        .contains('OPEN SOURCE')
        .should('be.visible');
      cy.get('[class="footer-inner"]')
        .contains('APPLICANT PRIVACY NOTICE')
        .should('be.visible');
      cy.get('[class="footer-inner"]')
        .contains('PRIVACY POLICY')
        .should('be.visible');
      cy.get('[class="footer-inner"]')
        .contains('WEB ACCESSIBILITY')
        .should('be.visible');
    });

    it("should allow switching location list by region", () => {
      cy.visit ('https://www.epam.com/')
      cy.contains("Our Locations").click();

      cy.get('[class="tabs-23__link js-tabs-link active"]').should("contain", "AMERICAS");
      cy.get('[class="tabs-23__link js-tabs-link"]').eq(0).should("contain", "EMEA");
      cy.get('[class="tabs-23__link js-tabs-link"]').eq(1).should("contain", "APAC");
  
      cy.contains("AMERICAS").click();
      cy.get('[class="locations-viewer"]').should("be.visible");
  
      cy.contains("EMEA").click();
      cy.get('[class="locations-viewer"]').should("be.visible");

      cy.contains("APAC").click();
      cy.get('[class="locations-viewer"]').should("be.visible");
    });

      it('Should open the search field and show search results for "AI"', () => {
        cy.visit('https://www.epam.com/');
        cy.get('[class="search-icon dark-iconheader-search__search-icon"]').click();
        cy.get('[class="search-results__input-holder"').type('AI').type('{enter}');
        cy.get('[class="search-ui-23"]', { timeout: 10000 }).should('be.visible');
      });

      it('Should check validation for required fields', () => {
        cy.visit('https://www.epam.com/about/who-we-are/contact'); 
        cy.get('[class="button-ui"]').click();
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name"]').should('have.attr', 'aria-invalid', 'true');
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name"]').trigger('mouseover')
        cy.get('[ class="validation-tooltip"]').should('be.visible').and('contain', 'This is a required field')

        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name"]').should('have.attr', 'aria-invalid', 'true');
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name"]').trigger('mouseover')
        cy.get('[ class="validation-tooltip"]').should('be.visible').and('contain', 'This is a required field');

        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email"]').should('have.attr', 'aria-invalid', 'true');
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email"]').trigger('mouseover')
        cy.get('[ class="validation-tooltip"').should('be.visible').and('contain', 'This is a required field');

        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone"]').should('have.attr', 'aria-invalid', 'true');
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone"]').trigger('mouseover')
        cy.get('[ class="validation-tooltip"').should('be.visible').and('contain', 'This is a required field');

        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about"]').should('have.attr', 'aria-required', 'true');
        cy.get('[id="_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about"]').trigger('mouseover',{force: true})
        cy.get('[ class="validation-tooltip"').should('be.visible').and('contain', 'This is a required field');

        cy.get('[class="checkbox-ui"]').should('have.attr', 'data-required', 'true');
        cy.get('[class="checkbox__holder validation-field"]').trigger('mouseover',{force: true})
        cy.get('[ class="validation-tooltip"').should('be.visible').and('contain', 'Please check this box if you want to proceed');
      });

      it('Should navigate to the main page when clicking the company logo', () => {
        cy.visit('https://www.epam.com/about'); 
        cy.get('[class="header__logo-container desktop-logo"]').click({multiple: true});
        cy.url().should('be.equal', 'https://www.epam.com/');

      });

      it('Should download a file with the correct name and extension', () => {
        cy.visit('https://www.epam.com/about'); 
        cy.contains('DOWNLOAD').click({ multiple: true });

        const expectedFileName = 'EPAM_Corporate_Overview_2023.pdf';
        cy.exec(`find ~/Downloads -name "${expectedFileName}"`).then(({ stdout }) => {
          expect(stdout.trim()).to.eq(`/Users/Taras_Sirak/Downloads/${expectedFileName}`);
    });
  });

    });
});
