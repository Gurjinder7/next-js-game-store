import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { ProductCard } from '@/app/components/Card';
import { IProduct } from '@/utils/interface/product';
import SearchBar from '@/app/components/SearchBar';
import { Suspense } from 'react';
import SortGames from '@/app/components/Sort';
import FilterGames from '@/app/components/Filter';
import { SearchParams } from '@/utils/interface/types';

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { query: search, sortBy, sortOrder, filter } = await searchParams;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('games')
    .select()
    .ilike('name', `%${search ? search : ''}%`)
    .order(sortBy ?? 'name', {
      ascending: sortOrder === 'asc' || sortOrder === undefined,
    });

  if (filter) {
    query.eq('genre', filter);
  }

  const { data: products } = await query;

  return (
    <div>
      <div className='flex justify-center gap-5 max-sm:flex-col max-sm:p-2'>
        <div>
          <SearchBar />
        </div>
        <div className='flex justify-evenly gap-5 items-center'>
          <FilterGames />
          <SortGames />
        </div>
      </div>
      <hr />
      <main role="main" className='flex justify-between items-center gap-10 flex-wrap p-5 max-sm:justify-center'>
        <Suspense fallback={<div>Loading...</div>}>
          {products?.map((product: IProduct) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Suspense>
      </main>
    </div>
  );
}
