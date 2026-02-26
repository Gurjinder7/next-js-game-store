'use client';
import { IProduct } from '@/utils/interface/product';
import useAppStore from '../../../store';
import Image from 'next/image';
import { FallBackUrl } from '@/utils/helpers/constants.ts';

const DetailCard = (props: { game: IProduct | null }) => {
  const { game } = props;

  const { products, addProduct } = useAppStore();

  const addToCart = (product: IProduct | null) => {
    console.log('addToCart');
    if (product) {
      const hasItem = products.filter(
        (game: IProduct) => game.id === product.id,
      );

      if (hasItem?.length) {
        alert('Already added to cart');
        return;
      }

      addProduct(product);
    }
  };
  return (
    <section className='flex gap-10 flex-wrap p-5 my-5 bg-white sm:w-1/2 max-sm:w-full border-gray-200 border shadow-lg'>
      <div className='w-1/4 max-sm:w-full'>
        <Image
          src={game?.thumbnail ? game.thumbnail : ''}
          className='w-full'
          alt='Thumbnail image'
          width={100}
          height={100}
          placeholder='blur'
          blurDataURL={FallBackUrl}
        />
      </div>
      <div className='text-black font-semibold w-2/3'>
        <h1 className='text-3xl font-bold py-3'>{game?.name}</h1>
        <h2 className='text-xl py-3'>Genre: {game?.genre}</h2>
        <h2 className='text-xl py-3'>Year: {game?.year}</h2>
        <h1 className='font-bold text-4xl py-3'>${game?.price}</h1>
        <div className='flex justify-end '>
          <button
            className='bg-amber-700 text-white p-3 hover:bg-amber-600 hover:cursor-pointer'
            onClick={() => addToCart(game)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default DetailCard;
