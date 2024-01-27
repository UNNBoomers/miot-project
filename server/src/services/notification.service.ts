import { getLatestTwoDataPoints } from "./influx.service";
import { getDesksFromCsv, getDeskStatus } from "./desks.service";
import { DeskStatus } from "../models/desk.model";

type DeskStatusChange = {
  zoneId: string;
  deskId: string;
  newStatus: DeskStatus;
};

export async function notifyDeskChanges(): Promise<String> {
  const desksToNotify = await getChanges();
  let result_string = "";
  if (desksToNotify.length > 0) {
    for (const desk of desksToNotify) {
      result_string = result_string.concat(
        `Desk ${desk.deskId} in zone ${desk.zoneId} changed status to ${desk.newStatus}\n`,
      );
      console.log(
        `Desk ${desk.deskId} in zone ${desk.zoneId} changed status to ${desk.newStatus}`,
      );
    }
  }
  return result_string;
}

async function getChanges(): Promise<DeskStatusChange[]> {
  const desks = await getDesksFromCsv();
  const desksToNotify: DeskStatusChange[] = [];

  for (const desk of desks) {
    const points = await getLatestTwoDataPoints(desk.zoneId, desk.deskId);
    const nonNullPoints = points.filter((i) => i.value !== null);
    if (nonNullPoints.length === 2) {
      const firstPointStatus = getDeskStatus(nonNullPoints[0]);
      const secondPointStatus = getDeskStatus(nonNullPoints[1]);
      if (firstPointStatus !== secondPointStatus) {
        desksToNotify.push({
          zoneId: desk.zoneId,
          deskId: desk.deskId,
          newStatus: secondPointStatus,
        });
      }
    }
  }

  return desksToNotify;
}
