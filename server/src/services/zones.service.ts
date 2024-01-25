import { getDesksFromCsv } from "./desks.service";
import { ZoneDto } from "../models/zone.model";

export async function getZonesService(): Promise<ZoneDto[]> {
  const csvRows = await getDesksFromCsv();
  return csvRows.map((row) => {
    return {
      id: row.zoneId,
      name: row.zoneName,
    };
  });
}
