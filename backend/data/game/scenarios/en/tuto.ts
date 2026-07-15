import type { Scenario } from "../../../../src/types/GameData";

const postit = "/images/en/tutoriel/post-it.jpg";

export const tuto: Scenario = {
  id: "ceci-est-un-tutoriel",
  title: "Welcome, detective",
  description:
    "Hello detective, welcome to the Cybersecurity Field Detective organization. Our objective is to solve cyber incidents in companies and understand how they were attacked. Before going into the field, you must complete a short training mission to understand the type of investigation that awaits you.",
  difficulty: 1,
  globalAttackScenario:
    "Well done, detective! In a real situation, an attacker can use vulnerable information visible on documents or sticky notes to compromise a company's information systems.",
  goodPractices:
    "Never leave sensitive information visible at your workstation: passwords, codes, identifiers, confidential documents, or internal notes. Before leaving a desk, sensitive documents must be put away and the session must be locked.",
  questions: [
    {
      id: "game-rules",
      title: "How to investigate",
      instruction:
        "1. Look carefully at the image.\n2. Click the elements that seem dangerous or abnormal.\n3. Each correct answer becomes a validated clue.\n4. Wrong answers can reduce your score.\n5. If several identical anomalies are present, click each one.\n6. The faster you find the clues, the more your score increases.\n7. After validation, hover over the correct answer zones to see the explanation for each anomaly.\n\nAt the end of the investigation, a report will explain how the errors you found could have been exploited in a real attack.\n\nFirst case: the talkative sticky notes.\n\nHere is a supposedly compromising image with 2 fictional problematic sticky notes. Click them to report them as dangerous.",
      attackScenario:
        "Visible sticky notes expose sensitive information. In a real situation, an attacker could photograph them or use them directly to access an account, a workstation, or a protected document.",
      image: postit,
      imageWidth: 4080,
      imageHeight: 3060,
      hotspots: [
        {
          id: "post-it-1",
          x: 0,
          y: 690,
          width: 580,
          height: 560,
          label: "Visible sticky note",
          explanation:
            "This sticky note is visible in the work environment. Sensitive information left like this can be collected very easily.",
        },
        {
          id: "post-it-2",
          x: 3300,
          y: 1600,
          width: 510,
          height: 440,
          label: "Visible sticky note",
          explanation:
            "This second sticky note shows why the whole image must be checked. Several clues of the same type may be present.",
        },
      ],
    },
  ],
};
