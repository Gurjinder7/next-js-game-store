import {expect, test} from "vitest";
import { ProductCard } from "../../src/app/components/Card.tsx";
import {render, screen} from "@testing-library/react";


test('Product Card Rendering', async () => {
    render(<ProductCard product={{
        name:'test',
        id:1,
        genre:'Action',
        price: 1.2,
        year: 2001,
        thumbnail: 'some_url',created_at: 'now'
    }}/>)
    await expect(screen.getByText('See details')).toBeVisible()

})