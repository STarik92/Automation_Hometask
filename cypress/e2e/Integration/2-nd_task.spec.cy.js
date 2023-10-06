describe('User Registration Test', () => {
    it('Should allow user registration', () => {
      const randomEmail = `testuser${Math.floor(Math.random() * 100000)}@gmail.com`;

      cy.visit('https://demowebshop.tricentis.com/');
      cy.get('.ico-register').click();  
      cy.get('#FirstName').type('Taras');
      cy.get('#LastName').type('Sirak');
      cy.get('#Email').type(randomEmail);
      cy.get('#Password').type('password123');
      cy.get('#ConfirmPassword').type('password123');
      cy.get('[name="register-button"]').click();
      cy.get('[class="page registration-result-page"]').should('contain', 'Your registration completed');
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
        const expectedSubgroups = ['Desktops', 'Notebooks', 'Accessories'];
        cy.get('.sub-category-grid .item-box h2').should(($subgroups) => {
          expect($subgroups).to.have.length(3);
          for (let i = 0; i < expectedSubgroups.length; i++) {
            expect($subgroups.eq(i)).to.contain(expectedSubgroups[i]);
          }
        });
      });

    it('should allow sorting items by different options', () => {
      cy.visit('https://demowebshop.tricentis.com/apparel-shoes');
      const sortingOptions = [
        { label: 'Name: A to Z', expectedFirstItem: "50's Rockabilly Polka Dot Top JR Plus Size" },
        { label: 'Name: Z to A', expectedFirstItem: 'Wool Hat' },
        { label: 'Price: Low to High', expectedFirstItem: 'Blue Jeans' },
        { label: 'Price: High to Low', expectedFirstItem: "Women's Running Shoe" },
        { label: 'Created on', expectedFirstItem: 'Green and blue Sneaker' },
        { label: 'Position', expectedFirstItem: "50's Rockabilly Polka Dot Top JR Plus Size" },
      ];
      sortingOptions.forEach((option) => {
        cy.get('[id="products-orderby"]').select(option.label);
        cy.wait(1000); 
        cy.get('.page-body .product-title a').first().should('have.text', option.expectedFirstItem);
      });
    });

    it('Should allow changing the number of items on the page', () => {
        cy.visit('https://demowebshop.tricentis.com/accessories');
        const desiredItemsPerPage = 4;
        cy.get('#products-pagesize').select(desiredItemsPerPage.toString());
        cy.wait(2000); 
        cy.get('.product-grid .product-item').should('have.length', desiredItemsPerPage);
      });

      it('Should allow adding an item to the wishlist', () => {
        cy.visit('https://demowebshop.tricentis.com/accessories');
        cy.get('[class="product-item"]').find('[class="picture"]').eq(2).click();
        cy.get('[id="add-to-wishlist-button-65"]').click();
        cy.get('.bar-notification').should('contain', 'The product has been added to your wishlist');
        cy.contains('Wishlist').click({ multiple: true });
        cy.get('[class="cart-item-row"]').should('contain', 'TCP Public Complete'); 
      });

      it('Should allow adding an item to the cart', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('[class="product-item"]').find('[value="Add to cart"]').eq(1).click();
        cy.get('.bar-notification .content').should('contain', 'The product has been added to your shopping cart');
        cy.contains('Shopping cart').click();
        cy.get('[class="cart-item-row"]').should('contain', '14.1-inch Laptop')
      });

      it('Should allow removing an item from the cart', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('[class="product-item"]').find('[value="Add to cart"]').eq(1).click();
        cy.contains('Shopping cart').click();
        cy.get('[class="cart-item-row"]').should('be.not','empty');
        cy.get('[name="removefromcart"]').eq(0).click();
        cy.get ('[name="updatecart"]').click();
        cy.get('[class="page shopping-cart-page"]').contains('Your Shopping Cart is empty');
      });

      it('Should allow checking out an item', () => {
        cy.visit('https://demowebshop.tricentis.com/');
        cy.get('[class="product-item"]').find('[value="Add to cart"]').eq(1).click();
        cy.contains('Shopping cart').click();
        cy.get('[id="termsofservice"]').check();
        cy.get('[id="checkout"]').click();
        cy.get('[class="button-1 checkout-as-guest-button"]').click();

        cy.get('#BillingNewAddress_FirstName').type('Taras');
        cy.get('#BillingNewAddress_LastName').type('Sirak');
        cy.get('#BillingNewAddress_Email').type('sirak.taras@gmail.com');
        cy.get('#BillingNewAddress_CountryId').select('Ukraine');
        cy.get('#BillingNewAddress_City').type('LVIV');
        cy.get('#BillingNewAddress_Address1').type('Shevchenka 111a');
        cy.get('#BillingNewAddress_ZipPostalCode').type('79040');
        cy.get('#BillingNewAddress_PhoneNumber').type('380777788999');
        cy.get('#BillingNewAddress_FaxNumber').type('12345');


        cy.get('[class="tab-section allow active"]').get('[onclick="Billing.save()"]').click();
        cy.get('[class="tab-section allow active"]').get('[onclick="Shipping.save()"]').click();
        cy.get('[class="tab-section allow active"]').get('[onclick="ShippingMethod.save()"]').click();
        cy.get('[class="tab-section allow active"]').get('[onclick="PaymentMethod.save()"]').click( );
        cy.get('[class="tab-section allow active"]').get('[onclick="PaymentInfo.save()"]').click( );
        cy.get('[class="tab-section allow active"]').get('[onclick="ConfirmOrder.save()"]').click( );

        cy.get('.title').should('contain', 'Your order has been successfully processed!');
      });
});
