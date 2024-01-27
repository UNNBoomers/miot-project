import { ZoneSelector } from './ZoneSelector.tsx';
import { Desks } from './Desks.tsx';
import { Zone } from '../types.ts';

type ZonesProps = {
  zones: Zone[]
  currentZone: Zone | null;
  setCurrentZone: (zone: Zone) => void;
}

export const Zones = ({ zones, currentZone, setCurrentZone }: ZonesProps) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='mb-4'>
          <ZoneSelector zones={zones} onSelectZone={setCurrentZone} currentZone={currentZone} />
        </div>
        <div className='w-full'>
          <Desks zoneId={currentZone?.id ?? ''} />
        </div>
      </div>
    </>
  );
};