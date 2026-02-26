'use client';

import { IProduct } from '@/utils/interface/product';
import useAppStore from '../../../store';
import Link from 'next/link';
import Image from 'next/image';
import { FallBackUrl } from '@/utils/helpers/constants.ts';

export const ProductCard = ({ product }: { product: IProduct }) => {
  const { name, id, price, thumbnail } = product;

  const { products, addProduct } = useAppStore();

  const addToCart = () => {

    const hasItem = products.filter((game: IProduct) => game.id === product.id);

    if (hasItem?.length) {
      alert('Already added to cart');
      return;
    }

    addProduct(product);
  };

  return (
    <article className='GameCard flex flex-col p-4 min-w-2xs max-w-3xl m-3 bg-white border border-gray-200 shadow-lg'>
      <Image
        src={thumbnail}
        className='w-full'
        alt={name}
        width={100}
        height={100}
        loading='eager'
        placeholder='blur'
        blurDataURL={FallBackUrl}
        aria-label='Product Image'
      />
      <h3 className='text-xl text-center text-black text-wrap'>{name}</h3>
      <p className='text-2xl font-bold text-center text-black'>${price}</p>
      <button
        className='bg-amber-700 text-white py-2 my-2 hover:bg-amber-600 hover:cursor-pointer'
        onClick={addToCart}
      >
        Add to Cart
      </button>
      <Link href={`/games/${id}`}>
        <button className='bg-violet-500 w-full text-white py-2 hover:bg-violet-600 hover:cursor-pointer'>
          See details
        </button>
      </Link>
    </article>
  );
};
