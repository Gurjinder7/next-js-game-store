import {expect, test} from "vitest";
import { render } from 'vitest-browser-react'
import ClearCart from "../../src/app/components/ClearCart.tsx";

// function sum(...args: number[]) {
//     return args.reduce((a, b) => a + b);
// }
//
// test('adds 1 and 2 to equal 3', () => {
//     expect(sum(1,2)).toBe(3)
// })
//

test('ClearCart component rendering', async () => {
    const screen = await render(<ClearCart />)

    // await screen.getByRole('button', { name: 'Increment' }).click()

    await expect.element(screen.getByText('Your order has been placed!')).toBeVisible()
})

