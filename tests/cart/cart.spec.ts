import { test, expect } from "../../src/fixture/fixtures";
import { readJsonTestdata } from "../../src/helpers/commonFunctions";



const feature = 'cartTestCases';
const dataLoader = readJsonTestdata('cartTestCases.json','tcData');
const featureData = dataLoader[feature];
const getTc = (tcName:string) => featureData.find((tc:{TCName:string})=> tc.TCName === tcName);

test.describe('Cart Test Cases', () => {
     const tcdata1= getTc('Add Products in Cart');
     test(tcdata1.TCName, {tag:'@regression'}, async ({ landingPage, productsPage, cartPage }) => {
        test.setTimeout(100000);
        await test.step('Navigate to landing page', async () => {
            await landingPage.openWebsite();
        });
        await test.step('Verify that home page is visible successfully', async () => {
            expect(landingPage.page).toHaveTitle('Automation Exercise');
            expect(landingPage.page.url()).toBe('https://automationexercise.com/');
        });
        await test.step(`Click 'Products' button`,async () => {
            await landingPage.clickProductsLink(); 
        });

     });




})