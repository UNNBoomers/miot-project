import React, { useState } from 'react';
import { Desk } from '../types';

type DeskStatisticsProps = {
  desks: Desk[];
};

const DeskStatistics: React.FC<DeskStatisticsProps> = ({ desks }) => {
  const [periodNumber, setPeriodNumber] = useState('14'); // Default to 14
  const [periodUnit, setPeriodUnit] = useState('days'); // Default to days

  const handlePeriodNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodNumber(e.target.value);
  };

  const handlePeriodUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPeriodUnit(e.target.value);
  };


  return (
    <div>
      <div className='mb-4 flex items-center'>
        <label htmlFor='periodNumber' className='block text-sm font-medium text-gray-700 mr-2'>
          Select Period:
        </label>
        <input
          id='periodNumber'
          type='number'
          value={periodNumber}
          onChange={handlePeriodNumberChange}
          className='py-2 px-3 border border-gray-300 rounded-md shadow-sm mr-2'
        />
        <select
          id='periodUnit'
          value={periodUnit}
          onChange={handlePeriodUnitChange}
          className='py-2 px-3 border border-gray-300 rounded-md shadow-sm'
        >
          <option value='days'>Days</option>
          <option value='weeks'>Weeks</option>
        </select>
      </div>
      <table className='min-w-full table-auto border-collapse bg-white mt-4'>

        <thead className='bg-gray-100'>
        <tr>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>ID
          </th>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status
          </th>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Last
            Used
          </th>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Avg.
            Work Hours
          </th>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Avg.
            Daily Usage
          </th>
          <th
            className='px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Short
            Usages
          </th>
          {/* Add other headers */}
        </tr>
        </thead>
        <tbody className='bg-white'>
        {desks.map((desk) => {
          const lastUsed = desk.lastUsed ? new Date(desk.lastUsed) : null;
          const formattedDate = lastUsed
            ? `${lastUsed.getDate()}-${lastUsed.getMonth() + 1}-${lastUsed.getFullYear()} ${lastUsed.getHours()}:${lastUsed.getMinutes()}`
            : 'Not available';

          return <tr key={desk.id} className='hover:bg-gray-50'>
            <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{desk.id}</td>
            <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{desk.status}</td>
            <td className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{formattedDate}</td>
            <td
              className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{desk.averageWorkHoursUsage?.toFixed(2) ?? 'Not available'}</td>
            <td
              className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{desk.averageDailyUsage?.toFixed(2) ?? 'Not available'}</td>
            <td
              className='px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-700'>{desk.shortUsagesCount ?? 'Not available'}</td>
          </tr>;
        })}
        </tbody>
      </table>
    </div>
  );
};

export { DeskStatistics };
