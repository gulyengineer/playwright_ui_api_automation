import { test, expect } from '@playwright/test';

test('GET request to JSONPlaceholder returns post 1', async ({ request }) => {
  const response = await request.get('/posts/1');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('id', 1);
});
