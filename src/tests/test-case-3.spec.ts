import { expect, test } from "@playwright/test";
import { DOMAIN, DOMAIN_OCTOTORPHE, URLS } from "../helpers/constants";
import { ShopPage } from "../models/pages/ShopPage";
import { JupiterToysPage } from "../models/pages/JupiterToysPage";
import { CartSummary, Order } from "../models/interfaces";
import { CartPage } from "../models/pages/CartPage";
import { buyInShopPage } from "../helpers/populators";

const data: Order[] = [
    { product: 'Stuffed Frog', quantity: 2 },
    { product: 'Fluffy Bunny', quantity: 5 },
    { product: 'Valentine Bear', quantity: 3 },
];

test('Buy orders and validate cart details', async ({ page }) => {
    /* Go to home page */
    await page.goto(DOMAIN);
    await expect(page).toHaveURL(DOMAIN_OCTOTORPHE);

    const jupiterToysPage: JupiterToysPage = new JupiterToysPage(page);

    /* From the home page go to shop page */
    await jupiterToysPage.clickShopLink();
    await expect(jupiterToysPage.page).toHaveURL(URLS.SHOP);

    const productList = data.map((order) => order.product);
    const shopPage: ShopPage = new ShopPage(jupiterToysPage.page, productList);

    /* Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear */
    await buyInShopPage(shopPage, data);

    /* Go to the cart page */
    await shopPage.clickCartLink();
    await expect(shopPage.page).toHaveURL(URLS.CART);

    const cartPage: CartPage = new CartPage(shopPage.page);
    const cartSummary: CartSummary = await cartPage.extractCartSummary();

    /*
       Verify the subtotal for each product is correct
       Verify the price for each product
    */
    let totalFromSubtotals = 0;
    for (const cartItem of cartSummary.cartItems) {
        console.log(`Verifying for product ${cartItem.order.product}`);
        expect(cartItem.price).toEqual(shopPage.price[cartItem.order.product]);
        expect(cartItem.order.quantity * cartItem.price).toEqual(cartItem.subtotal);
        totalFromSubtotals += cartItem.subtotal;
    }

    /* Verify that total = sum(sub totals) */
    expect (totalFromSubtotals).toEqual(cartSummary.total);
});