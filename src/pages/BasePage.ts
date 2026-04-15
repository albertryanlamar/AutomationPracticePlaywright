import { Page } from "@playwright/test";

export class BasePage {
    constructor(protected page: Page) {}

    async navigate(url: string) {
        await this.page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        await this.page.waitForLoadState('networkidle');
    }
}