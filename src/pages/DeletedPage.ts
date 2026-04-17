import { Page,Locator } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class DeletedPage{

    page:Page;
    act:Actions;
    accountDeletedLocator:Locator;
    accountDeletedTextLocator:Locator;
    continueButtonLocator:Locator;


    constructor(page:Page){
        this.page = page;
        this.act = new Actions();
        this.accountDeletedLocator = page.locator('b:has-text("ACCOUNT DELETED!")');
        this.accountDeletedTextLocator = page.getByText('Your account has been permanently deleted!');
        this.continueButtonLocator = page.getByRole('link', { name: 'Continue' });
    } 
    
    async verifyAccountDeleted(){
        await this.accountDeletedLocator.waitFor({state:'visible', timeout:5000});
        await this.accountDeletedTextLocator.waitFor({state:'visible', timeout:5000});
    }

    async clickContinue(){
        await this.act.clickSafe(this.continueButtonLocator);
    }
}