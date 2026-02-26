import useAppStore from '../../../store';
import { IProduct } from '@/utils/interface/product';

const CartItem = ({ game }: { game: IProduct }) => {
  const { removeProduct } = useAppStore();

  const removeFromCart = () => {
    removeProduct(game);
  };

  return (
    <section className='flex items-center p-3 bg-white my-4 shadow-lg border border-gray-200'>
      <div>
        <img src={game?.thumbnail} className='w-1/3 h-1/3' alt='thumbnail' />
      </div>
      <div className='flex flex-col w-full text-black text-xl font-semibold'>
        <p>{game?.name}</p>
        <p>${game?.price}</p>
        <div className='flex justify-end items-center'>
          <button
            className='bg-red-700 text-white p-2 text-xs hover:bg-red-600 cursor-pointer flex items-center'
            onClick={removeFromCart}
          >
            <img src='/bin.svg' className='w-[1rem] h-[1rem]' alt='bin item' />
            Remove
          </button>
        </div>
      </div>
    </section>
  );
};

export default CartItem;
