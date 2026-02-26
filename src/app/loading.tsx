import Loader from '@/app/components/Loader.tsx';

const HomePageLoader = () => {
  return (
    <div className='flex justify-center items-center gap-10'>
      <Loader />
    </div>
  );
};

export default HomePageLoader;
