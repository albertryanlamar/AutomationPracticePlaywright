import { Locator, Page } from "@playwright/test";

export class AccountPage {

    
    page: Page;
    userIndicator:Locator;
    accountPageHomeLink:Locator;

    constructor(page:Page){
        this.page = page;
        this.userIndicator = this.page.locator('li a b');
        this.accountPageHomeLink = this.page.getByRole('link', { name: 'Home' });
    }
    
    //accountpage methods

    async verifyUserIsLoggedIn(){
        await this.userIndicator.waitFor({state:'visible', timeout:5000});
        return await this.userIndicator.innerText();
    }

}