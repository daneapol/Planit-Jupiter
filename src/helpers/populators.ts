import { ContactPage } from "../models/pages/ContactPage";
import { ContactDetails, Order } from "../models/interfaces";
import { URLS } from "./constants";
import { ShopPage } from "../models/pages/ShopPage";

/* Populates mandatory fields in Contact Page */
export const populateContactPage = async (contactPage: ContactPage, data: ContactDetails): Promise<void> => {
    console.log(`populateContactPage: Entered`);
    await contactPage.page.waitForLoadState('domcontentloaded');
    await contactPage.page.waitForURL(URLS.CONTACT);
    await contactPage.fillForename(data.forename);
    await contactPage.fillEmail(data.email);
    await contactPage.fillMessage(data.message);
}

/* Clicks on 'Buy' buttons in Shop Page while extracting price list of only the products in `data` */
export const buyInShopPage = async (shopPage: ShopPage, data: Order[]) => {
    console.log(`buyInShopPage: Entered`);
    await shopPage.page.waitForLoadState('domcontentloaded');
    await shopPage.page.waitForURL(URLS.SHOP);
    for (let i = 0; i < data.length; i++) {
        const order: Order = data[i];
        console.log(`Buying ${order.quantity} orders of ${order.product}...`);
        for (let j = 0; j < order.quantity; j++) {
            await shopPage.clickBuyButton(order.product);
            await shopPage.updatePriceList(order.product);
        }
    }
}