import { ZoneSelector } from './ZoneSelector.tsx';
import { Desks } from './Desks.tsx';
import { Zone } from '../types.ts';
import { useState } from 'react';

type ZonesProps = {
  zones: Zone[]
}
export const Zones = ({ zones }: ZonesProps) => {
  const [currentZone, setCurrentZone] = useState<Zone>(zones[0]);
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='mb-4'>
        <ZoneSelector zones={zones} onSelectZone={setCurrentZone} />
      </div>
      <div className='w-full'>
        <Desks zoneId={currentZone.id} />
      </div>
    </div>
  );
};