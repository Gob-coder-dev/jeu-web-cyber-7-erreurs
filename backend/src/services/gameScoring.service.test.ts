import assert from "node:assert/strict";
import test from "node:test";
import type { Hotspot } from "../types/GameData";
import {
  calculateRoundScore,
  evaluateHotspots,
  isSelectionInsideHotspot,
} from "./gameScoring.service";

const hotspot: Hotspot = {
  id: "domain",
  x: 10,
  y: 20,
  width: 100,
  height: 50,
  label: "Fake domain",
  explanation: "The domain does not match the official brand.",
};

test("isSelectionInsideHotspot accepts a point inside the hotspot", () => {
  assert.equal(isSelectionInsideHotspot({ x: 50, y: 40 }, hotspot), true);
});

test("isSelectionInsideHotspot rejects a point outside the hotspot", () => {
  assert.equal(isSelectionInsideHotspot({ x: 200, y: 40 }, hotspot), false);
});

test("evaluateHotspots marks each found hotspot once", () => {
  const result = evaluateHotspots([hotspot], [
    { x: 50, y: 40 },
    { x: 60, y: 45 },
  ]);

  assert.equal(result.length, 1);
  assert.equal(result[0]?.found, true);
});

test("calculateRoundScore rewards fast correct answers", () => {
  const score = calculateRoundScore({
    foundCount: 2,
    hotspotCount: 2,
    timeTakenSeconds: 5,
  });

  assert.equal(score, 70);
});

test("calculateRoundScore never returns a negative score", () => {
  const score = calculateRoundScore({
    foundCount: 0,
    hotspotCount: 3,
    timeTakenSeconds: 100,
  });

  assert.equal(score, 0);
});
