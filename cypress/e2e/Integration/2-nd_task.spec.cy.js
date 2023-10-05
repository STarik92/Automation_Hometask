describe('User Registration Test', () => {
    it('Should allow user registration', () => {
      cy.visit('https://demowebshop.tricentis.com/');
      cy.get('.ico-register').click();  
      cy.get('#FirstName').type('Taras');
      cy.get('#LastName').type('Sirak');
      cy.get('#Email').type('sirak.taras@gmail.com');
      cy.get('#Password').type('password123');
      cy.get('#ConfirmPassword').type('password123');
      cy.get('[name="register-button"]').click();
      cy.get('.result').should('contain', 'Your registration completed');
    });
    it('Should allow user login', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.ico-login').click();
        cy.get('#Email').type('sirak.taras@gmail.com'); 
        cy.get('#Password').type('password123'); 
        cy.get('[value="Log in"]').click();       

     });
     it('Should verify that the "Computers" group has 3 sub-groups with correct names', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.top-menu a[href="/computers"]').click();
        const expectedSubgroups = ['Desktops', 'Notebooks', 'Software'];
        cy.get('.sub-category-grid .item-box h2').should(($subgroups) => {
          expect($subgroups).to.have.length(3);
          for (let i = 0; i < expectedSubgroups.length; i++) {
            expect($subgroups.eq(i)).to.contain(expectedSubgroups[i]);
          }
        });
      });

      it('Should allow sorting by different options', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        const sortingOptions = ['Name: A to Z', 'Name: Z to A', 'Price: Low to High', 'Price: High to Low'];
        sortingOptions.forEach((option) => {
          cy.get('#products-orderby').select(option);
          cy.wait(2000);
          cy.get('.product-grid .product-item').each(($item, index, $list) => {
            if (index < $list.length - 1) {
              const currentItem = $item.find('.product-title').text();
              const nextItem = $list.eq(index + 1).find('.product-title').text();
    
              switch (option) {
                case 'Name: A to Z':
                  expect(currentItem).to.be.lessThan(nextItem);
                  break;
                case 'Name: Z to A':
                  expect(currentItem).to.be.greaterThan(nextItem);
                  break;
                case 'Price: Low to High':
                  const currentPrice = parseFloat(currentItem.replace('$', '').replace(',', ''));
                  const nextPrice = parseFloat(nextItem.replace('$', '').replace(',', ''));
                  expect(currentPrice).to.be.lessThan(nextPrice);
                  break;
                case 'Price: High to Low':
                  const currentPriceHigh = parseFloat(currentItem.replace('$', '').replace(',', ''));
                  const nextPriceHigh = parseFloat(nextItem.replace('$', '').replace(',', ''));
                  expect(currentPriceHigh).to.be.greaterThan(nextPriceHigh);
                  break;
              }
            }
          });
        });
    });

    it('Should allow changing the number of items on the page', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        const desiredItemsPerPage = 4;
        cy.get('#products-pagesize').select(desiredItemsPerPage.toString());
        cy.wait(2000); 
        cy.get('.product-grid .product-item').should('have.length', desiredItemsPerPage);
      });

      it('Should allow adding an item to the wishlist', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-grid .product-item').first().click();
        cy.get('.add-to-wishlist-button').click();
        cy.get('.bar-notification').should('contain', 'The product has been added to your wishlist');
        cy.get('.wishlist-label').click();
        cy.get('.cart tbody').should('contain', 'Virtual Gift Card'); 
      });

      it('Should allow adding an item to the cart', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-item .product-title a').first().click();
        cy.get('.add-to-cart-button').click();
        cy.get('.bar-notification .content').should('contain', 'The product has been added to your shopping cart');
      });

      it('Should allow removing an item from the cart', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-item').first().find('.add-to-cart-button').click();
        cy.get('.cart-qty').should('contain', '1');
        cy.get('.cart-label').click();
        cy.url().should('include', '/cart');
        cy.get('.remove-btn').click();
        cy.get('.cart-qty').should('contain', '0');
        cy.contains('Your Shopping Cart is empty');
      });

      it('Should allow checking out an item', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('.product-grid .item-box a.title').first().click();
        cy.get('#add-to-cart-button-4').click();
        cy.get('.cart-qty').click();
        cy.get('#termsofservice').check();
        cy.get('#checkout').click();
        cy.get('#BillingNewAddress_FirstName').type('Taras');
        cy.get('#BillingNewAddress_LastName').type('Sirak');
        cy.get('#BillingNewAddress_Email').type('sirak.taras@gmail.com');
        cy.get('#BillingNewAddress_CountryId').select('Ukraine');
        cy.get('#BillingNewAddress_City').type('LVIV');
        cy.get('#BillingNewAddress_Address1').type('Shevchenka 111a');
        cy.get('#BillingNewAddress_ZipPostalCode').type('79040');
        cy.get('#BillingNewAddress_PhoneNumber').type('380777788999');
        cy.get('#shippingoption_1').check();
        cy.get('#paymentmethod_1').check();
        cy.get('#payment-info-next-step-button').click();
        cy.get('#payment-info-next-step-button').click();
        cy.get('.title').should('contain', 'Your order has been successfully processed!');
      });
});
