import { test, expect } from '@playwright/test';

test('Filter games in home page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByTestId('game-filter')).toBeVisible();

  const filter = await page.getByTestId('game-filter');

  expect(filter.getByRole('option')).toHaveCount(5);

  filter.selectOption('Action');

  await page.waitForURL('/?filter=Action');

  await expect(page).toHaveURL('/?filter=Action');

  filter.selectOption('RPG');

  await page.waitForURL('/?filter=RPG');

  await expect(page).toHaveURL('/?filter=RPG');
});
