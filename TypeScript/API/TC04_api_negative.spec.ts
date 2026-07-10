import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Negative and Error Handling API Tests', () => {

    // 1. Test: Retrieve a non-existing resource (Verify 404 error)
    test('GET /posts/9999909 - Verify 404 status code for non-existing ID', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/9999909');

        // We intentionally expect a 404 Not Found instead of a 200 OK
        expect(response.status()).toBe(404);
    });

    // 2. Test: Attempt to delete a non-existing post
    test('DELETE /posts/9999909 - Delete attempt on a non-existing post', async ({ request }) => {
        const response = await request.delete('https://jsonplaceholder.typicode.com/posts/9999909');

        // Note: JSONPlaceholder is a mock API, so it might respond with 200 OK or 404 for missing resources.
        // We verify that the server does not crash (no 500 Internal Server Error) and returns a manageable status code.
        expect(response.status()).toBeLessThan(500);
    });

});