import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";
import { CartItem, CartSummary } from "../interfaces";
import { extractNumericValue } from "../../helpers/utils";

/* Cart Page - for extracting order details (product, price, subtotal, total) */
export class CartPage extends JupiterToysPage {
    readonly cartTable: Locator;
    readonly totalText: Locator;
    
    constructor(page: Page) {
        super(page);
        this.cartTable = this.page.locator('table.cart-items');
        this.totalText = this.page.getByText('Total:');
    }

    async extractCartSummary(): Promise<CartSummary> {
        await this.cartTable.waitFor();
        const rows = this.cartTable.locator('tbody > tr');
        const cartItems: CartItem[] = [];

        await Promise.all(
            Array.from({ length: await rows.count() }, async (_, i) => {
                const columns: Locator = rows.nth(i).locator('td');
                const columnTexts: string[] = await columns.allInnerTexts();
                cartItems.push({
                    order: {
                        product: columnTexts[0].trim(),
                        quantity: extractNumericValue(await columns.nth(2).locator('input').inputValue()),
                    },
                    price: extractNumericValue(columnTexts[1]),
                    subtotal: extractNumericValue(columnTexts[3]),
                })
            })
        );

        const total = extractNumericValue((await this.totalText.innerText()).trim());

        return { cartItems, total };
    }
}