import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Negatív és Hibakezelési API Tesztek', () => {

    // 1. Teszt: Nem létező erőforrás lekérése (404-es hiba ellenőrzése)
    test('GET /posts/9999909 - Hibakód 404 ellenőrzése nem létező ID esetén', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999909');

        // Itt nem 200-at várunk, hanem szándékosan 404-et!
        expect(response.status()).toBe(404);
    });

    // 2. Teszt: Nem létező poszt törlése (Hogyan reagál az API?)
    test('DELETE /posts/9999909 - Nem létező poszt törlési kísérlete', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/9999909');

        // Megjegyzés: A JSONPlaceholder egy mock API, így a nem létező törlésre is 200 OK-val vagy 404-gyel felelhet.
        // Teszteljük le, hogy a szerver nem omlik-e össze (500-as hiba), hanem kezelhető státuszt ad vissza.
        expect(response.status()).toBeLessThan(500);
    });

});