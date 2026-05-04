import { Page,Locator } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class PaymentConfirmationPage {

   page:Page;
   downloadButton:Locator;
   continueButton:Locator;
   act:Actions;

   constructor(page:Page){
    this.page = page;
    this.act = new Actions();
   this.downloadButton = this.page.getByRole('link', { name: 'Download Invoice' });
   this.continueButton = this.page.getByRole('link', { name: 'Continue' });
}

async confirmationMessage(message:string){
   const mes = this.page.locator('p').filter({ hasText: `${message}` });
   return mes;

}

async clickDownloadButton(){
   const download = await this.act.safeDownload(this.downloadButton, this.page);
   const path = await download.path();
   const fileName = await download.suggestedFilename();
   return { path, fileName };
}

async clickContinue(){
   this.act.clickSafe(this.continueButton);
}

}