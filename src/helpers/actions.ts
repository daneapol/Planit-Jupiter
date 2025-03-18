import { Locator } from "playwright";
import { expect } from "playwright/test";

export const clickLocator = async (locator: Locator): Promise<void> => {
    console.log(`Clicking on ${locator}`);
    await locator.click();
}

export const fillInput = async (locator: Locator, input: string): Promise<void> => {
    await expect(locator).toBeEditable();
    console.log(`Filling ${locator} with '${input}'`);
    await locator.fill(input);
    await expect(locator).toHaveValue(input);
    console.log(`Successfully filled input field!`);
}