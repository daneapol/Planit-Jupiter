import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";
import { CartItem, CartSummary } from "../interfaces";
import { extractNumericValue } from "../../helpers/utils";

/* POM for Cart Page - for extracting order details (product, price, subtotal, total) */
export class CartPage extends JupiterToysPage {
    readonly cartTable: Locator;
    readonly totalText: Locator;
    
    constructor(page: Page) {
        super(page);
        this.cartTable = this.page.locator('table.cart-items');
        this.totalText = this.page.getByText('Total:');
    }

    /* Extracts cart summary to be verified in test */
    async extractCartSummary(): Promise<CartSummary> {
        await this.cartTable.waitFor();
        const rows: Locator = this.cartTable.locator('tbody > tr');
        const cartItems: CartItem[] = [];

        await Promise.all(
            Array.from({ length: await rows.count() }, async (_, i) => {
                const columns: Locator = rows.nth(i).locator('td');
                const columnTexts: string[] = await columns.allInnerTexts();
                cartItems.push({
                    order: {
                        product: columnTexts[0].trim(), // Product name
                        quantity: extractNumericValue(await columns.nth(2).locator('input').inputValue()),  // Quantity
                    },
                    price: extractNumericValue(columnTexts[1]), // Price per item
                    subtotal: extractNumericValue(columnTexts[3]),  // Subtotal (Price per item * Quantity)
                })
            })
        );

        const total = extractNumericValue((await this.totalText.innerText()).trim());   // Total of all subtotals

        return { cartItems, total };
    }
}