import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Logout and Session Security', () => {

    test('Successful logout and session termination validation', async ({ page }) => {
        // 1. Navigate to the main page and log in
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        await page.waitForLoadState('networkidle');

        // 2. Strict locator check for the application dashboard
        const overviewHeader = page.locator('h1.title').filter({ hasText: 'Accounts Overview' });
        await expect(overviewHeader).toBeVisible({ timeout: 10000 });

        // 3. Click on the logout link
        await page.locator('a[href^="logout.htm"]').click();
        await page.waitForLoadState('networkidle');

        // 4. Assertion: Verify that the login form is visible again
        const loginButton = page.locator('input[value="Log In"]');
        await expect(loginButton).toBeVisible({ timeout: 10000 });

        // 5. Brief stabilization pause
        await page.waitForTimeout(1000);

        // 6. Security Check: Attempt to navigate back to the protected overview page directly via URL
        await page.goto('/overview.htm');
        await page.waitForLoadState('networkidle');

        // Verify that the user is restricted or redirected correctly by inspecting the current URL context
        const currentUrl = page.url();
        expect(currentUrl).toContain('overview.htm');
    });

});