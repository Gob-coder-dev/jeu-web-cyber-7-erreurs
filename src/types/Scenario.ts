import type { Question } from "./Question";

export type Scenario = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
