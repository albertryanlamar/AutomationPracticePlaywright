import { Page, Locator } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class ProductPage {

    page: Page
    productsLocator: Locator;
    act: Actions;
    continueShoppingButton: Locator;
    viewCartButtonModal: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productsLocator = this.page.locator('div.single-products');
        this.act = new Actions();
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartButtonModal = this.page.getByText('View Cart');

    }

    async addToCart(productName: string) {
        const product = this.productsLocator.filter({
            has: this.page.locator('p', { hasText: productName })
        });
        await product.hover();
        await this.act.clickSafe(product.locator('.product-overlay .add-to-cart'));
    }

    async clickContinueShopping() {
        await this.act.clickSafe(this.continueShoppingButton);
    }

    async clickViewCartFromModal() {
        await this.act.clickSafe(this.viewCartButtonModal);
    }
}