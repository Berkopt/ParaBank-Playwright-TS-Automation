import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - API CRUD Tesztek', () => {

    // 1. POST - LÉTREHOZÁS
    test('POST /posts - Új egyedi bejegyzés létrehozása', async ({ request }) => {
        const customPayload = {
            title: 'Automated Playwright Test Run',
            body: 'Execution completed successfully on local environment.',
            userId: 99
        };

        const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
            data: customPayload
        });

        expect(response.status()).toBe(201); // 201 Created

        const responseBody = await response.json();
        expect(responseBody.title).toBe(customPayload.title);
        expect(responseBody.body).toBe(customPayload.body);
        expect(responseBody.userId).toBe(customPayload.userId);
        expect(responseBody.id).toBeDefined(); // Kaptunk új ID-t
    });

    // 2. GET - OLVASÁS
    test('GET /posts/1 - Bejegyzés lekérése', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

        expect(response.status()).toBe(200); // 200 OK

        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBeDefined();
        expect(responseBody.body).toBeDefined();
    });

    // 3. PUT - MÓDOSÍTÁS
    test('PUT /posts/1 - Bejegyzés adatainak frissítése', async ({ request }) => {
        const updatedPayload = {
            title: 'Updated Test Title v2',
            body: 'The content has been modified by the automation script.',
            userId: 1
        };

        const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
            data: updatedPayload
        });

        expect(response.status()).toBe(200); // 200 OK

        const responseBody = await response.json();
        expect(responseBody.title).toBe(updatedPayload.title);
        expect(responseBody.body).toBe(updatedPayload.body);
    });

    // 4. DELETE - TÖRLÉS
    test('DELETE /posts/1 - Bejegyzés törlése', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

        expect(response.status()).toBe(200); // 200 OK vagy 204 No Content (a mock API 200-at ad)
    });

});