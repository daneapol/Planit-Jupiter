import { Page } from "playwright";
import { DOMAIN, DOMAIN_OCTOTORPHE } from "../helpers/constants";
import { expect } from "@playwright/test";

/* Go to home page */
export const goToHomePage = async(page: Page): Promise<void> => {
    await page.goto(DOMAIN);
    await expect(page).toHaveURL(DOMAIN_OCTOTORPHE);
}

/* Strip non-numeric and non-decimal point */
export const extractNumericValue = (input: string): number => {
    return Number(input.replace(/[^0-9.]/g, ''));
}