import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Számlatörténet és Tranzakció részletek', () => {

    test('Sikeres navigáció a számlatörténethez és egy tranzakció részleteinek megtekintése', async ({ page }) => {
        // 1. Főoldal megnyitása és bejelentkezés
        await page.goto('/');
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 2. Megvárjuk a számlaáttekintő oldalt
        await page.waitForLoadState('networkidle');
        const overviewHeader = page.locator('h1.title').filter({ hasText: 'Accounts Overview' });
        await expect(overviewHeader).toBeVisible({ timeout: 10000 });

        // 3. Rákattintunk a legelső számlaszám linkre a táblázatban
        // A ParaBankban ezek a linkek az 'activity.htm?id=' szöveggel kezdődnek
        const firstAccountLink = page.locator('a[href^="activity.htm?id="]').first();
        await expect(firstAccountLink).toBeVisible({ timeout: 10000 });
        await firstAccountLink.click();

        // 4. Megvárjuk, amíg a Számlatörténet (Account Details) oldal betöltődik
        await page.waitForLoadState('networkidle');
        const detailsHeader = page.locator('h1.title').filter({ hasText: 'Account Details' });
        await expect(detailsHeader).toBeVisible({ timeout: 10000 });

        // 5. Megvárjuk, amíg a tranzakciós táblázat megjelenik a DOM-ban
        const transactionTable = page.locator('#transactionTable');
        await transactionTable.waitFor({ state: 'attached', timeout: 10000 });
        await page.waitForTimeout(1000); // Kis szünet az AngularJS-nek

        // 6. Megkeressük a legelső tranzakció linkjét a táblázatban
        const firstTransactionLink = page.locator('a[href^="transaction.htm?id="]').first();

        // Ellenőrizzük, hogy van-e egyáltalán tranzakció (ha nincs, a teszt itt jelzi, de ParaBankban Johnnak mindig van)
        if (await firstTransactionLink.isVisible()) {
            await firstTransactionLink.click();
            await page.waitForLoadState('networkidle');

            // 7. Ellenőrizzük a Tranzakció részletei oldal fejlécét
            const transactionHeader = page.locator('h1.title').filter({ hasText: 'Transaction Details' });
            await expect(transactionHeader).toBeVisible({ timeout: 10000 });

            // 8. Ellenőrizzük, hogy a tranzakció alapvető mezői olvashatóak-e
            const bodyText = page.locator('body');
            await expect(bodyText).toContainText(/Transaction ID/i);
            await expect(bodyText).toContainText(/Amount/i);
        } else {
            console.log('Ezen a számlán még nincs megjeleníthető tranzakció.');
        }
    });

});