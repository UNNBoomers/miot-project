import React from 'react';
import { Zone } from '../types.ts';

type ZoneSelectorProps = {

  zones: Zone[];
  onSelectZone: (zoneId: Zone) => void;
  currentZone: Zone | null;
};

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({ zones, onSelectZone, currentZone }) => {
  return (
    <div className='flex space-x-2'>
      {zones.map(zone => (
        <button
          key={zone.id}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${zone.id === currentZone?.id ? 'bg-blue-700' : 'bg-blue-500'}`}
          onClick={() => onSelectZone(zone)}
        >
          {zone.name}
        </button>
      ))}
    </div>
  );
};
