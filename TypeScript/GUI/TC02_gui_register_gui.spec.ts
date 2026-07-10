import { test, expect } from '@playwright/test';

test.describe('ParaBank - GUI Számlaadatok ellenőrzése', () => {

    test('Sikeres bejelentkezés és számlaegyenleg táblázat vizsgálata', async ({ page }) => {
        // 1. Főoldal megnyitása
        await page.goto('/');

        // 2. Bejelentkezés a fix, gyári 'john' fiókkal
        await page.locator('input[name="username"]').fill('john');
        await page.locator('input[name="password"]').fill('demo');
        await page.locator('input[value="Log In"]').click();

        // 3. Ellenőrzés: Megjelentünk-e az Accounts Overview oldalon
        const overviewHeader = page.locator('#showOverview h1.title');
        await expect(overviewHeader).toHaveText('Accounts Overview');

        // 4. Biztonsági várakozás: megvárjuk a táblázat betöltését
        await page.waitForLoadState('networkidle');

        // Pontosabb lokátor a számlatáblázat első linkjére
        const firstAccountLink = page.locator('#accountTable tbody tr a').first();

        // Megvárjuk, amíg a link ténylegesen láthatóvá válik
        await firstAccountLink.waitFor({ state: 'visible', timeout: 10000 });
        await expect(firstAccountLink).toBeVisible();

        // 5. Kattintsunk rá az első számlaszámra
        await firstAccountLink.click();

        // 6. Újabb hálózati várakozás a részletek betöltődésére
        await page.waitForLoadState('networkidle');

        // Szerepkör és szöveg alapján ellenőrizzük a főcímet
        const detailsHeader = page.getByRole('heading', { name: 'Account Details' });
        await expect(detailsHeader).toBeVisible({ timeout: 10000 });

        // Rugalmas keresés: Bármilyen szöveget megtalál, amiben szerepel a 'Balance' szó
        const balanceLabel = page.getByText(/Balance/i);
        await expect(balanceLabel).toBeVisible();
    });

});