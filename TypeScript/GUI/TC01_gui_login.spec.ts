import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('ParaBank - Negative Login Scenarios', () => {

    test('Should display error message when logging in with empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Navigate to the login page
        await loginPage.navigateToLogin();

        // 2. Submit the login form with empty credentials
        await loginPage.login('', '');

        // 3. Assert that the correct error message is displayed for empty fields
        const errorBox = page.locator('p.error');
        await expect(errorBox).toContainText('Please enter a username and password', { timeout: 10000 });
    });

});