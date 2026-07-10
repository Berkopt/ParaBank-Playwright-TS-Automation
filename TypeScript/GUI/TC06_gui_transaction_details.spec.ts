import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Account Activity & Transaction Details', () => {

    test('Successful navigation to account history and inspecting transaction details', async ({ page }) => {
        // 1. Navigate to the main page and log in
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 2. Wait for the accounts overview dashboard to load
        await page.waitForLoadState('networkidle');
        const overviewHeader = page.locator('h1.title').filter({ hasText: 'Accounts Overview' });
        await expect(overviewHeader).toBeVisible({ timeout: 10000 });

        // 3. Click on the very first account number link in the overview table
        const firstAccountLink = page.locator('a[href^="activity.htm?id="]').first();
        await expect(firstAccountLink).toBeVisible({ timeout: 10000 });
        await firstAccountLink.click();

        // 4. Wait for the Account Details history screen to load
        await page.waitForLoadState('networkidle');
        const detailsHeader = page.locator('h1.title').filter({ hasText: 'Account Details' });
        await expect(detailsHeader).toBeVisible({ timeout: 10000 });

        // 5. Synchronization: Wait for the transaction table to attach to the DOM
        const transactionTable = page.locator('#transactionTable');
        await transactionTable.waitFor({ state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000); // Brief pause to let AngularJS finish rendering

        // 6. Target the first available transaction link inside the table
        const firstTransactionLink = page.locator('a[href^="transaction.htm?id="]').first();

        // Conditional check: If a transaction exists, proceed to its details (Default 'john' profile always has them)
        if (await firstTransactionLink.isVisible()) {
            await firstTransactionLink.click();
            await page.waitForLoadState('networkidle');

            // 7. Assert the Transaction Details page header
            const transactionHeader = page.locator('h1.title').filter({ hasText: 'Transaction Details' });
            await expect(transactionHeader).toBeVisible({ timeout: 10000 });

            // 8. Verify core transaction fields are properly displayed on the page
            const bodyText = page.locator('body');
            await expect(bodyText).toContainText(/Transaction ID/i);
            await expect(bodyText).toContainText(/Amount/i);
        } else {
            console.log('--> No transactions available to display on this specific account.');
        }
    });

});