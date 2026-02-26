import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import dayjs from 'dayjs';
import { OrderItem } from '@/utils/interface/types';

async function getOrders() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  const { data: orders, error: orderError } = await supabase
    .from('orders')
    .select()
    .eq('user_id', data?.user?.id);

  console.log(data);
  console.log(orders);
  return orders;
}

const OrdersPage = async () => {
  const orders = await getOrders();

  return (
    <section
      id='orders'
      className='flex flex-col justify-center items-center w-full'
    >
      <p className='text-2xl font-semibold my-5'>Orders</p>
      <hr />
      <div className='overflow-auto h-[60vh] max-sm:w-full sm:w-2/3 text-left max-sm:p-3'>
        <table className='sm:w-full'>
          <thead>
            <tr className='p-2'>
              <th className='border-2 border-gray-300 p-1 max-sm:min-w-[100px]'>
                Order No.
              </th>
              <th className='border-2 border-gray-300 p-1 max-sm:min-w-[100px]'>
                Items.
              </th>
              <th className='border-2 border-gray-300 p-1 max-sm:min-w-[100px] '>
                Price
              </th>
              <th className='border-2 border-gray-300 p-1 max-sm:min-w-[100px]'>
                Qty
              </th>
              <th className='border-2 border-gray-300 p-1 max-sm:min-w-xs'>
                Date
              </th>
              <th className='border-2 border-gray-300 p-1 text-center max-sm:min-w-[100px]'>
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: OrderItem) => (
              <tr key={order.cart_id + order.id} className='my-2'>
                <td className='border-2 border-gray-300 p-1'> {order.id}</td>
                <td className='border-2 border-gray-300 p-1'>
                  {' '}
                  {order?.items}
                </td>
                <td className='border-2 border-gray-300 p-1'>
                  ${order?.total / 100}
                </td>
                <td className='border-2 border-gray-300 p-1'>{order.qty}</td>
                <td className='border-2 border-gray-300 p-1'>
                  {dayjs(order.created_at).format('DD-MMM-YYYY HH:mm:ss')}
                </td>
                <td className='border-2 border-gray-300 p-1 text-center '>
                  <span className='flex justify-center w-full'>
                    <img src='/eye.svg' className='w-8' alt='' />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ul></ul>
      </div>
    </section>
  );
};

export default OrdersPage;
