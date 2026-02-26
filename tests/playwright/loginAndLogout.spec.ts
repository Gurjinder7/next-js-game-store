import { test, expect } from '@playwright/test';

test('Login a user --> go to my orders --> logout', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page.getByTestId('user-auth-toggle')).toBeVisible();

  const element = await page.getByTestId('user-auth-toggle');

  element.click();

  await expect(page.getByTestId('login-form')).toBeVisible();

  const loginForm = page.getByTestId('login-form');

  await loginForm.getByPlaceholder('Email').fill('test@gmail.com');

  await loginForm.getByPlaceholder('Password').fill('123123');

  await loginForm.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByTestId('myOrders')).toBeVisible();
  //
  await page.getByTestId('myOrders').click();

  await page.waitForURL('/orders');

  await expect(page).toHaveURL('/orders');

  element.click();

  await expect(page.getByTestId('logout-user')).toBeVisible();

  await page.getByTestId('logout-user').click();

  await expect(page.getByTestId('myOrders')).not.toBeVisible();
});
