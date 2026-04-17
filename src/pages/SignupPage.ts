import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class SignupPage {

    page: Page;
    act: Actions
    passwordTextbox: Locator;
    fnameTextBox: Locator
    lnameTextBox: Locator
    newsLetterCheckBox: Locator
    offersCheckBox: Locator
    companyTextBox: Locator
    address1TextBox: Locator;
    address2TextBox: Locator;
    countryTextBox: Locator;
    stateTextBox: Locator;
    cityTextBox: Locator;
    zipcodeTextBox: Locator;
    mobilenumberTextBox: Locator;
    createAccountButton: Locator;
    nameTextBox: Locator;
    dayDropdown: Locator;
    monthDropdown: Locator;
    yearDropdown: Locator;



    constructor(page: Page) {
        this.act = new Actions();
        this.page = page;
        this.nameTextBox = this.page.getByRole('textbox', { name: 'Name' });
        this.passwordTextbox = this.page.getByRole('textbox', { name: 'Password *' });
        this.dayDropdown = this.page.getByRole('radio');//two elements
        this.monthDropdown = this.page.locator('select[name="days"]');
        this.monthDropdown = this.page.locator('select[name="months"]');
        this.yearDropdown = this.page.locator('select[name="years"]');
        this.newsLetterCheckBox = this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });//optional
        this.offersCheckBox = this.page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });//optional
        this.fnameTextBox = this.page.getByRole('textbox', { name: 'First name *' });
        this.lnameTextBox = this.page.getByRole('textbox', { name: 'Last name *' });
        this.companyTextBox = this.page.locator('[name="company"]');//optional
        this.address1TextBox = this.page.locator('#address1');
        this.address2TextBox = this.page.locator('#address2');//optional
        this.countryTextBox = this.page.getByRole('combobox', { name: 'Country *' });
        this.stateTextBox = this.page.getByRole('textbox', { name: 'State *' });
        this.cityTextBox = this.page.getByRole('textbox', { name: 'City *' });
        this.zipcodeTextBox = this.page.locator('[name="zipcode"]');
        this.mobilenumberTextBox = this.page.getByLabel('Mobile Number *');
        this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
    }

    async fillForm(data: {
        password: string;
        fname: string;
        lname: string;
        address1: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobilenumber: string;
        company?: string;
        title?: string;
        bday?: string;
        address2?: string;
        chckNewsletter?: boolean;
        chkOffers?: boolean;
        name?: string;
    }) {
        //accoount information
        if (data.title) await this.act.selectTitle(this.page.locator(`input[name="title"][value="${data.title}"]`));
        if (data.name) await this.act.fillSafe(this.nameTextBox, data.name);
        await this.act.fillSafe(this.passwordTextbox, data.password);
        if (data.bday) {
            const date = new Date(data.bday);
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();
            await this.act.selectDropdownByValue(this.dayDropdown, String(day));
            await this.act.selectDropdownByValue(this.monthDropdown, String(month + 1));
            await this.act.selectDropdownByValue(this.yearDropdown, String(year));
        }
        if (data.chckNewsletter) await this.act.checksafe(this.newsLetterCheckBox);
        if (data.chkOffers) await this.act.checksafe(this.offersCheckBox);
        // addressinformation
        await this.act.fillSafe(this.fnameTextBox, data.fname);
        await this.act.fillSafe(this.lnameTextBox, data.lname);
        if (data.company) await this.act.fillSafe(this.companyTextBox, data.company);
        await this.act.fillSafe(this.address1TextBox, data.address1);
        if (data.address2) await this.act.fillSafe(this.page.locator('#address2'), data.address2);
        await this.act.selectDropdownByLabel(this.countryTextBox, data.country);
        await this.act.fillSafe(this.stateTextBox, data.state);
        await this.act.fillSafe(this.cityTextBox, data.city);
        await this.act.fillSafe(this.zipcodeTextBox, data.zipcode);
        await this.act.fillSafe(this.mobilenumberTextBox, data.mobilenumber);
    }

    async clickCreateAccount() {
        await this.act.clickSafe(this.createAccountButton);
    }   


}