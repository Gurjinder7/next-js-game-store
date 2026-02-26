'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { createQueryUrl } from '@/utils/helpers/urlPath';
import {SortCategory, SortOrder, SortValue} from "@/utils/helpers/constants.ts";

const SortGames = () => {
  const router = useRouter();

  const searchParams = useSearchParams().toString();
  const pathname = usePathname();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

    let selectedOption = e.target.value;

    let sortBy = SortCategory.name;
    let sortOrder = SortOrder.asc;

    if (selectedOption === SortValue.opt1) {
      sortBy = SortCategory.name;
      sortOrder = SortOrder.desc;
    } else if (selectedOption === SortValue.opt2) {
      sortBy = SortCategory.price;
      sortOrder = SortOrder.asc;
    } else if (selectedOption === SortValue.opt3) {
      sortBy = SortCategory.price;
      sortOrder = SortOrder.desc;
    }
    router.push(
      `${pathname}?sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}${searchParams ? createQueryUrl(false, searchParams) : ''}`,
    );
  };
  return (
    <select
      data-testid='game-sort'
      onChange={handleSortChange}
      className='border-2 border-gray-200 p-2'
      aria-label='Sort games'
    >
      <optgroup label='Name'>
        <option value={SortValue.opt0}>Asc</option>
        <option value={SortValue.opt1}>Desc</option>
      </optgroup>
      <optgroup label='Price'>
        <option value={SortValue.opt2}>Low-High</option>
        <option value={SortValue.opt3}>High-Low</option>
      </optgroup>
      <option></option>
    </select>
  );
};

export default SortGames;
