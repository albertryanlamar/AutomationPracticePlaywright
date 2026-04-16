import { expect, Locator } from "@playwright/test";

export class Actions {

  async clickSafe(element: Locator) {
    await expect(element).toBeVisible({ timeout: 5000 });
    await expect(element).toBeEnabled();
    await element.click();
  }
  async checksafe(element: Locator) {
    await expect(element).toBeVisible({ timeout: 5000 });
    await expect(element).toBeEnabled();
    await element.check();
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

  async selectTitle(element: Locator) {
    await expect(element).toBeVisible();
    await element.check();
  }

  async selectDropdownByLabel(element: Locator, value: string) {
    await expect(element).toBeVisible();
    await element.selectOption({label: `${value}`});
  }
  async selectDropdownByValue(element: Locator, value: string) {
    await expect(element).toBeVisible();
    await element.selectOption({ value: `${value}`});
  }
}