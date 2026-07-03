import type { Hotspot } from "../types/GameData";

export type SelectionPoint = {
  x: number;
  y: number;
};

export type HotspotCorrection = Hotspot & {
  found: boolean;
};

export function isSelectionInsideHotspot(
  selection: SelectionPoint,
  hotspot: Hotspot,
): boolean {
  return (
    selection.x >= hotspot.x &&
    selection.x <= hotspot.x + hotspot.width &&
    selection.y >= hotspot.y &&
    selection.y <= hotspot.y + hotspot.height
  );
}

export function evaluateHotspots(
  hotspots: Hotspot[],
  selections: SelectionPoint[],
): HotspotCorrection[] {
  return hotspots.map((hotspot) => ({
    ...hotspot,
    found: selections.some((selection) =>
      isSelectionInsideHotspot(selection, hotspot),
    ),
  }));
}

type CalculateRoundScoreInput = {
  foundCount: number;
  hotspotCount: number;
  timeTakenSeconds: number;
};

export function calculateRoundScore({
  foundCount,
  hotspotCount,
  timeTakenSeconds,
}: CalculateRoundScoreInput): number {
  const missedCount = hotspotCount - foundCount;

  return Math.max(
    0,
    Math.round(
      foundCount * 20 +
        Math.max(0, 20 * foundCount - timeTakenSeconds * 2) -
        missedCount * 5,
    ),
  );
}
