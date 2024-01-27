import { useZones } from '../api/useZones.ts';
import { Zones } from '../components/Zones.tsx';
import { Zone } from '../types.ts';

type ZonePageProps = {
  currentZone: Zone | null;
  setCurrentZone: (zone: Zone) => void;
}
const ZonePage = ({ currentZone, setCurrentZone }: ZonePageProps) => {
  const { zones, isError, isLoading } = useZones();

  return (

    <>
      {isLoading && <p>Načítání...</p>}
      {isError && <p>Došlo k chybě při načítání dat.</p>}
      {!zones || (zones?.length) === 0 && <p>Nejsou k dispozici žádné zóny</p>}
      {zones && zones.length > 0 &&
        <Zones zones={zones} currentZone={currentZone} setCurrentZone={setCurrentZone} />}

    </>
  );
};

export default ZonePage;