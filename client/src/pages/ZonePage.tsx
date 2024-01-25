import { ZoneSelector } from '../components/ZoneSelector.tsx';
import { FC, useState } from 'react';
import { Desks } from '../components/Desks.tsx';
import { useZones } from '../api/useZones.ts';
import { Zone } from '../types.ts';

const ZonePage: FC = () => {

  const [currentZone, setCurrentZone] = useState<Zone>({ id: 'zone1', name: 'Zone 1' });
  const { zones, isError, isLoading } = useZones();


  return (

    <>
      {isLoading && <p>Načítání...</p>}
      {isError && <p>Došlo k chybě při načítání dat.</p>}
      {!zones || (zones?.length) === 0 && <p>Nejsou k dispozici žádné zóny</p>}
      {zones && zones.length > 0 &&
        <div className='flex flex-col justify-center items-center'>
        <div className='mb-4'>
          <ZoneSelector zones={zones} onSelectZone={setCurrentZone} />
        </div>
        <div className='w-full'>
          <Desks zoneId={currentZone.id} />
        </div>
      </div>}

    </>
  );
};

export default ZonePage;