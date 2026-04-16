import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class LandingPage {

    page: Page;
    act:Actions;
    productsLink:Locator;
    cartLink:Locator;
    signupLoginLink:Locator;

    constructor(page:Page) {
        this.act = new Actions();
        this.page = page;
        this.productsLink = this.page.getByRole('link', { name: 'Products' });
        this.cartLink = this.page.getByRole('link', { name: 'Cart' });
        this.signupLoginLink = this.page.getByRole('link', { name: 'Signup / Login' });
    }
   

  //landing page methods
   async navigateToLandingPage() {
        await this.page.goto(process.env.BASE_URL || 'https://automationexercise.com/');

   }

   async verifyLandingPageTitle(){
     await this.act.assertText(this.page.locator('title'), 'Automation Exercise');
   }   
   async openWebsite(){
    await this.navigateToLandingPage();
    //await this.page.waitForLoadState('domcontentloaded',{timeout:50000});   
   }  
   async clickSignupLoginLink(){
    await this.act.clickSafe(this.signupLoginLink);
   }
   
   async clickProductsLink(){
    await this.act.clickSafe(this.productsLink);
   }
   
   async clickCartLink(){
    await this.act.clickSafe(this.cartLink);
   }

}