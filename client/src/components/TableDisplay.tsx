import React from 'react';
import { Desk } from '../types';

type TablesDisplayProps = {
  tables: Desk[];
};

const TablesDisplay: React.FC<TablesDisplayProps> = ({ tables }) => {
  return (
    <div>
      {tables.length > 0 ? (
        <div className='grid grid-cols-3 gap-4'>
          {tables.map(table => (
            <div
              key={table.id}
              className={`p-4 border rounded ${table.status === 'offline' ? 'bg-red-200' : table.status === 'inactive' ? 'bg-grey-200' : 'bg-green-200'}`}
            >
              {table.id}
              <p>Status: {table.status}</p>
              {table.lastUsed && <p>Last used: {table.lastUsed?.toLocaleString()}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center p-4'>
          <p>Tato zóna nemá žádné stoly</p>
        </div>
      )}
    </div>
  );
};

export { TablesDisplay };
