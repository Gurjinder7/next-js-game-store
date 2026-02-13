import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://next-js-game-store.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GameStore/);
});

test('get home page with query', async ({ page }) => {
  await page.goto('https://next-js-game-store.vercel.app/?query=call');

  await expect(page.getByRole('link', { name: 'See details' })).toHaveCount(3);

  // Click the get started link.
  await page.getByRole('link', { name: 'See details' }).last().click();

  // console.log(items);
  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
