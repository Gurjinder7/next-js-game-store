import { expect, test } from '@playwright/test';

test('Check order route is protected on anonymous user', async ({ page }) => {
  await page.goto('http://localhost:3000/orders');

  await page.waitForURL('http://localhost:3000/');

  await expect(page).toHaveURL('http://localhost:3000/');
});

test('Check checkout route is protected on anonymous user', async ({
  page,
}) => {
  await page.goto('http://localhost:3000/checkout');

  await page.waitForURL('http://localhost:3000/');

  await expect(page).toHaveURL('http://localhost:3000/');
});
