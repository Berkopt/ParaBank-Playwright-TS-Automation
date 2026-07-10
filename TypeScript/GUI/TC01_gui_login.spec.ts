import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('ParaBank - Negatív login tesztek', () => {

    test('Bejelentkezés sikertelen üresen hagyott mezőkkel', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // 1. Oldal megnyitása
        await loginPage.navigateToLogin();

        // 2. Meghívjuk a login-t üres adatokkal
        await loginPage.login('', '');

        // 3. Ellenőrizzük az üres mezők miatti hibaüzenetet
        const errorBox = page.locator('p.error');
        await expect(errorBox).toContainText('Please enter a username and password', { timeout: 10000 });
    });

});