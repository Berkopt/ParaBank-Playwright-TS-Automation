import { test, expect } from '@playwright/test';

test('PUT /posts/1 - Update existing post data', async ({ request }) => {
    const updatedPayload = {
        title: 'Updated Test Title v2',
        body: 'The content has been modified by the automation script.',
        userId: 1
    };

    const response = await request.put('https://jsonplaceholder.typicode.com/posts/1', {
        data: updatedPayload
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.title).toBe(updatedPayload.title);
    expect(responseBody.body).toBe(updatedPayload.body);
});