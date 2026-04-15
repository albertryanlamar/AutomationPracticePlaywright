import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class LoginPage{
    
    act:Actions;
    page:Page;
    emailTextBox:Locator;
    passwordTextBox:Locator;
    loginButton:Locator;
    errorContainer:Locator;

    //signup page locators
    nameTextBox:Locator;
    emailTextBoxSignup:Locator;
    signupButton:Locator;

    constructor(page: any) {

        this.page = page;
        this.act = new Actions();
        //login page locators
        this.emailTextBox = this.page.locator('[data-qa="login-email"]');
        this.passwordTextBox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.errorContainer = this.page.locator('.login-form');

        //signup page locators
         this.nameTextBox = page.getByRole('textbox', { name: 'Name' })
         this.emailTextBoxSignup = this.page.locator("//input[@data-qa='signup-email']");
         this.signupButton = this.page.getByRole('button', { name: 'Signup' });

    }
    
    //login page methods
    async login(email: string, password: string) {
        await this.act.fillSafe(this.emailTextBox, email);
        await this.act.fillSafe(this.passwordTextBox, password);
        await this.act.clickSafe(this.loginButton);
    }
    async getLoginErrorMessage(message:string){ 
        return await this.errorContainer.getByText(message).innerText();
    }
   
    //signup page methods
    async signup(name: string, email: string) {
        await this.act.fillSafe(this.nameTextBox, name);
        await this.act.fillSafe(this.emailTextBoxSignup, email);
        await this.act.clickSafe(this.signupButton);
    }
}