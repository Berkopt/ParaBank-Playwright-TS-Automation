import { test, expect } from '@playwright/test';

test.describe('JSONPlaceholder - Comments and Filtering API', () => {

    // 1. Test: Filter comments for a specific post (Query Parameter test)
    test('GET /comments?postId=1 - Filter comments by postId', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/comments', {
            params: {
                postId: 1
            }
        });

        expect(response.status()).toBe(200);

        const comments = await response.json();

        // Verify that data is returned and all items belong to postId 1
        expect(comments.length).toBeGreaterThan(0);
        expect(comments[0].postId).toBe(1);

        // Validate the response schema structure (presence of name, email, and body)
        expect(comments[0].email).toBeDefined();
        expect(comments[0].body).toBeDefined();
    });

    // 2. Test: Append a new comment to a post
    test('POST /comments - Submit a new comment under a post', async ({ request }) => {
        const commentPayload = {
            postId: 1,
            name: 'QA Tester John',
            email: 'john.doe@test.com',
            body: 'This is an automated test comment.'
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