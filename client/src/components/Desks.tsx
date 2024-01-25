import { useDesks } from '../api/useDesks.ts';
import { TablesDisplay } from './TableDisplay.tsx';

type DesksProps = {
  zoneId: string;
}

export const Desks = ({ zoneId }: DesksProps) => {

  const { desks, isError, isLoading } = useDesks([zoneId]);
  console.log("DESKS", desks);
  return (
    <>
      {isLoading && <p>Načítání...</p>}
      {isError && <p>Došlo k chybě při načítání dat.</p>}
      {!desks || (desks?.length) === 0 && <p>Tato zóna nemá žádné stoly</p>}
      {desks && desks.length > 0 && <TablesDisplay tables={desks} />}

    </>
  );
};
