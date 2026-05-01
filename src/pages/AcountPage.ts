import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class AccountPage {

    
    page: Page;
    act:Actions;
    userIndicator:Locator;
    accountPageHomeLink:Locator;
    deleteAccountLink:Locator;
    logoutLink:Locator;
    cartLink:Locator;

    constructor(page:Page){
        this.act = new Actions();
        this.page = page;
        this.userIndicator = this.page.locator('li a b');
        this.accountPageHomeLink = this.page.getByRole('link', { name: 'Home' });
        this.deleteAccountLink=this.page.getByRole('link', { name: 'Delete Account' })
        this.logoutLink = page.getByRole('link', { name: 'Logout' })
        this.cartLink = page.getByRole('link', { name: 'Cart' }).first();
    }
    
    //accountpage methods

    async verifyUserIsLoggedIn(){
        await this.userIndicator.waitFor({state:'visible', timeout:5000});
        return await this.userIndicator.innerText();
    }

    async clickHomeLink(){
        await this.act.clickSafe(this.accountPageHomeLink);
    }

    async clickDeleteAccountLink(){
        await this.act.clickSafe(this.deleteAccountLink);
    }

    async clickLogoutLink(){
        await this.act.clickSafe(this.logoutLink);
    }

    async clickCartLink(){
        await this.act.clickSafe(this.cartLink);
    }




}