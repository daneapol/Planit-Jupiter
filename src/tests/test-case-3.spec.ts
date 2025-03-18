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
    await page.goto(DOMAIN);
    await expect(page).toHaveURL(DOMAIN_OCTOTORPHE);

    const jupiterToysPage: JupiterToysPage = new JupiterToysPage(page);
    await jupiterToysPage.clickShopLink();
    await expect(jupiterToysPage.page).toHaveURL(URLS.SHOP);

    const productList = data.map((order) => order.product);
    const shopPage: ShopPage = new ShopPage(jupiterToysPage.page, productList);
    await buyInShopPage(shopPage, data);

    await shopPage.clickCartLink();
    await expect(shopPage.page).toHaveURL(URLS.CART);

    const cartPage: CartPage = new CartPage(shopPage.page);
    const cartSummary: CartSummary = await cartPage.extractCartSummary();
    
    let totalFromSubtotals = 0;
    for (const cartItem of cartSummary.cartItems) {
        console.log(`Verifying for product ${cartItem.order.product}`);
        expect(cartItem.price).toEqual(shopPage.price[cartItem.order.product]);
        expect(cartItem.order.quantity * cartItem.price).toEqual(cartItem.subtotal);
        totalFromSubtotals += cartItem.subtotal;
    }

    expect (totalFromSubtotals).toEqual(cartSummary.total);
});