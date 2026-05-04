import { test as base } from "@playwright/test";
import { LandingPage } from "../pages/landingPage";
import { LoginPage } from "../pages/LoginPage";
import { BasePage } from "../pages/BasePage";
import { AccountPage } from "../pages/AcountPage";
import { SignupPage } from "../pages/SignupPage";
import { CreatedPage } from "../pages/CreatedPage";
import { DeletedPage } from "../pages/DeletedPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import {PaymentDetailsPage} from "../pages/PaymentDetailsPage";
import { PaymentConfirmationPage } from "../pages/PaymentConfirmationPage";



type MyFixtures = {
    landingPage: LandingPage;
    loginPage:LoginPage;
    basePage:BasePage;
    accountPage:AccountPage;
    singupPage:SignupPage;
    createdPage:CreatedPage;
    deletedPage:DeletedPage;
    productPage:ProductPage;
    cartPage:CartPage;
    checkOutPage:CheckoutPage;
    paymentDetailsPage:PaymentDetailsPage;
    paymentConfirmationPage:PaymentConfirmationPage
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
    },  
    singupPage:async({page},use)=>{
        const signupPage = new SignupPage(page);
        await use(signupPage);
    },
    createdPage:async({page},use)=>{
        const createdPage = new CreatedPage(page);
        await use(createdPage);
    },
    deletedPage:async({page},use)=>{
        const deletedPage = new DeletedPage(page);
        await use(deletedPage);
    },
    productPage:async({page},use)=>{
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    cartPage:async({page},use)=>{
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkOutPage:async({page},use) => {
        const checkOutPage = new CheckoutPage(page);
        await use(checkOutPage); 
    },
    paymentDetailsPage:async({page},use)=>{
       const paymentDetailsPage = new PaymentDetailsPage(page);
       await use(paymentDetailsPage);
    },
    paymentConfirmationPage: async ({page}, use)=>{
      const paymentConfirmationPage = new PaymentConfirmationPage(page);
      await use(paymentConfirmationPage);

    }


});