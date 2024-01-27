import { useDesks } from '../api/useDesks.ts';
import { TablesDisplay } from './TableDisplay.tsx';
import { useState } from 'react';

type DesksProps = {
  zoneId: string;
}

export const Desks = ({ zoneId }: DesksProps) => {
  const [unit, setUnit] = useState<'day' | 'week'>('day');
  const [count, setCount] = useState(14);
  const { desks, isError, isLoading } = useDesks([zoneId], count, unit);


  return (
    <>
      {!zoneId && <p className='text-center text-lg font-medium'>Vyberte zónu</p>}
      {isLoading && zoneId && <p className='text-center'>Načítání...</p>}
      {isError && zoneId && <p className='text-center text-red-500'>Došlo k chybě při načítání dat.</p>}
      {zoneId && (!desks || (desks?.length)) === 0 && <p className='text-center'>Tato zóna nemá žádné stoly</p>}
      {zoneId && desks && desks.length > 0 &&
        <TablesDisplay tables={desks} count={count} setCount={setCount} unit={unit} setUnit={setUnit}
                       />}
    </>
  );
};
