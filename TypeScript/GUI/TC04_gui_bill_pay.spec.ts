import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Számlafizetés tesztek', () => {

    test('Sikeres számlafizetés (Bill Pay) teljes űrlap kitöltésével', async ({ page }) => {
        // 1. Főoldal megnyitása
        await page.goto('/');

        // 2. Bejelentkezés a fix 'john' fiókkal
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 3. Navigáció a Bill Pay oldalra
        await page.locator('a[href^="billpay.htm"]').click();

        // 4. Biztonsági várakozás az aszinkron felület betöltésére
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);

        // 5. Címsor ellenőrzése szerepkör alapján
        const pageHeader = page.getByRole('heading', { name: 'Bill Payment Service' });
        await expect(pageHeader).toBeVisible({ timeout: 10000 });

        // 6. Űrlap kitöltése (Szolgáltató adatai)
        await page.locator('input[name="payee.name"]').fill('Díjnet Villanyszolgáltató');
        await page.locator('input[name="payee.address.street"]').fill('Kossuth Lajos utca 10.');
        await page.locator('input[name="payee.address.city"]').fill('Budapest');
        await page.locator('input[name="payee.address.state"]').fill('Pest');
        await page.locator('input[name="payee.address.zipCode"]').fill('1051');
        await page.locator('input[name="payee.phoneNumber"]').fill('0612345678');

        // Számlaszám megadása és megerősítése
        await page.locator('input[name="payee.accountNumber"]').fill('98765');
        await page.locator('input[name="verifyAccount"]').fill('98765');

        // Összeg megadása
        await page.locator('input[name="amount"]').fill('25.50');

        // 7. Fizetés elküldése
        await page.locator('input[value="Send Payment"]').click();

        // 8. Ellenőrzés: Megvárjuk a sikeroldalt
        await page.waitForLoadState('networkidle');

        // Sikeresség ellenőrzése a fejléc alapján
        const successHeader = page.getByRole('heading', { name: 'Bill Payment Complete' });
        await expect(successHeader).toBeVisible({ timeout: 10000 });

        // Visszaigazoló szövegek ellenőrzése a body-ban
        const bodyText = page.locator('body');
        await expect(bodyText).toContainText(/Bill Payment to Díjnet Villanyszolgáltató/i);
        await expect(bodyText).toContainText(/\$25\.50/);
    });

});