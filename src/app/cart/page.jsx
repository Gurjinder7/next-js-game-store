'use client';

import useAppStore from '../../../store';
import { Activity, Suspense, useEffect, useState } from 'react';
import CartItem from '../components/Cart';
import Link from 'next/link';

export const CartPage = () => {
  const [total, setTotal] = useState(0);
  const { products, authenticated } = useAppStore();

  useEffect(() => {
    setTotal(0);
    let itemsTotal = 0;
    products.map((product) => {
      itemsTotal += product.price;
    });

    setTotal(Number(parseFloat(itemsTotal).toFixed(2)));
  }, [products]);

  return (
    <div className='p-3 flex flex-col justify-center items-center'>
      {!authenticated && products.length > 0 && (
        <p className='font-semibold text-amber-700 py-2 px-5 bg-amber-300'>
          Please login to checkout.
        </p>
      )}

      <div className='max-sm:w-full sm:w-1/2 h-[50vh] overflow-auto'>
        {products && products.length === 0 && (
          <div className='text-center text-2xl flex flex-col items-center'>
            <img
              src='/emptyCart.svg'
              className='w-1/4 h-1/4'
              alt='empty cart image'
            />
            <p className=''>Your cart is empty!</p>
          </div>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (
            <CartItem game={product} key={product.id} />
          ))}
        </Suspense>
      </div>

      <h3 className='text-2xl font-semibold mt-5'>Cart Details</h3>

      <div className='sm:w-1/2 max-sm:w-full text-xl'>
        <hr />
        <p className='flex justify-between py-3'>
          <span>Total items:</span> <span> {products.length}</span>
        </p>
        <hr />
        <p className='flex justify-between py-3'>
          <span>Total Price:</span> <span> ${total}</span>
        </p>
        <div className='flex flex-col items-center justify-center py-3'>
          <Activity
            mode={products.length > 0 && authenticated ? 'visible' : 'hidden'}
          >
            <Link
              href={`/checkout?items=${JSON.stringify(products)}`}
              className='text-white bg-amber-700 p-3 hover:bg-amber-600 w-fit'
            >
              Go to Checkout
            </Link>
          </Activity>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
