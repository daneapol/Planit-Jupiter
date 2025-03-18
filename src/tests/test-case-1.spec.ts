import { expect, test } from "@playwright/test";
import { DOMAIN, DOMAIN_OCTOTORPHE, URLS } from "../helpers/constants";
import { ContactPage } from "../models/pages/ContactPage";
import { JupiterToysPage } from "../models/pages/JupiterToysPage";
import { populateContactPage } from "../helpers/populators";
import { ContactDetails } from "../models/interfaces";

const data: ContactDetails = {
    forename: 'Randolph',
    email: 'admin@randolph.com',
    message: 'The Fluffy Bear is fluffy indeed!'
}

test('Verify error messages, populate mandatory fields, then validate that errors are gone', async ({ page }) => {
    await page.goto(DOMAIN);
    await expect(page).toHaveURL(DOMAIN_OCTOTORPHE);

    const jupiterToysPage: JupiterToysPage = new JupiterToysPage(page);
    await jupiterToysPage.clickContactLink();
    await expect(jupiterToysPage.page).toHaveURL(URLS.CONTACT);

    const contactPage: ContactPage = new ContactPage(jupiterToysPage.page);
    await contactPage.clickSubmitButton();
    expect(await contactPage.checkErrorMessages()).toEqual(true);

    await populateContactPage(contactPage, data);
    expect(await contactPage.checkErrorMessages()).toEqual(false);
});