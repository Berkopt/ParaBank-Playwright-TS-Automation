import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - API Teljesítmény (Performance) Tesztek', () => {

    // Beállítunk egy elvárt maximális válaszidőt (pl. 800 ms)
    const MAX_ALLOWED_RESPONSE_TIME = 800;

    test('GET /posts - Válaszidő (SLA) ellenőrzése a teljes lista lekérésekor', async ({ request }) => {

        // Elmentjük a kérés indításának pillanatát
        const startTime = Date.now();

        const response = await request.get('https://jsonplaceholder.typicode.com/posts');

        // Elmentjük a válasz megérkezésének pillanatát
        const endTime = Date.now();

        // Kiszámoljuk a különbséget
        const responseTime = endTime - startTime;

        // Alapvető státusz ellenőrzés
        expect(response.status()).toBe(200);

        // Kinyomtatjuk a konzolra a pontos időt, hogy lássuk a riportban
        console.log(`--> A GET /posts sikeresen lefutott. Válaszidő: ${responseTime} ms`);

        // A teszt elbukik, ha a szerver válaszideje túllépi a megengedett korlátot
        expect(responseTime).toBeLessThan(MAX_ALLOWED_RESPONSE_TIME);
    });

});