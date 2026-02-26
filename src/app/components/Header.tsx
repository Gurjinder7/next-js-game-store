'use client';
import Link from 'next/link';
import useAppStore from '../../../store';

const Header = () => {
  const {
    products,
    toggleLoginDialog,
    loginDialog,
    authenticated,
    sidebar,
    toggleSidebar,
  } = useAppStore();

  return (
    <>
      <nav className='p-3 navbar navbar-expand-lg navbar-dark bg-dark h-[8vh] flex justify-between bg-violet-600 text-white'>
        <div className='flex items-center' title='Guinea GameStore'>
          <img width={30} height={30} src='/guinea.svg' alt='logo' />
          <span className='font-bold text-3xl'>GG</span>
        </div>

        <div className='max-sm:hidden sm:flex gap-5 text-white flex-nowrap'>
          <Link href='/' className='flex gap-2 justify-around items-center'>
            <img className='w-1/2 h-1/2' src='/home.svg' alt='home' /> Home
          </Link>
          {authenticated && (
            <Link
              href='/orders'
              data-testid='myOrders'
              className='flex gap-2 justify-around items-center'
            >
              <img className='w-1/2 h-1/2' src='/orders.svg' alt='my orders' />{' '}
              Orders
            </Link>
          )}
        </div>
        <div className='max-sm:hidden sm:flex items-center justify-center pr-5 pt-3 '>
          <button
            data-testid='user-auth-toggle'
            className='px-5 cursor-pointer'
            onClick={() => toggleLoginDialog(!loginDialog)}
            title='log in to your account'
          >
            <img src='/user.svg' className='w-[2rem]' alt='' />
          </button>

          <span className='relative'>
            {products.length > 0 && (
              <span
                className=' flex justify-center items-center absolute top-[-15px] right-[-25px] rounded-full p-2 bg-amber-400 text-black font-bold w-[30px] h-[30px]'
                data-testid='cart-total'
              >
                {products.length}
              </span>
            )}
            <Link href='/cart' data-testid='cart-link'>
              <img src='/cart.svg' width={30} height={30} alt='cart' />
            </Link>
          </span>
        </div>
        {/*</div>*/}
        <div className='max-sm:block sm:hidden'>
          <img
            src='/ham.svg'
            className='w-[3rem]'
            alt='ham-icon'
            onClick={() => toggleSidebar(true)}
          />
        </div>
      </nav>
      {sidebar && (
        <div className='h-screen w-screen sm:hidden bg-black fixed top-0 left-0 z-20 text-white'>
          <span
            className='absolute right-2 top-2 text-5xl'
            onClick={() => toggleSidebar(false)}
          >
            &times;
          </span>
          <ul className='mt-[15vh]' onClick={() => toggleSidebar(false)}>
            <li className='my-[4rem] border-b-2 text-center text-4xl pb-3'>
              <Link href='/' className='flex gap-2 justify-around items-center'>
                Home
              </Link>
            </li>
            {authenticated && (
              <li className='my-[4rem] border-b-2 text-center text-4xl pb-3'>
                <Link
                  href='/orders'
                  className='flex gap-2 justify-around items-center'
                >
                  Orders
                </Link>
              </li>
            )}
            <li className='my-[4rem] border-b-2 text-center text-4xl pb-3'>
              <button
                className='px-5 cursor-pointer'
                onClick={() => toggleLoginDialog(!loginDialog)}
                title='log in to your account'
              >
                My Account
              </button>
            </li>
            <li className='my-[4rem] border-b-2 text-center text-4xl relative pb-3'>
              <span className=''>
                {products.length > 0 && (
                  <span className=' flex justify-center text-xl items-center absolute right-2 rounded-full p-2 bg-amber-400 text-black font-bold w-[30px] h-[30px]'>
                    {products.length}
                  </span>
                )}
                <Link href='/cart'>My Cart</Link>
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
