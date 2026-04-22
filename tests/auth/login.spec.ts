import { test, expect } from "../../src/fixture/fixtures";
import { readJsonTestdata } from "../../src/helpers/commonFunctions";
import { faker } from '@faker-js/faker';

const feature = 'AuthTestCases';
const dataLoader = readJsonTestdata('authenticationtestcases.json', 'tcData');
const featureData = dataLoader[feature];
const getTc = (tcName: string) => featureData.find((tc: { TCName: string }) => tc.TCName === tcName);

test.describe('Authentication Test Cases', () => {

    const tcData1 = getTc('Login User with correct email and password');
    test(tcData1.TCName, {tag:'@regression'}, async ({ landingPage, loginPage, accountPage }) => {
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
                loginPage.page.waitForLoadState('load', { timeout: 80000 })
            ]);
        });

        await test.step('Enter correct email and password and click login', async () => {
            await Promise.all([
                loginPage.login(tcData1.testdata.email, tcData1.testdata.password),
                accountPage.page.waitForLoadState('load', { timeout: 80000 })
            ])
        });

        await test.step(`Verify that Logged in as ${tcData1.testdata.username} is visible`, async () => {
            const text = await accountPage.verifyUserIsLoggedIn();
            expect(text.trim()).toContain(tcData1.testdata.username);
        });
    });

     /*
    // Placeholder for negative test case
    const tcData2 = getTc('Login User with incorrect email and password');
    test(tcData2.TCName, async ({ landingPage, loginPage }) => {
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
    */
    const tcData3 = getTc('Register User')
    test(tcData3.TCName, {tag:'@regression'},async ({ landingPage, loginPage, singupPage, createdPage, accountPage, deletedPage }) => {
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
                loginPage.page.waitForLoadState('load', { timeout: 80000 })
            ]);
        });

        const data = tcData3.testdata;
        const dataform = {
            //name: data.name ? data.name : faker.person.firstName(),
            fname: data.firstName ? data.firstName : faker.person.firstName(),
            lname: data.lastName ? data.lastName : faker.person.lastName(),
            email: data.email ? data.email : faker.internet.email(),
            password: data.password ? data.password : faker.internet.password(),
            country: data.country ? data.country : faker.location.country(),
            state: data.state ? data.state : faker.location.state(),
            city: data.city ? data.city : faker.location.city(),
            zipcode: data.zipcode ? data.zipcode : faker.location.zipCode(),
            mobilenumber: data.mobilenumber ? data.mobilenumber : faker.phone.number(),
            company: data.company ? data.company : faker.company.name(),
            title: data.title ? data.title : 'Mr',
            address2: data.address2 ? data.address2 : faker.location.streetAddress(),
            address1: data.address1 ? data.address1 : faker.location.streetAddress()

        }

        await test.step(' Enter name and email address and click signup', async () => {
            await Promise.all([
                loginPage.signup(dataform.fname, dataform.email),
                singupPage.page.waitForLoadState('load', { timeout: 80000 })
            ]);
        })

        await test.step('Fill details: Title, Name, Email, Password, Date of birth', async () => {
            await singupPage.fillForm(dataform);
        });

        await test.step('Click Create Account button', async () => {
            await singupPage.clickCreateAccount();
        });
        await test.step('Verify that ACCOUNT CREATED! is visible', async () => {
            await createdPage.verifyAccountCreated();
        });
        await test.step('Click Continue button', async () => {
            await Promise.all([
                createdPage.clickContinue(),
                accountPage.page.waitForLoadState('domcontentloaded', { timeout: 80000 })
            ]);
        });
        await test.step('Verify that Logged in as username is visible', async () => {
        });

        await test.step(`Verify that Logged in as ${dataform.fname} is visible`, async () => {
            const text = await accountPage.verifyUserIsLoggedIn();
            expect(text.trim()).toContain(dataform.fname);
        });

        await test.step(`Click 'Delete Account' button`, async () => {
            await Promise.all([
                accountPage.clickDeleteAccountLink(),
                accountPage.page.waitForLoadState('domcontentloaded', { timeout: 80000 })
            ]);
        });

        await test.step(`Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button`, async () => {
            await Promise.all([
                deletedPage.verifyAccountDeleted(),
                deletedPage.clickContinue(),
                landingPage.page.waitForLoadState('domcontentloaded', { timeout: 80000 })
            ]);
        });
    })

   const tcData4 = getTc('Register User with existing email');
   test(tcData4.TCName,{tag:'@regression'}, async ({landingPage, loginPage, singupPage, createdPage, accountPage, deletedPage }) => {
       
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
                loginPage.page.waitForLoadState('load', { timeout: 80000 })
            ]);
        });

        await test.step('Enter name and already registered email address and click signup', async () => {
            await Promise.all([
                loginPage.signup(tcData4.testdata.existingName, tcData4.testdata.existingEmail),
                loginPage.getsignupErrorMessage(tcData4.testdata.errorMessage)         
            ])
        })
    })
})