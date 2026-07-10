import { Page } from '@playwright/test';

export class RegisterPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickRegisterLink() {
        await this.page.locator('a[href^="register.htm"]').click();
    }

    async fillRegistrationForm(userData: any) {
        // Refactored to utilize a more robust input[name="..."] locator strategy
        await this.page.locator('input[name="customer.firstName"]').pressSequentially(userData.firstName, { delay: 30 });
        await this.page.locator('input[name="customer.lastName"]').pressSequentially(userData.lastName, { delay: 30 });
        await this.page.locator('input[name="customer.address.street"]').pressSequentially(userData.street, { delay: 30 });
        await this.page.locator('input[name="customer.address.city"]').pressSequentially(userData.city, { delay: 30 });
        await this.page.locator('input[name="customer.address.state"]').pressSequentially(userData.state, { delay: 30 });
        await this.page.locator('input[name="customer.address.zipCode"]').pressSequentially(userData.zipCode, { delay: 30 });
        await this.page.locator('input[name="customer.phoneNumber"]').pressSequentially(userData.phone, { delay: 30 });
        await this.page.locator('input[name="customer.ssn"]').pressSequentially(userData.ssn, { delay: 30 });

        // Account Credentials
        await this.page.locator('input[name="customer.username"]').pressSequentially(userData.username, { delay: 30 });
        await this.page.locator('input[name="customer.password"]').pressSequentially(userData.password, { delay: 30 });
        await this.page.locator('input[name="repeatedPassword"]').pressSequentially(userData.password, { delay: 30 });
    }

    async submitRegistration() {
        await this.page.waitForTimeout(500);
        // Precise button selection targeting the specific submit action within the registration form context
        await this.page.locator('td .button[value="Register"]').click();
    }
}