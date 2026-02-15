import { test, expect } from '@playwright/test';

test('Home page has a title that contains GameStore', async ({ page }) => {
  await page.goto('https://next-js-game-store.vercel.app/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GameStore/);
});

test('See details of a listed game from Home page', async ({ page }) => {
  await page.goto('https://next-js-game-store.vercel.app/');

  // Expect Home link to appear
  await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

  // 16 listed games
  await expect(page.getByRole('link', { name: 'See details' })).toHaveCount(16);

    const element = await page.getByRole('link', { name: 'See details' }).first();

    await expect(element).toBeVisible();

    await element.scrollIntoViewIfNeeded();

    await element.click();

    // IF click is not working due to overlay issue in next.js - use one of the following
    // await ele.click({force: true}); - not preferred
    // await ele.dispatchEvent('click') - preferred

    // waiting for the navigation to complete
    await page.waitForURL('https://next-js-game-store.vercel.app/games/5');

    // comparing navigated link to the expected link
    await expect(page).toHaveURL('https://next-js-game-store.vercel.app/games/5');

});
