import { Locator, Page } from "playwright";
import { clickLocator } from "../../helpers/actions";

export class JupiterToysPage {
    readonly page: Page;
    readonly shopLink: Locator;
    readonly contactLink: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shopLink = this.page.getByRole('link', { name: 'Shop', exact: true });
        this.contactLink = this.page.getByRole('link', { name: 'Contact' });
        this.cartLink = this.page.getByRole('link', { name: /Cart/i });
    }

    async clickShopLink(): Promise<void> {
        await clickLocator(this.shopLink);
    }

    async clickContactLink(): Promise<void> {
        await clickLocator(this.contactLink);
    }

    async clickCartLink(): Promise<void> {
        await clickLocator(this.cartLink);
    }
}