import { test, expect } from 'playwright/test';

test('Add to 2 games to cart, check cart items and navigate to cart ', async ({
  page,
}) => {
  await page.goto('');

  await expect(page.locator('.GameCard')).toHaveCount(16);

  const games = await page.locator('.GameCard');

  const first = games.first();
  const last = games.last();

  await expect(first.getByRole('button', { name: 'Add to Cart' })).toBeTruthy();

  await first
    .getByRole('button', { name: 'Add to Cart' })
    .dispatchEvent('click');

  // last.scrollIntoViewIfNeeded()

  await expect(last.getByRole('button', { name: 'Add to Cart' })).toBeVisible();

  await last.getByRole('button', { name: 'Add to Cart' }).click();

  await expect(page.getByTestId('cart-total')).toHaveText('2');

  // await page.getByTestId('cart-link').dispatchEvent('click');

  await page.goto('/cart');

  await page.waitForURL('/cart');
});
