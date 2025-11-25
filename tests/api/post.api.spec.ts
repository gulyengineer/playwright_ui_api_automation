import { test, expect } from '@playwright/test';

test('POST request to JSONPlaceholder', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Test',
      body: 'Learning',
      userId: 1
    }
  });
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(response.status()).toBe(201);

});
