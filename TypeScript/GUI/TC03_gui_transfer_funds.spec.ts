import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Fund Transfer Tests', () => {

    test('Successful fund transfer between internal accounts', async ({ page }) => {
        // 1. Navigate to the main page and log in
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 2. Click on the Transfer Funds menu item
        await page.locator('a[href^="transfer.htm"]').click();
        await page.waitForLoadState('networkidle');

        // 3. Strict Mode FIX: Target the specific page header using text filtering
        const pageHeader = page.locator('h1.title').filter({ hasText: 'Transfer Funds' });
        await expect(pageHeader).toBeVisible({ timeout: 10000 });

        // 4. Synchronization: Wait for the source account dropdown to attach to the DOM
        const fromAccount = page.locator('#fromAccountId');
        await fromAccount.waitFor({ state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000); // Brief pause to allow AngularJS to finish rendering options

        // 5. Fill out the transfer form
        await page.locator('#amount').fill('10.00');
        await fromAccount.selectOption({ index: 0 });
        await page.locator('#toAccountId').selectOption({ index: 1 });

        // 6. Submit the transfer request
        await page.locator('input[value="Transfer"]').click();
        await page.waitForLoadState('networkidle');

        // 7. Strict Mode FIX: Assert the success screen header using precise text matching
        const successHeader = page.locator('h1.title').filter({ hasText: 'Transfer Complete!' });
        await expect(successHeader).toBeVisible({ timeout: 10000 });

        // 8. Assert the confirmation text content on the page
        const confirmationText = page.locator('body');
        await expect(confirmationText).toContainText(/\$10\.00 has been transferred/i);
    });

});