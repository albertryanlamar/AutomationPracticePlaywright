import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class CreatedPage {

    page:Page;
    act:Actions;
    continueButton:Locator;
    successMessage1:Locator;
    successMessage2:Locator;

    constructor(page:Page){
        this.page = page;
        this.act = new Actions();
        this.successMessage1 = this.page.locator(':text("ACCOUNT CREATED!")')
        this.successMessage2 = this.page.getByText('Congratulations! Your new account has been successfully created!')
        this.continueButton = this.page.getByRole('link', { name: 'Continue' })
    }

    async verifyAccountCreated(){
        await this.successMessage1.waitFor({state:'visible', timeout:5000});
        await this.successMessage2.waitFor({state:'visible', timeout:5000});
    }

    async clickContinue(){
        await this.act.clickSafe(this.continueButton);
    }

}