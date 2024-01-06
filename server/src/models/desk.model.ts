export type DeskDto = {
  id: number;
  status: DeskStatus;
  lastUsed: Date;
  averageWorkHoursUsage: number;
  averageDailyUsage: number;
  shortUsagesCount: number;
};

export type DeskStatus = "active" | "inactive" | "offline";
