import { Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLogin() {
        await this.page.goto('/');
    }

    async login(username: string, password: string) {
        // Sequentially fill credentials with a minor keystroke delay for human-like interaction
        await this.page.locator('input[name="username"]').pressSequentially(username, { delay: 50 });
        await this.page.locator('input[name="password"]').pressSequentially(password, { delay: 50 });

        // Brief stabilization pause before action
        await this.page.waitForTimeout(500);
        await this.page.locator('input[value="Log In"]').click();
    }
}