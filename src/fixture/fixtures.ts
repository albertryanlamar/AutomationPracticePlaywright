import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import { AccountPage } from "../pages/AcountPage";



type MyFixtures = {
    landingPage: LandingPage;
    loginPage:LoginPage;
    basePage:BasePage;
    accountPage:AccountPage;
}

export const test = base.extend<MyFixtures>({
    landingPage: async ({ page }, use) => {
        const landingPage = new LandingPage(page);
        await use(landingPage);
    },
    loginPage:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    basePage:async({page},use)=>{
        const basePage = new BasePage(page);
        await use(basePage);    
    },
    accountPage:async({page},use)=>{
        const accountPage = new AccountPage(page);
        await use(accountPage);
    }   

})

export { expect } from "@playwright/test";