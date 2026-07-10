import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - API CRUD Tests', () => {

    // 1. POST - CREATE
    test('POST /posts - Create a new custom post', async ({ request }) => {
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
        expect(responseBody.id).toBeDefined(); // Verify new resource ID is generated
    });

    // 2. GET - READ
    test('GET /posts/1 - Retrieve an existing post', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');

        expect(response.status()).toBe(200); // 200 OK

        const responseBody = await response.json();
        expect(responseBody.id).toBe(1);
        expect(responseBody.title).toBeDefined();
        expect(responseBody.body).toBeDefined();
    });

    // 3. PUT - UPDATE
    test('PUT /posts/1 - Update existing post data', async ({ request }) => {
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

    // 4. DELETE - DELETE
    test('DELETE /posts/1 - Delete a post', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/1');

        expect(response.status()).toBe(200); // Mock API returns 200 OK instead of 204 No Content
    });

});