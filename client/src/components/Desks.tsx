import { useDesks } from '../api/useDesks.ts';
import { TablesDisplay } from './TableDisplay.tsx';

type DesksProps = {
  zoneId: string;
}

export const Desks = ({ zoneId }: DesksProps) => {

  const { desks, isError, isLoading } = useDesks([zoneId]);
  return (
      <>
        {!zoneId && <p className="text-center text-lg font-medium">Vyberte zónu</p>}
        {isLoading && zoneId && <p className="text-center">Načítání...</p>}
        {isError && zoneId && <p className="text-center text-red-500">Došlo k chybě při načítání dat.</p>}
        {zoneId && (!desks || (desks?.length)) === 0 && <p className="text-center">Tato zóna nemá žádné stoly</p>}
        {zoneId && desks && desks.length > 0 && <TablesDisplay tables={desks} />}
      </>
  );
};
