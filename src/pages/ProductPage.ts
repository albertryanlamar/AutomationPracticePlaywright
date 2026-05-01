import { Page, Locator } from "@playwright/test";
import { Actions } from "../helpers/Actions";

export class ProductPage {

    page: Page
    productsLocator: Locator;
    act: Actions;
    continueShoppingButton: Locator;
    viewCartButtonModal: Locator;
    viewCartLink: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productsLocator = this.page.locator('div.single-products');
        this.act = new Actions();
        this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
        this.viewCartButtonModal = this.page.getByText('View Cart');
        this.viewCartLink = this.page.getByRole('link', { name: 'Cart' }).first();

    }

async addToCart(productName: string) {

    const product = this.page
        .locator('.features_items .single-products')
        .filter({ hasText: productName });

    // ensure element is visible first
    await product.scrollIntoViewIfNeeded();

    await product.hover();

    const addToCartBtn = product.locator('.product-overlay .add-to-cart');

    await addToCartBtn.waitFor({ state: 'visible' });

    await this.act.clickSafe(addToCartBtn);
}

    async clickContinueShopping() {
        await this.act.clickSafe(this.continueShoppingButton);
    }

    async clickViewCartFromModal() {
        await this.act.clickSafe(this.viewCartButtonModal);
    }

    async clickViewCartLink() {
        await this.act.clickSafe(this.viewCartLink);
    }


}