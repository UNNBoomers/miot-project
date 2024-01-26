import { FC } from 'react';
import { useZones } from '../api/useZones.ts';
import { Zones } from '../components/Zones.tsx';

const ZonePage: FC = () => {

  const { zones, isError, isLoading } = useZones();
  return (

    <>
      {isLoading && <p>Načítání...</p>}
      {isError && <p>Došlo k chybě při načítání dat.</p>}
      {!zones || (zones?.length) === 0 && <p>Nejsou k dispozici žádné zóny</p>}
      {zones && zones.length > 0 &&
        <Zones zones={zones} />}

    </>
  );
};

export default ZonePage;