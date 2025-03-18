import { expect, test } from "@playwright/test";
import { DOMAIN, DOMAIN_OCTOTORPHE, URLS } from "../helpers/constants";
import { ContactPage } from "../models/pages/ContactPage";
import { JupiterToysPage } from "../models/pages/JupiterToysPage";
import { populateContactPage } from "../helpers/populators";
import { ContactDetails } from "../models/interfaces";
import { ConfirmationPage } from "../models/pages/ConfirmationPage";

const data: ContactDetails[] = [
    {
        forename: 'Mike',
        email: 'michael.frier@git.com',
        message: 'Nice choices for Christmas presents!'
    },
    {
        forename: 'The Shopaholic',
        email: 'dont_come_after_me@please.co.au',
        message: 'I will not reveal my identity... Just kidding!'
    },
    {
        forename: 'Anonymous',
        email: 'sample@email.com',
        message: 'Delivered on time. Will order again.'
    },
    {
        forename: 'Anthony Brixter',
        email: 'ab@prings.com',
        message: 'No further comments --- 10/10!!!'
    },
    {
        forename: 'D Seller 101',
        email: 'the_seller@marketing.com.ph',
        message: 'My handle is @thebestseller. Hit me up to boost your sales!'
    }
]

test.describe('Run contact test 5 times', async () => {
    for (let i = 0; i < 5; i++) {
        test(`Run #${i+1}: Populate mandatory fields and validate successful submission message`, async ({ page }) => {
            await page.goto(DOMAIN);
            await expect(page).toHaveURL(DOMAIN_OCTOTORPHE);
        
            const jupiterToysPage: JupiterToysPage = new JupiterToysPage(page);
            
            /* From the home page go to contact page */
            await jupiterToysPage.clickContactLink();
            await expect(jupiterToysPage.page).toHaveURL(URLS.CONTACT);
        
            const contactPage: ContactPage = new ContactPage(jupiterToysPage.page);

            /* Populate mandatory fields */
            await populateContactPage(contactPage, data[i]);

            /* Click submit button */
            await contactPage.clickSubmitButton();
        
            const confirmationPage: ConfirmationPage = new ConfirmationPage(contactPage.page);

            /* Validate successful submission message */
            expect(await confirmationPage.checkConfirmationMessage()).toEqual(true);
        });
    }
});