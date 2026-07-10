import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - API Performance Tests', () => {

    // Define the maximum allowed response time (SLA limit) in milliseconds
    const MAX_ALLOWED_RESPONSE_TIME = 800;

    test('GET /posts - Verify response time (SLA) when retrieving full posts list', async ({ request }) => {

        // Capture the timestamp right before sending the request
        const startTime = Date.now();

        const response = await request.get('https://jsonplaceholder.typicode.com/posts');

        // Capture the timestamp immediately after receiving the response
        const endTime = Date.now();

        // Calculate the total round-trip response time
        const responseTime = endTime - startTime;

        // Perform standard status code validation
        expect(response.status()).toBe(200);

        // Log the exact execution time to the console for reporting purposes
        console.log(`--> GET /posts executed successfully. Response time: ${responseTime} ms`);

        // The test will fail if the server response time exceeds our predefined SLA threshold
        expect(responseTime).toBeLessThan(MAX_ALLOWED_RESPONSE_TIME);
    });

});