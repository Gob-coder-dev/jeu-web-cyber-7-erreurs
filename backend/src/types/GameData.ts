type Hotspot = {
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

export type Scenario = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  globalAttackScenario?: string;
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

export type PublicCorrection = {
    hotspots: Hotspot[];
  attackScenario: string;
};

export type AwnsersReceived = {
  questionId: string;
  awnsers: [x: number, y: number][];
  timeTaken: number;
};