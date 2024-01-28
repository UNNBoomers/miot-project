import { Desk } from '../types';
import { ChangeEvent, FC, useState } from 'react';

type DeskStatisticsProps = {
  desks: Desk[];
  count: number;
  unit: 'day' | 'week';
  setCount: (count: number) => void;
  setUnit: (unit: 'day' | 'week') => void;
};

const DeskStatistics: FC<DeskStatisticsProps> = ({ desks, unit, count, setUnit, setCount }) => {
  // New temporary state for input values
  const [tempCount, setTempCount] = useState(count);
  const [tempUnit, setTempUnit] = useState(unit);

  const handleTempPeriodNumberChange = (e:ChangeEvent<any>) => {
    setTempCount(Number(e.target.value ?? 4));

  };

  const handleTempPeriodUnitChange = (e:ChangeEvent<HTMLSelectElement>) => {
    setTempUnit((e.target.value) as 'day' | 'week');

  };

  const applyFilter = () => {
    setCount(tempCount);
    setUnit(tempUnit);
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
          value={tempCount}
          onChange={handleTempPeriodNumberChange}
          className='py-2 px-3 border border-gray-300 rounded-md shadow-sm mr-2'
        />
        <select
          id='periodUnit'
          value={tempUnit}
          onChange={handleTempPeriodUnitChange}
          className='py-2 px-3 border border-gray-300 rounded-md shadow-sm'
        >
          <option value='day'>Days</option>
          <option value='week'>Weeks</option>
        </select>
        <button
          onClick={applyFilter}
          className='ml-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700'
        >
          Apply
        </button>
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
