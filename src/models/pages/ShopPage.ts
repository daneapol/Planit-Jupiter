import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";
import { clickLocator } from "../../helpers/actions";
import { extractNumericValue } from "../../helpers/utils";

export class ShopPage extends JupiterToysPage {
    readonly buyButton: Record<string, Locator> = {};
    readonly price: Record<string, number> = {};
    
    constructor(page: Page, products: string[]) {
        super(page);
        for (const product of products) {
            this.buyButton[product] = this.page.locator(`a:below(h4:text("${product}"))`).first();
        }
    }

    async clickBuyButton(product: string): Promise<void> {
        await clickLocator(this.buyButton[product]);
    }

    async updatePriceList(product: string): Promise<void> {
        this.price[product] = extractNumericValue(await this.page.locator(`span:below(h4:text("${product}"))`).first().innerText())
    }
}