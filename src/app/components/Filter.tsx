'use client';
import { usePathname, useRouter } from 'next/navigation';
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
      filter = GENRE.action;
    } else if (selection === GENRE.shooter) {
      filter = GENRE.shooter;
    } else if (selection === GENRE.rpg) {
      filter = GENRE.rpg;
    } else {
      filter = GENRE.adventure;
    }

    router.push(`/${pathName}?filter=${filter}`);
  };

  return (
    <article className=''>
      <select
        data-testid='game-filter'
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
