import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";

export class ConfirmationPage extends JupiterToysPage {
    readonly confirmationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.confirmationMessage = this.page.locator('.alert-success');
    }

    async checkConfirmationMessage(): Promise<boolean> {
        try {
            await this.confirmationMessage.waitFor();
            console.log(`Feedback successfully submitted! - ${(await this.confirmationMessage.innerText()).trim()}`);
            return true;
        } catch (error) {
            console.error(`Confirmation message not found - ${JSON.stringify(error)}`);
            return false;
        }
    }
}