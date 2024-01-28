type Zone = {
  id: string;
  name: string;
};

type Desk = {
  id: string;
  name: string
  zoneId: string;
  status: DeskStatus;
  lastUsed: Date;
  averageWorkHoursUsage: number;
  averageDailyUsage: number;
  shortUsagesCount: number;
};

export type DeskStatus = 'active' | 'inactive' | 'offline';

export type { Zone, Desk };
