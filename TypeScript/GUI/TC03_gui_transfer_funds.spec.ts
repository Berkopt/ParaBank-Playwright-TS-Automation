import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Pénzküldés tesztek', () => {

    test('Sikeres pénzátutalás a saját számlák között', async ({ page }) => {
        // 1. Főoldal megnyitása és bejelentkezés
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 2. Kattintás a Transfer Funds menüre
        await page.locator('a[href^="transfer.htm"]').click();
        await page.waitForLoadState('networkidle');

        // 3. Strict Mode FIX: Konkrét szöveg alapján várjuk meg az oldal fejlécét
        const pageHeader = page.locator('h1.title').filter({ hasText: 'Transfer Funds' });
        await expect(pageHeader).toBeVisible({ timeout: 10000 });

        // 4. Megvárjuk, amíg a számlaszámok legördülő menüje betöltődik a DOM-ba
        const fromAccount = page.locator('#fromAccountId');
        await fromAccount.waitFor({ state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000); // Kis szünet az AngularJS-nek a rendereléshez

        // 5. Űrlap kitöltése
        await page.locator('#amount').fill('10.00');
        await fromAccount.selectOption({ index: 0 });
        await page.locator('#toAccountId').selectOption({ index: 1 });

        // 6. Küldés gomb megnyomása
        await page.locator('input[value="Transfer"]').click();
        await page.waitForLoadState('networkidle');

        // 7. Strict Mode FIX: Megvárjuk a sikeroldal fejlécét a pontos szöveggel (felkiáltójellel!)
        const successHeader = page.locator('h1.title').filter({ hasText: 'Transfer Complete!' });
        await expect(successHeader).toBeVisible({ timeout: 10000 });

        // 8. Szöveges visszaigazolás ellenőrzése
        const confirmationText = page.locator('body');
        await expect(confirmationText).toContainText(/\$10\.00 has been transferred/i);
    });

});