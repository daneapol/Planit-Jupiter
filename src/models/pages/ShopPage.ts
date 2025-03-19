import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";
import { clickLocator } from "../../helpers/actions";
import { extractNumericValue } from "../../helpers/utils";

/* POM for Shop Page - for buy buttons and prices */
export class ShopPage extends JupiterToysPage {
    readonly buyButton: Record<string, Locator> = {};
    readonly price: Record<string, number> = {};
    
    constructor(page: Page, products: string[]) {
        super(page);

        /* Assign 'Buy' button locator for each ordered product */
        for (const product of products) {
            this.buyButton[product] = this.page.locator(`a:below(h4:text("${product}"))`).first();
        }
    }

    async clickBuyButton(product: string): Promise<void> {
        await clickLocator(this.buyButton[product]);
    }

    /* Obtain price of each ordered product to be used in verifying price in test */
    async updatePriceList(product: string): Promise<void> {
        this.price[product] = extractNumericValue(await this.page.locator(`span:below(h4:text("${product}"))`).first().innerText())
    }
}