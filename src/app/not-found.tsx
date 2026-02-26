import Image from 'next/image';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <Image src='/404.svg' width={500} height={500} alt='404 image' />
      <p className='text-2xl text-violet-500 font-semibold'>Page not found! </p>
    </div>
  );
}
