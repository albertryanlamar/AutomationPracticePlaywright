import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class CheckoutPage {
    
    page:Page;
    deliveryUl:Locator;
    billingUl:Locator;
    checkOutTable:Locator;
    placeOrderButton:Locator;
    act:Actions;
    commentTextBox:Locator;

    constructor(page:Page){
      this.page = page;
      this.act = new Actions();
      this.deliveryUl = this.page.locator('#address_delivery');
      this.billingUl = this.page.locator('#address_invoice');
      this.checkOutTable = this.page.locator(".table.table-condensed tbody tr");
      this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
      this.commentTextBox = this.page.locator('[name="message"]');
    }


    async getDeliveryDetails(type:'billing'|'delivery'){
      const loccator = type==='billing' ? this.deliveryUl : this.billingUl;
      const fullName = await loccator.locator('li.address_firstname.address_lastname').innerText();
      const fullAddress = await loccator.locator('li.address_address1.address_address2').innerText();
      const cityStateZip = await loccator.locator('li.address_city.address_state_name.address_postcode').innerText();
      const country = await loccator.locator('li.address_country_name').innerText();
      const phone = await loccator.locator('li.address_phone').innerText();
      return {
        fullName,
        fullAddress,
        cityStateZip,
        country,
        phone 
      }
    }

    async getReviewOrderDetails(product){
        const rowCount = await this.checkOutTable.all();
        const rows = rowCount.length;
        let price:any, qty:any, total:any;
         for (const rowData of rowCount){
                const priceText = await rowData.locator('.cart_price p').innerText();
                const qtyText = await rowData.locator('.cart_quantity button').innerText();
                const totalText =  await rowData.locator('.cart_total p').innerText();

                price = parseInt(priceText.replace(/[^0-9]/g,''));
                qty = parseInt(qtyText.trim());
                total = parseInt(totalText.replace(/[^0-9]/g,''))
         }
         const checkout  = this.checkOutTable.last();
         const totalAmount = checkout.locator('cart_total_price').innerText();
         return {
            totalAmount,price,qty,total
         }
    }
   
    async clickPlaceOrder(){
      await this.act.clickSafe(this.placeOrderButton);
    }

    async writeComment(comment:string){
      this.act.fillSafe(this.commentTextBox,comment);
    }
    
}