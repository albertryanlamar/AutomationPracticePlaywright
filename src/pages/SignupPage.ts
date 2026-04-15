import {Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class SignupPage {

    page:Page;
    act:Actions
    passwordTextbox:Locator;
    fnameTextBox:Locator
    lnameTextBox:Locator

    constructor(page:Page) {
        this.act = new Actions();
        this.page = page;
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password *' });
        page.getByRole('radio')//two elements
        page.locator('select[name="days"]')
        page.locator('select[name="months"]')
        page.locator('select[name="years"]')
        page.getByRole('checkbox', { name: 'Sign up for our newsletter!' })
        page.getByRole('checkbox', { name: 'Receive special offers from our partners!' })
        this.fnameTextBox = this.page.getByRole('textbox', { name: 'First name *' })
        this.lnameTextBox = this.page.getByRole('textbox', { name: 'Last name *' })
        page.locator('[name="company"]')//optional
        page.locator('#address1')
        page.locator('#address2')//optional
        page.getByRole('combobox', { name: 'Country *' })
        page.getByRole('textbox', { name: 'State *' })
        page.getByRole('textbox', { name: 'City *' })
        page.locator('[name="zipcode"]')
        page.getByLabel('Mobile Number *')
        page.getByRole('button', { name: 'Create Account' })
    }

    async fillForm(password:string,fname:string,lname:string,address1:string,country:string,state,city,zipcode,mobilenumber,company?,title?,bday?,address2?){
        //accoount information
        if(title)
        {
          
        }
        await this.act.fillSafe(this.passwordTextbox,password);
        // addressinformation
        await this.act.fillSafe(this.fnameTextBox,fname);
        await this.act.fillSafe(this.lnameTextBox,lname);

    
    }




}