import { Locator, Page } from "playwright";
import { JupiterToysPage } from "./JupiterToysPage";
import { clickLocator, fillInput } from "../../helpers/actions";

/* Contact Page - for filling fields and checking error messages */
export class ContactPage extends JupiterToysPage {
    readonly forenameInput: Locator;
    readonly emailInput: Locator;
    readonly messageInput: Locator;
    readonly submitButton: Locator;
    readonly topErrorMessage: Locator;
    readonly fieldErrorMessages: Locator;

    constructor(page: Page) {
        super(page)
        this.forenameInput = this.page.getByRole('textbox', { name: 'Forename *' });
        this.emailInput = this.page.getByRole('textbox', { name: 'Email *' });
        this.messageInput = this.page.getByRole('textbox', { name: 'Message *' });
        this.submitButton = this.page.getByRole('link', { name: 'Submit' });
        this.topErrorMessage = this.page.locator('.alert-error');
        this.fieldErrorMessages = this.page.locator('[ui-if*="$error.required"]');
    }

    async fillForename(input: string): Promise<void> {
        await fillInput(this.forenameInput, input);
    }

    async fillEmail(input: string): Promise<void> {
        await fillInput(this.emailInput, input);
    }

    async fillMessage(input: string): Promise<void> {
        await fillInput(this.messageInput, input);
    }

    async clickSubmitButton(): Promise<void> {
        await clickLocator(this.submitButton);
    }

    async checkErrorMessages(): Promise<boolean> {
        let hasErrorMessage: boolean = false;
        
        if (await this.topErrorMessage.isVisible()) {
            console.error(`Error alert found - ${(await this.topErrorMessage.innerText()).trim()}`);
            hasErrorMessage = true;
        }

        const fieldErrorMessages: Locator[] = await this.fieldErrorMessages.all();
        if (fieldErrorMessages.length > 0) {
            hasErrorMessage = true;
            await Promise.all(fieldErrorMessages.map(async errorMessage => console.error(`Field error message found - ${(await errorMessage.innerText()).trim()}`)));
        }

        if (!hasErrorMessage) console.log('Yay! No validation errors!');

        return hasErrorMessage;
    }
}