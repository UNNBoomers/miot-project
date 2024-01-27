import React, { useEffect, useState } from 'react';
import { Desk } from '../types';
import { DeskStatistics } from './DeskStatistics.tsx';

type TablesDisplayProps = {
  tables: Desk[];
  count: number;
  unit: 'day' | 'week';
  setCount: (count: number) => void;
  setUnit: (unit: 'day' | 'week') => void;
};

const TablesDisplay: React.FC<TablesDisplayProps> = ({ tables, count, setCount, unit, setUnit }) => {
  const [selectedTables, setSelectedTables] = useState<Desk[]>(tables);

  useEffect(() => {
    // Reset selected tables when currentZone changes
    setSelectedTables(tables);
  }, [tables]);
  const toggleTableSelection = (table: Desk) => {
    if (selectedTables.includes(table)) {
      setSelectedTables(selectedTables.filter(t => t.id !== table.id));
    } else {
      setSelectedTables([...selectedTables, table]);
    }
  };
  const getFormattedDate = (lastUsed: Date) => {
    return `${lastUsed.getDate()}-${lastUsed.getMonth() + 1}-${lastUsed.getFullYear()} ${lastUsed.getHours()}:${lastUsed.getMinutes()}`;

  };
  return (
    <div className='bg-gray-100 p-4 rounded-lg shadow'>
      {tables.length > 0 ? (
        <>
          <div className='grid grid-cols-3 gap-4 mb-8'>
            {tables.map((table, i) => (
              <div
                key={table.id}
                onClick={() => toggleTableSelection(table)}
                className={`p-4 border rounded shadow-sm cursor-pointer ${selectedTables.includes(table) ? 'ring-2 ring-blue-500' : ''} ${table.status === 'offline' ? 'bg-red-200' : table.status === 'inactive' ? 'bg-gray-200' : 'bg-green-200'}`}
              >
                <div className='font-bold text-lg'>{`Desk ${i + 1}`}</div>
                <p>Status: {table.status}</p>
                {table.lastUsed && <p>Last used: {getFormattedDate(table.lastUsed)}</p>}
              </div>
            ))}
          </div>
          {selectedTables.length > 0 && <div className='p-4 bg-white rounded-lg shadow'>
            <DeskStatistics desks={selectedTables} unit={unit} count={count} setUnit={setUnit} setCount={setCount} />
          </div>}

        </>
      ) : (
        <div className='text-center'>
          <p>Tato zóna nemá žádné stoly</p>
        </div>
      )}
    </div>
  );
};

export { TablesDisplay };
