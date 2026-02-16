import {test, expect} from "@playwright/test";

test('Search games in Home page', async({page}) => {
    await page.goto('http://localhost:3000');

    await expect(page.getByTestId('game-search')).toBeVisible()

    const searchBar = page.getByTestId('game-search');

    await searchBar.fill('Call')

    await searchBar.press('Enter')

    await page.waitForURL('/?query=Call')

    await expect(page).toHaveURL('/?query=Call')
})