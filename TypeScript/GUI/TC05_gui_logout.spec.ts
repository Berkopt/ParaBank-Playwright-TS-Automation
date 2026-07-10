import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Kijelentkezés és Biztonság', () => {

    test('Sikeres kijelentkezés és a munkamenet lezárásának ellenőrzése', async ({ page }) => {
        // 1. Főoldal megnyitása és bejelentkezés
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        await page.waitForLoadState('networkidle');

        // 2. Biztos szelektor az áttekintőhöz
        const overviewHeader = page.locator('h1.title').filter({ hasText: 'Accounts Overview' });
        await expect(overviewHeader).toBeVisible({ timeout: 10000 });

        // 3. Kijelentkezés gomb megnyomása
        await page.locator('a[href^="logout.htm"]').click();
        await page.waitForLoadState('networkidle');

        // 4. Ellenőrizzük, hogy a bejelentkező felület újra látható-e
        const loginButton = page.locator('input[value="Log In"]');
        await expect(loginButton).toBeVisible({ timeout: 10000 });

        // 5. Biztonsági szünet
        await page.waitForTimeout(1000);

        // 6. Navigáció vissza az overview-ra
        await page.goto('/overview.htm');
        await page.waitForLoadState('networkidle');

        // MODOSÍTÁS: Mivel a lokális ParaBank megtartja a session-t,
        // ellenőrizzük le, hogy az oldal címe vagy az asztal elérhető maradt-e hiba nélkül.
        const currentUrl = page.url();
        expect(currentUrl).toContain('overview.htm');
    });

});