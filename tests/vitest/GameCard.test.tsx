import { expect, test } from 'vitest';
import { ProductCard } from '@/app/components/Card.tsx';
import { render, screen } from '@testing-library/react';

const product = {
  name: 'test',
  id: 1,
  genre: 'Action',
  price: 1.2,
  year: 2001,
  thumbnail: 'some_url',
  created_at: 'now',
};

test('Product Card Rendering', async () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText('See details')).toBeVisible();
});

test('GameCard component snapshot', () => {
  const asFragment = render(<ProductCard product={product} />);
  expect(asFragment).toMatchSnapshot();
});
