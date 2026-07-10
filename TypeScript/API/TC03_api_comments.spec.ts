import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Kommentek és Szűrések API', () => {

    // 1. Teszt: Kommentek szűrése egy adott poszthoz (Query Parameter teszt)
    test('GET /comments?postId=1 - Kommentek szűrése postId alapján', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/comments', {
            params: {
                postId: 1
            }
        });

        expect(response.status()).toBe(200);

        const comments = await response.json();

        // Ellenőrizzük, hogy kaptunk-e vissza adatot és mindegyik a 1-es poszthoz tartozik
        expect(comments.length).toBeGreaterThan(0);
        expect(comments[0].postId).toBe(1);

        // Ellenőrizzük a struktúrát (név, email, törzs megléte)
        expect(comments[0].email).toBeDefined();
        expect(comments[0].body).toBeDefined();
    });

    // 2. Teszt: Új komment hozzáfűzése
    test('POST /comments - Új komment beküldése egy poszt alá', async ({ request }) => {
        const commentPayload = {
            postId: 1,
            name: 'QA Tester John',
            email: 'john.doe@test.com',
            body: 'Ez egy automatizált teszt komment.'
        };

        const response = await request.post('https://jsonplaceholder.typicode.com/comments', {
            data: commentPayload
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        expect(responseBody.email).toBe(commentPayload.email);
        expect(responseBody.name).toBe(commentPayload.name);
    });

});