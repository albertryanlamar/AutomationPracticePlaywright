import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class PaymentDetailsPage{
   
    page:Page;
    act:Actions;
    nameTextBox:Locator;
    cardNumberTextBox:Locator;
    cvcTextBox:Locator;
    expirationMonth:Locator;
    payButton:Locator;
    confirmButton:Locator;
    expirationYear:Locator;

   constructor(page:Page){
    this.page = page;
    this.act = new Actions();
    this.nameTextBox = this.page.locator('[name="name_on_card"]');
    this.cardNumberTextBox = this.page.locator('[name="card_number"]');
    this.cvcTextBox = this.page.locator('[name="cvc"]');
    this.expirationMonth = this.page.locator('input[name="expiry_month"]');
    this.expirationYear = this.page.locator('[name="expiry_year"]');
    this.payButton = this.page.getByRole('button', { name: /Pay and Confirm Order/i });

   }

   async FilloutPaymentDetails(data:
    {
        nameDetails:string,
        cardNo:number, 
        cvc,
        expirationDate
    }){
      const date = new Date(data.expirationDate);
      const month = String(date.getMonth() + 1).padStart(2, '0'); // "01" to "12"
      const year = String(date.getFullYear());
      await Promise.all([
        this.act.fillSafe(this.nameTextBox,data.nameDetails),
        this.act.fillSafe(this.cardNumberTextBox,data.cardNo),
        this.act.fillSafe(this.cvcTextBox,data.cvc),
        this.act.fillSafe(this.expirationMonth,month),
        this.act.fillSafe(this.expirationYear,year)
      ])
   }

   async clickPay(){
     await this.act.clickSafe(this.payButton);
   }

}