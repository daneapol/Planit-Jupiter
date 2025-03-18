/* Input data for Contact Page */
export interface ContactDetails {
    forename: string,
    email: string,
    message: string
};

/* Input data for Shop Page */
export interface Order {
    product: string;
    quantity: number;
}

/* Displayed data per product from Cart Page */
export interface CartItem {
    order: Order;
    price: number;
    subtotal: number;
};

/* Summary of items from Cart Page */
export interface CartSummary {
    cartItems: CartItem[];
    total: number;
}