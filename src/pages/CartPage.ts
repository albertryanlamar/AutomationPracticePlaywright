import { de } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";

export class CartPage {

    page: Page;
    itemRow:Locator

    constructor(page:Page){
        this.page = page;
        this.itemRow = this.page.locator('#cart_info_table tbody tr')
    }
    
    async verifyProductsInCart(productNames: string) {
        const rowCount = await this.itemRow.all();
        for(const rowData of rowCount){
            const description = await rowData.locator('.cart_description h4 a').innerText();
            if(productNames===description.trim()){
                console.log(`Product ${description} is present in the cart.`);
                return true;
                break;
                
            }            
        }
        return false;
    }
}