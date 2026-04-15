import { expect, Locator } from "@playwright/test";

export class Actions {

  async clickSafe(element: Locator) {
    await expect(element).toBeVisible({ timeout: 5000 });
    await expect(element).toBeEnabled();
    await element.click();
  }

  async fillSafe(element: Locator, value:any) {
    await expect(element).toBeVisible({timeout:120000});
    await element.fill(value);
  }

  async fillDateSafe(element: Locator, value:any){
    await element.clear();
    await element.fill(value);
  }

  async clearAndFill(element: Locator, value: string) {
    await expect(element).toBeEditable();
    await element.clear();
    await element.fill(value);
  }

  async assertEnabled(element: Locator) {
    await expect(element).toBeEnabled();
  }

  async assertText(element: Locator, text: string) {
    await expect(element).toHaveText(text);
  }
}