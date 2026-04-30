import {test,expect} from "../../src/fixture/testDataFixtures";
//import { readJsonTestdata } from "../../src/helpers/commonFunctions";



//const feature = 'cartTestCases';
//const dataLoader = readJsonTestdata('cartTestCases.json','tcData');
//const featureData = dataLoader[feature];
//const getTc = (tcName:string) => featureData.find((tc:{TCName:string})=> tc.TCName === tcName);

test.describe('Cart Test Cases', () => {
     //const tcdata1= getTc('Add Products in Cart');
     test('Add Products in Cart', {tag:'@sanity'}, async ({ landingPage,productPage,cartData,cartPage }) => {
        test.setTimeout(100000);
        await test.step('Navigate to landing page', async () => {
            await landingPage.openWebsite();
        });
        await test.step('Verify that home page is visible successfully', async () => {
            await expect(landingPage.page).toHaveTitle('Automation Exercise');
             expect(landingPage.page.url()).toBe('https://automationexercise.com/');
        });
        await test.step(`Click 'Products' button`,async () => {
            await landingPage.clickProductsLink(); 
        });
        
        const products = cartData.products.map(p => p.Name);

        await test.step(`Hover over first product and click 'Add to cart'`,async () => {
            await productPage.addToCart(products['0']);
        });

        await test.step(`Click 'Continue Shopping' button`,async () => {
            await productPage.clickContinueShopping();
        });

        
        await test.step(`Hover over second product and click 'Add to cart'`,async () => {
            await productPage.addToCart(products[1]);
        });
        
        await test.step(`Click 'View Cart' button`,async () => {
            await productPage.clickViewCartFromModal();
        });

        await test.step(`Verify both products are added to cart`,async () => {
            const expectedCount = await products.length;
            const actualCount = await cartPage.itemRow.count();
            expect(actualCount).toBe(expectedCount);
            for(const product of products){
                const isPresent = await cartPage.verifyProductsInCart(product);
                expect(isPresent).toBeTruthy();
            }
        });

     });




})