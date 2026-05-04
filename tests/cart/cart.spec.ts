import { base } from "@faker-js/faker";
import { test, expect } from "../../src/fixture/testDataFixtures";
//import { readJsonTestdata } from "../../src/helpers/commonFunctions";



//const feature = 'cartTestCases';
//const dataLoader = readJsonTestdata('cartTestCases.json','tcData');
//const featureData = dataLoader[feature];
//const getTc = (tcName:string) => featureData.find((tc:{TCName:string})=> tc.TCName === tcName);

test.describe('Cart Test Cases', () => {
    //const tcdata1= getTc('Add Products in Cart');
    /*
    test('Add Products in Cart', { tag: '@sanity' }, async ({ basePage,landingPage, productPage, cartData, cartPage }) => {
        test.setTimeout(100000);
        await test.step('Navigate to landing page', async () => {
            await basePage.navigate(process.env.BASE_URL || 'https://automationexercise.com/');
        });
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(landingPage.page).toHaveTitle('Automation Exercise');
            expect(landingPage.page.url()).toBe('https://automationexercise.com/');
        });
        await test.step(`Click 'Products' button`, async () => {
            await landingPage.clickProductsLink();
            await productPage.page.waitForLoadState('load', { timeout: 80000 });
        });

        //const products = cartData.products.map(p => p.Name);
        const products = cartData.products;
        await test.step(`Hover over first product and click 'Add to cart'`, async () => {
            await productPage.addToCart(products[0].Name);
        });

        await test.step(`Click 'Continue Shopping' button`, async () => {
            await productPage.clickContinueShopping();
        });


        await test.step(`Hover over second product and click 'Add to cart'`, async () => {
            await productPage.addToCart(products[1].Name);
        });

        await test.step(`Click 'View Cart' button`, async () => {
            await productPage.clickViewCartFromModal();
        });

        await test.step(`Verify both products are added to cart`, async () => {
            const expectedCount = await products.length;
            //const rowCount = await cartPage.itemRow.all();
            //const actualCount = rowCount.length;    
            //expect(actualCount).toBe(expectedCount);
            for (const product of products) {
                console.log('Verifying product:', product.Name);
                const result = await cartPage.verifyProductsInCart(product.Name);
                expect(result.rows).toBe(expectedCount);
                expect(result.isPresent).toBeTruthy();
                expect(result.qty).toBe(product.quantity);
                expect(result.price).toBe(product.price);
                expect(result.total).toBe(product.price * product.quantity);
            }
        });

    });
    */

    test(`Place Order: Register while Checkout`, { tag: '@regression' }, async (
        {
            landingPage,
            loginPage,
            accountPage,
            productPage,
            cartData,
            cartPage,
            checkOutPage,
            paymentDetailsPage,
            paymentConfirmationPage
        }) => {
        test.setTimeout(100000);

        await test.step('Navigate to landing page', async () => {
            await landingPage.openWebsite();
        });

        await test.step('Verify that home page is visible successfully', async () => {
            await Promise.all([
                expect(landingPage.page).toHaveTitle('Automation Exercise'),
                expect(landingPage.page.url()).toBe('https://automationexercise.com/')
            ]);
        });
        await test.step(`Click 'Products' button`, async () => {
            await landingPage.clickProductsLink();
        });
        const products = cartData.products.map(p => p.Name);
        await test.step(`Hover over first product and click 'Add to cart'`, async () => {
            await productPage.addToCart(products[0]);
        });
        await test.step(`Click 'View Cart' button`, async () => {
            await productPage.clickViewCartLink();
        });
        await test.step(`Verify both products are added to cart`, async () => {
            const expectedCount = await products.length;
            for (const product of products) {
                const result = await cartPage.verifyProductsInCart(product)
                await Promise.all([
                    expect(result.rows).toBe(expectedCount),
                    expect(result.isPresent).toBeTruthy(),
                    expect(result.qty).toBe(product.quantity),
                    expect(result.price).toBe(product.price),
                    expect(result.total).toBe(product.price * product.quantity)
                ])

            }
        });
        await test.step(`Click 'Proceed To Checkout' button`, async () => {
            await cartPage.clickProceedToCheckout();
        });
        await test.step(`Click 'Register / Login' button`, async () => {
            await Promise.all([
                cartPage.clickRegisterLoginLinkModal(),
                loginPage.page.waitForLoadState('load', { timeout: 80000 })
            ]);
        });
        await test.step(`login existing user`, async () => {
            await loginPage.login(cartData.email, cartData.password);
        });
        await test.step(`Verify that Logged in as username is visible`, async () => {
            const text = await accountPage.verifyUserIsLoggedIn();
            expect(text.trim()).toContain(cartData.username);
        });
        await test.step(``, async () => {
            await accountPage.clickCartLink();
        })
        await test.step(`Click 'Proceed To Checkout' button`, async () => {
            await cartPage.clickProceedToCheckout();
            await checkOutPage.page.waitForLoadState('domcontentloaded');
        });

        await test.step(`Verify Address Details and Review Your Order`, async () => {
            const deliveryDetails = await checkOutPage.getDeliveryDetails('delivery');
            const billingDetails = await checkOutPage.getDeliveryDetails('billing');
            expect(deliveryDetails.fullName.trim()).toBe(cartData.name);
            expect(deliveryDetails.fullAddress.trim()).toBe(cartData.address);
            expect(deliveryDetails.cityStateZip.trim()).toBe(cartData.cityStateZip);
            expect(deliveryDetails.country.trim()).toBe(cartData.country);
            expect(deliveryDetails.phone.trim()).toBe(cartData.phone);

            const reviewOrderDetails = await checkOutPage.getReviewOrderDetails(products[0]);
            expect(reviewOrderDetails.price).toBe(cartData.products[0].price);
            expect(reviewOrderDetails.qty).toBe(cartData.products[0].quantity);
            expect(reviewOrderDetails.total).toBe(cartData.products[0].price * cartData.products[0].quantity);


        });

        await test.step(` Enter description in comment text area and click 'Place Order'`, async () => {
            const comment = "This is sample comment";
            await Promise.all([
                checkOutPage.writeComment(comment),
                checkOutPage.clickPlaceOrder(),
                paymentDetailsPage.page.waitForLoadState('domcontentloaded')
            ])
        })

        await test.step(`Enter payment details: Name on Card, Card Number, CVC, Expiration date`, async () => {

            const paymentDetails = {
                "nameDetails": "dadsadsad",
                "cardNo": 12122212,
                "cvc": 311,
                "expirationDate": "May 2026"
            }

            await paymentDetailsPage.FilloutPaymentDetails(paymentDetails);
        })

        await test.step(`Click 'Pay and Confirm Order' button`, async () => {
            await paymentDetailsPage.clickPay();
            await paymentConfirmationPage.page.waitForLoadState('domcontentloaded');
        })
        await test.step(`Download the invoice'`, async () => {
            const res = await paymentConfirmationPage.clickDownloadButton();
            await expect(res.fileName).toContain('invoice');
            await expect(res.path).toBeTruthy();
        })

        await test.step(`Verify success message 'Your order has been placed successfully!'`, async () => {
            const isPresent = await paymentConfirmationPage.confirmationMessage('Your order has been placed successfully!');
            await expect(isPresent).toBeVisible();
        })

        await test.step(`Click 'Continue' button`, async () => {
            await paymentConfirmationPage.clickContinue();
            await landingPage.page.waitForLoadState('domcontentloaded');
            await expect(landingPage.page).toHaveTitle('Automation Exercise');
        })



    })

})