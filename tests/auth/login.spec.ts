import { test, expect } from "../../src/fixture/fixtures";
import { readJsonTestdata } from "../../src/helpers/commonFunctions";

const feature = 'AuthTestCases';
const dataLoader = readJsonTestdata('authenticationtestcases.json', 'tcData');
const featureData = dataLoader[feature];
const getTc = (tcName: string) => featureData.find((tc: { TCName: string }) => tc.TCName === tcName);
const tcData1 = getTc('Login User with correct email and password');

test(tcData1.TCName, async ({ landingPage, loginPage, accountPage }) => {
    test.setTimeout(100000);
    await test.step('Navigate to landing page', async () => {
        await landingPage.openWebsite();

    });

    await test.step('Verify that home page is visible successfully', async () => {
        expect(landingPage.page).toHaveTitle('Automation Exercise');
        expect(landingPage.page.url()).toBe('https://automationexercise.com/');
    });

    await test.step('Click on Signup/Login link', async () => {
        await Promise.all([
            landingPage.clickSignupLoginLink(),
            loginPage.page.waitForLoadState('load', { timeout: 50000 })
        ]);
    });

    await test.step('Enter correct email and password and click login', async () => {
        await Promise.all([
            loginPage.login(tcData1.testdata.email, tcData1.testdata.password),
            accountPage.page.waitForLoadState('load', { timeout: 50000 })
        ])
    });

    await test.step(`Verify that Logged in as ${tcData1.testdata.username} is visible`, async () => {
        const text = await accountPage.verifyUserIsLoggedIn();
        expect(text.trim()).toContain(tcData1.testdata.username);
    });
});

// Placeholder for negative test case
const tcData2 = getTc('Login User with incorrect email and password');
test(tcData2.TCName, async({landingPage,loginPage})=>{
    test.setTimeout(100000);
    await test.step('Navigate to landing page', async () => {
        await landingPage.openWebsite();

    });
        await test.step('Verify that home page is visible successfully', async () => {
        expect(landingPage.page).toHaveTitle('Automation Exercise');
        expect(landingPage.page.url()).toBe('https://automationexercise.com/');
    });

    await test.step('Click on Signup/Login link', async () => {
        await Promise.all([
            landingPage.clickSignupLoginLink(),
            loginPage.page.waitForLoadState('load', { timeout: 50000 })
        ]);
    });

    await test.step('Enter incorrect email address and password', async () => {
        await Promise.all([
            loginPage.login(tcData2.testdata.email, tcData2.testdata.password),
        ])
    });

    await test.step('Verify error Your email or password is incorrect! is visible', async () => { 
        const errorMessage = await loginPage.getLoginErrorMessage(tcData2.testdata.errorMessage);
        expect(errorMessage).toBe(tcData2.testdata.errorMessage);
    });
})