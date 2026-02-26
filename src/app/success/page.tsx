import { redirect } from 'next/navigation';
import { stripe } from '@/utils/Stripe/stripe';
import ClearCart from '@/app/components/ClearCart';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { LineProduct, SearchParams } from '@/utils/interface/types';

const createOrder = async (cartID: string, items: any) => {
  const coookieStore = await cookies();
  const supabase = createClient(coookieStore);

  let price = 0;
  let games = '';
  items?.data.forEach((item: LineProduct) => {
    price += item.amount_total;
    games += item.description + ', ';
  });

  console.log(price);
  console.log(items?.data.length);
  const { data: user } = await supabase.auth.getUser();

  const { error } = await supabase.from('orders').insert({
    cart_id: cartID,
    user_id: user?.user?.id,
    qty: items?.data?.length,
    items: games,
    total: price,
  });

  if (error) throw new Error(error.message);
};

export default async function Success({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { session_id, cart } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const {
    status,
    // customer_details: {email: customerEmail},
    line_items,
  } = await stripe.checkout.sessions.retrieve(session_id as string, {
    expand: ['line_items', 'payment_intent'],
  });

  console.log(status);
  console.log(line_items);

  if (status === 'open') {
    return redirect('/cart');
  }

  if (status === 'complete') {
    if (cart) {
      await createOrder(cart, line_items);
    }

    return (
      <section
        id='success'
        className='flex items-center justify-center flex-col'
      >
        <ClearCart />

        <p className='text-lg my-5'>
          We appreciate your business! A confirmation email will be sent to{' '}
          {/*{customerEmail}. */}
          If you have any questions, please email{' '}
        </p>
        <a href='mailto:orders@phoenixgamestore.com'>orders@example.com.</a>
      </section>
    );
  }
}
