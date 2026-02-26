'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { GENRE } from '@/utils/helpers/constants';

const FilterGames = () => {
  const router = useRouter();
  const pathName = usePathname();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selection = event.target.value;
    let filter;
    if (selection === GENRE.all) {
      filter = '';
    } else if (selection === GENRE.action) {
      filter = 'Action';
    } else if (selection === GENRE.shooter) {
      filter = 'Shooter';
    } else if (selection === GENRE.rpg) {
      filter = 'RPG';
    } else {
      filter = 'Adventure';
    }

    router.push(`/${pathName}?filter=${filter}`);
  };

  return (
    <article className=''>
      <select
        data-testid='game-filter'
        name=''
        id=''
        onChange={handleFilterChange}
        className='border-2 border-gray-200 p-2'
      >
        <option value={GENRE.all}>{GENRE.all}</option>
        <option value={GENRE.action}>{GENRE.action}</option>
        <option value={GENRE.shooter}>{GENRE.shooter}</option>
        <option value={GENRE.rpg}>{GENRE.rpg}</option>
        <option value={GENRE.adventure}>{GENRE.adventure}</option>
      </select>
    </article>
  );
};

export default FilterGames;
