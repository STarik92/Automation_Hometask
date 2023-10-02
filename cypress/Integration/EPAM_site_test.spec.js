describe ('Firts part of tests', () => {
    it ('Should contain the same title', () => {
        cy.visit ('https://www.epam.com/')
        cy.title().should('eg','EPAM | Software Engineering & Product Development Services')

    });
    it('Should switch the theme toggle to the opposite state', () => {
        cy.visit('https://www.epam.com/');
        cy.get('theme-switcher').as('themeToggle');
        cy.get('@themeToggle').invoke('attr', 'aria-checked').as('initialToggleState');
        cy.get('@themeToggle').click();
        cy.get('@themeToggle').invoke('attr', 'aria-checked').as('updatedToggleState');
        cy.get('@initialToggleState').then((initialState) => {
          cy.get('@updatedToggleState').should('not.equal', initialState);
        });
      });
      it('Should switch the site\'s language to Ukrainian', () => {
        cy.visit('https://www.epam.com'); 
        cy.get('location-selector__button-language').as('languageSwitcher');
        cy.get('@languageSwitcher').invoke('location-selector__button-language-prefix').as('initialLanguage');
        cy.get('@languageSwitcher').click();
        cy.get('aria/Україна (Українська)').click();
        cy.get('@languageSwitcher').invoke('location-selector__button-language-prefix').as('updatedLanguage');
        cy.get('@updatedLanguage').should('eq', 'UA'); 
      });
      it('Should include specific items in the policies list', () => {
        cy.visit('https://www.epam.com/'); 
        cy.get('[class=policies]').as('policiesList');
        const expectedItems = [
          'INVESTORS',
          'COOKIE POLICY',
          'OPEN SOURCE',
          'APPLICANT PRIVACY NOTICE',
          'PRIVACY POLICY',
          'WEB ACCESSIBILITY',
        ];
        cy.get('@policiesList').invoke('fat-links').then((listText) => {
          expectedItems.forEach((item) => {
            expect(listText).to.include(item);
          });
        });
      });
      it('Should present 3 regions (AMERICAS, EMEA, APAC) and switch between them', () => {
        cy.visit('https://www.epam.com/');
        const expectedRegions = ['AMERICAS', 'EMEA', 'APAC'];
        cy.get('data-item').as('regions');
        cy.get('@regions').should('have.length', expectedRegions.length);
        cy.get('@regions').each(($region, index) => {
          cy.wrap($region).should('contain', expectedRegions[index]);
        });
        expectedRegions.forEach((region) => {
          cy.get('@regions').contains(region).click();
          cy.get('locations-viewer').as('locationList');
          cy.get('@locationList').should('be.visible');
        });
      });
      it('Should open the search field and show search results for "AI"', () => {
        cy.visit('https://www.epam.com/');
        cy.get('span.search-icon').click();
        cy.get('#new_form_search').type('AI').type('{enter}');
        cy.get('#search-ui-23', { timeout: 10000 }).should('be.visible');
      });
      it('Should check validation for required fields', () => {
        cy.visit('https://www.epam.com/about/who-we-are/contact'); 
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor button').click();
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_first_name').should('have.attr', 'aria-invalid', 'true');
        cy.get('validation-text').should('be.visible').and('contain', 'This field is required');
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_last_name').should('have.attr', 'aria-invalid', 'true');
        cy.get('validation-text').should('be.visible').and('contain', 'This field is required');
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_email').should('have.attr', 'aria-invalid', 'true');
        cy.get('validation-text').should('be.visible').and('contain', 'This field is required');
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_phone').should('have.attr', 'aria-invalid', 'true');
        cy.get('validation-text').should('be.visible').and('contain', 'This field is required');
        cy.get('#_content_epam_en_about_who-we-are_contact_jcr_content_content-container_section_section-par_form_constructor_user_comment_how_hear_about-label').should('have.attr', 'aria-invalid', 'true');
        cy.get('validation-text').should('be.visible').and('contain', 'This field is required');
      });
      it('Should navigate to the main page when clicking the company logo', () => {
        cy.visit('https://www.epam.com/about'); 
        cy.get('header__logo header__logo-light').click();
        cy.url().should('eq', 'https://www.epam.com/ ');
      });
      it('Should download a file with the correct name and extension', () => {
        cy.visit('https://www.epam.com/about'); 
        cy.contains('Dowload').click();
        const expectedFileName = 'EPAM_Corporate_Overview_2023';
        const expectedFileExtension = 'pdf';
        cy.wait(5000); 

        cy.task('listFiles', 'downloads').then((files) => {
          const downloadedFile = files.find((file) => {
            return file.includes(expectedFileName) && file.endsWith(expectedFileExtension);
          });

          expect(downloadedFile).to.exist;
        });
      });
});
