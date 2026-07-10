import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Bill Pay Tests', () => {

    test('Successful bill payment by completing the full form', async ({ page }) => {
        // 1. Navigate to the main page
        await page.goto('/');

        // 2. Log in using the default 'john' demo account
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 3. Navigate to the Bill Pay page
        await page.locator('a[href^="billpay.htm"]').click();

        // 4. Synchronization: Wait for the asynchronous interface to load completely
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // 5. Assert the page header visibility using its accessible role
        const pageHeader = page.getByRole('heading', { name: 'Bill Payment Service' });
        await expect(pageHeader).toBeVisible({ timeout: 10000 });

        // 6. Fill out the form (Payee Information)
        await page.locator('input[name="payee.name"]').fill('Acme Energy Provider');
        await page.locator('input[name="payee.address.street"]').fill('123 Main Street');
        await page.locator('input[name="payee.address.city"]').fill('New York');
        await page.locator('input[name="payee.address.state"]').fill('NY');
        await page.locator('input[name="payee.address.zipCode"]').fill('10001');
        await page.locator('input[name="payee.phoneNumber"]').fill('5551234567');

        // Enter and verify the account number
        await page.locator('input[name="payee.accountNumber"]').fill('98765');
        await page.locator('input[name="verifyAccount"]').fill('98765');

        // Set the payment amount
        await page.locator('input[name="amount"]').fill('25.50');

        // 7. Submit the payment form
        await page.locator('input[value="Send Payment"]').click();

        // 8. Assertion: Wait for the network to settle and verify the success screen
        await page.waitForLoadState('networkidle');

        // Validate success via heading role matching
        const successHeader = page.getByRole('heading', { name: 'Bill Payment Complete' });
        await expect(successHeader).toBeVisible({ timeout: 10000 });

        // Verify dynamic confirmation details within the page body
        const bodyText = page.locator('body');
        await expect(bodyText).toContainText(/Bill Payment to Acme Energy Provider/i);
        await expect(bodyText).toContainText(/\$25\.50/);
    });

});