import {test, expect} from "@playwright/test";

test('Filter games in home page', async ({page}) => {
    await page.goto('http://localhost:3000')

    await expect(page.getByTestId('game-sort')).toBeVisible()

    const filter = await page.getByTestId('game-sort')

    expect(filter.getByRole('option' )).toHaveCount(5)

    filter.selectOption('1')

    await page.waitForURL('/?sortBy=name&sortOrder=desc');

    await expect(page).toHaveURL('/?sortBy=name&sortOrder=desc');

    filter.selectOption('3')

    await page.waitForURL('/?sortBy=price&sortOrder=desc');

    await expect(page).toHaveURL('/?sortBy=price&sortOrder=desc');
})