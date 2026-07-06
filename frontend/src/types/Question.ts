import type { User } from "./User";
import type { Scenario } from "./Scenario";

export type Hotspot = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  explanation: string;
};

export type Question = {
  id: string;
  title: string;
  instruction: string;
  attackScenario: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: Hotspot[];
};

export type PublicQuestion = {
  id: string;
  title: string;
  instruction: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspotCount: number;
};

export type SelectionPoint = {
  x: number;
  y: number;
};

export type SubmitAnswersResult = {
  roundScore: number;
  hotspots: (Hotspot & { found: boolean })[];
  attackScenario: string;
  nextQuestion: PublicQuestion | null;
  scenarioCompleted: boolean;
  scenarioScore?: number;
  scenarioRoundScores?: number[];
  scenarioDetails?: Scenario;
  updatedUser?: User;
};

