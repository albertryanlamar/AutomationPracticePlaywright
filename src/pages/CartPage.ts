import { de } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class CartPage {

    page: Page;
    itemRow:Locator
    proceedToCheckout: Locator;
    act:Actions
    registerLoginLinkModal: Locator;

    constructor(page:Page){
        this.page = page;
        this.itemRow = this.page.locator('#cart_info_table tbody tr')
        this.proceedToCheckout = this.page.getByText('Proceed To Checkout');
        this.act = new Actions();
        this.registerLoginLinkModal = this.page.locator('u').filter({ hasText: 'Register / Login' });
    }
    
    async verifyProductsInCart(productNames: string) {
        
        const rowCount = await this.itemRow.all();
        const rows = rowCount.length;

        for(const rowData of rowCount){

            const description = await rowData.locator('.cart_description h4 a').innerText();

            if(description.trim()===productNames.trim()){

                const priceText = await rowData.locator('.cart_price p').innerText();
                const qtyText = await rowData.locator('.cart_quantity button').innerText();
                const totalText =  await rowData.locator('.cart_total p').innerText();
               

                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                const qty = parseInt(qtyText.trim());
                const total = parseInt(totalText.replace(/[^0-9]/g, ''));
          
                return {
                    isPresent: true,
                    price, 
                    qty, 
                    total,
                    rows
                };
                
            }            
        }
        return {
            isPresent: false, 
            price: null, 
            qty: null, 
            total: null,
            rows:rows    
        };
    }

    async clickProceedToCheckout() {
        await this.act.clickSafe(this.proceedToCheckout);  
    }

    async clickRegisterLoginLinkModal() {
        await this.act.clickSafe(this.registerLoginLinkModal);
    }
    
}