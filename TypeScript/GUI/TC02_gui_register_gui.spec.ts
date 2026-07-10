import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Account Details Validation', () => {

    test('Successful login and account balance table inspection', async ({ page }) => {
        // 1. Navigate to the main page
        await page.goto('/');

        // 2. Log in using the default 'john' demo account
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 3. Assertion: Verify redirection to the Accounts Overview page
        const overviewHeader = page.locator('#showOverview h1.title');
        await expect(overviewHeader).toHaveText('Accounts Overview');

        // 4. Synchronization: Wait for the network activity to settle down
        await page.waitForLoadState('networkidle');

        // Precise locator targeting the first link within the account table
        const firstAccountLink = page.locator('#accountTable tbody tr a').first();

        // Explicitly wait for the link to become visible
        await firstAccountLink.waitFor({ state: 'visible', timeout: 10000 });
        await expect(firstAccountLink).toBeVisible();

        // 5. Click on the first available account number
        await firstAccountLink.click();

        // 6. Wait for the account details screen to load completely
        await page.waitForLoadState('networkidle');

        // Assert header visibility using role and accessible name matching
        const detailsHeader = page.getByRole('heading', { name: 'Account Details' });
        await expect(detailsHeader).toBeVisible({ timeout: 10000 });

        // Flexible text validation: Verify that the 'Balance' label is present on the page
        const balanceLabel = page.getByText(/Balance/i);
        await expect(balanceLabel).toBeVisible();
    });

});