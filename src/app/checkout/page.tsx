import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { CartItem, SearchParams } from '@/utils/interface/types';
import { IProduct } from '@/utils/interface/product';
import Link from 'next/link';

const createCart = async (items: IProduct[]) => {
  console.log(items);
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // console.log(cookieStore.getAll())
  const { data } = await supabase.auth.getUser();

  // const {data: cart, error} = await supabase.from('cart')
  //     .select()
  //     .eq('user_id',data?.user?.id)
  //     .order('created_at', {ascending: false})
  //     .single()
  //
  // console.log(data?.user?.id)
  // console.log(cart)
  //
  // if(cart?.id) {
  //
  // } else {
  //
  // }
  const { data: cartData, error: someError } = await supabase
    .from('cart')
    .insert({
      user_id: data?.user?.id,
      converted: false,
    })
    .select()
    .order('created_at', { ascending: false })
    .single();

  if (someError) {
    throw new Error(someError.message);
  }

  console.log(cartData?.id);
  let games: CartItem[] = [];
  items.forEach((item: IProduct) => {
    games.push({
      game_id: item.id,
      cart_id: cartData?.id,
      order_id: null,
    });
  });
  const { error: cartItemsError } = await supabase
    .from('cart_item')
    .insert(games);
  // //
  if (cartItemsError) {
    throw new Error(cartItemsError.message);
  }
  console.log(cartData, someError);
  // console.log(cartItemsSuccess, cartItemsError)

  // const {data, error} = await supabase.from('cart_items').insert()
  return cartData?.id;
};

export default async function IndexPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { canceled, items } = await searchParams;
  let cartId = null;
  console.log(items);
  if (items) {
    cartId = await createCart(JSON.parse(items));
  }
  if (canceled) {
    console.log(
      'Order canceled -- continue to shop around and checkout when you’re ready.',
    );
  }
  return (
    <div className='text-center items-center justify-center w-full p-5'>
      <form action='/api/checkout_sessions' method='POST'>
        <section className='relative'>
          <p className='font-semibold text-red-600 p-3 bg-red-300'>
            This is a dummy project, please don't make actual payment using your
            card details.{' '}
          </p>

          <p className='text-lg my-3'>
            Please click the button to make payment. You will be redirect to the
            Stripe payment gateway.
          </p>
          <input
            className='opacity-0 absolute top-0'
            readOnly={true}
            type='text'
            name='cart'
            value={cartId}
          />
          <button
            type='submit'
            role='link'
            className='bg-violet-500 text-white p-4 hover:bg-violet-700 cursor-pointer'
          >
            Proceed to payment
          </button>
        </section>
      </form>
      <div className='flex items-center justify-center mt-5'>
        <Link
          href='\cart'
          className='bg-amber-500 text-white p-4 hover:bg-amber-700 cursor-pointer px-9'
        >
          Go back to cart
        </Link>
      </div>
      <div className='my-4 sm:w-1/2 m-auto max-sm:w-full'>
        <p className='font-semibold mt-4 text-justify'>
          Use following card details for dummy payment:
        </p>
        <ul className='text-justify'>
          <li>Card: 4242 4242 4242 4242</li>
          <li>Expiry: any date in the future</li>
          <li>CVV: any 3 digits</li>
        </ul>
      </div>
    </div>
  );
}
