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

export type GameAttemptStatus = "in_progress" | "completed";

export type GameAttempt = {
  id: string;
  userId: string;
  scenarioId: string;
  currentQuestionIndex: number;
  roundScores: number[];
  status: GameAttemptStatus;
  isReplay: boolean;
  questionStartedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateGameAttemptInput = {
  userId: string;
  scenarioId: string;
  isReplay: boolean;
};

export type StartScenarioResult = {
  attemptId: string;
  scenarioId: string;
  scenarioTitle: string;
  questionIndex: number;
  questionCount: number;
  question: PublicQuestion;
  isReplay: boolean;
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
