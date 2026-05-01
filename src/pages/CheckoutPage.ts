import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    
    page:Page;
    deliveryUl:Locator;
    billingUl:Locator;

    constructor(page:Page){
      this.page = page;
      this.deliveryUl = this.page.locator('#address_delivery');
      this.billingUl = this.page.locator('#address_invoice');
    }


    async getDeliveryDetails(type:'billing'|'delivery'){
      const loccator = type==='billing' ? this.deliveryUl : this.billingUl;
      const fullName = await loccator.locator('li.address_firstname.address_lastname').innerText();
      const fullAddress = await loccator.locator('li.address_address1.address_address2').innerText();
      const cityStateZip = await loccator.locator('li.address_city.address_state_name.address_postcode').innerText();
      const country = await loccator.locator('li.address_country_name').innerText();
      const phone = await loccator.locator('li.address_phone').innerText();

      return {
        fullName,fullAddress,cityStateZip,country,phone 
      }

    }

    
}