import type { Scenario } from '../../../../src/types/GameData';

const jobOfferImage = "/images/en/scenario5/annonce.png";
const candidateEmailImage = "/images/en/scenario5/mail.png";
const wordDocumentImage = "/images/en/scenario5/word.png";
const hrSharepointImage = "/images/en/scenario5/sharepoint.png";

export const scenario5: Scenario = {
  id: "ransomware-cv-attachment",
  title: "The CV that hid something else",
  description:
    "Peashooter&Co is in crisis. Since this morning, several HR department folders have become unreadable. Files have been renamed, some documents no longer open, and a ransom message has appeared on several workstations.\n\nThe IT department suspects a ransomware attack. The HR department, however, does not understand. According to Lea, a recruitment officer, she did not install anything unusual. She says the last thing she did before the attack was simply open an application received by email for an urgent job offer published a few days earlier.\n\nNo administrator account appears to have been forced. No direct intrusion on the servers has been detected. Yet the attack clearly started somewhere.",
  globalAttackScenario:
    "Probable method of operation: the attacker began by studying the job offer published by Peashooter&Co. They found the recruiter's name, email address, recruitment context, and the urgency of the need.\n\nThey then sent a very credible fake application, built to match the position exactly. The attached file did not only contain a CV: it asked to enable dangerous content. Once this action was performed, Lea's workstation was probably compromised.\n\nThe attack then spread to the HR folders that the account could access. Excessive permissions, poorly organized shares, and file synchronization increased the impact until many documents were encrypted.\n\nInvestigation conclusion: the attack did not present itself as a threat. It presented itself as a recruitment opportunity. That is precisely what made it dangerous.\n\nGood reflex to remember\n\nNever enable macros or active content in a document received by email without verification. Be cautious with unusual attachments, use secure recruitment platforms, verify candidates, and limit access rights to sensitive folders.",
  questions: [
    {
      id: "overly-detailed-job-ad",
      title: "The job offer that said too much",
      instruction:
        "Before looking at the CV, you go back to the source. The job offer published by Peashooter&Co looks ordinary. But sometimes, a job post does not only speak to candidates.",
      attackScenario:
        "A job offer is meant to attract candidates. But here, it also attracts unwanted attention.\n\nThe post gives a name, an email address, context, urgency, and business vocabulary. For an attacker, it is almost a preparation sheet. They do not know how to get in yet, but they already know who to write to, when to do it, and what tone to use.",
      image: jobOfferImage,
      imageWidth: 1449,
      imageHeight: 1086,
      hotspots: [
        {
          id: "recruiter-name-visible",
          x: 1060,
          y: 685,
          width: 230,
          height: 35,
          label: "Recruiter's name visible",
          explanation:
            "The name of the person in charge of recruitment is publicly displayed. An attacker can therefore target the right person directly instead of sending a generic attack.",
        },
        {
          id: "direct-email-address",
          x: 1080,
          y: 740,
          width: 270,
          height: 35,
          label: "Direct email address",
          explanation:
            "The recruiter's professional email address is visible. This makes it easier to send a targeted phishing message directly to their inbox.",
        },
        {
          id: "urgent-hiring-pressure",
          x: 965,
          y: 145,
          width: 400,
          height: 150,
          label: "Urgent recruitment",
          explanation:
            "The job offer insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly.",
        },
        {
          id: "urgent-hiring-pressure-2",
          x: 60,
          y: 155,
          width: 280,
          height: 50,
          label: "Urgent recruitment (2)",
          explanation:
            "The job offer insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly.",
        },
        {
          id: "urgent-hiring-pressure-3",
          x: 60,
          y: 880,
          width: 720,
          height: 120,
          label: "Urgent recruitment (3)",
          explanation:
            "The job offer insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly.",
        },
        {
          id: "team-details-visible",
          x: 970,
          y: 345,
          width: 380,
          height: 90,
          label: "Precise details about the team",
          explanation:
            "The more details the job offer gives about the team, the project, or the internal organization, the more the attacker can adapt their message.",
        },
      ],
    },
    {
      id: "perfect-candidate-email",
      title: "The candidate who was too perfect",
      instruction:
        "Lea shows you the email received the day before the incident. The profile seems to match the position exactly. Maybe a little too exactly.",
      attackScenario:
        "The email looks like an ideal application. And that is exactly the problem.\n\nThe attacker is not trying to send a crude message. They are trying to create a document that HR will want to open. In recruitment, receiving files is normal. The trap therefore hides inside an everyday action.",
      image: candidateEmailImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "suspicious-attachment",
          x: 38,
          y: 288,
          width: 468,
          height: 72,
          label: "Suspicious attachment",
          explanation:
            "The CV is sent in an unusual or risky format, such as a compressed file, a document with macros, or a strange filename.",
        },
        {
          id: "shortened-portfolio-link",
          x: 30,
          y: 727,
          width: 250,
          height: 35,
          label: "Shortened portfolio link",
          explanation:
            "A shortened link hides the real destination. It can redirect to a fake site, a download page, or a credential theft page.",
        },
        {
          id: "quick-opening-request",
          x: 35,
          y: 870,
          width: 820,
          height: 40,
          label: "Request to open quickly",
          explanation:
            "The candidate refers to the company's urgent need and also claims to be in a hurry because of many applications with other companies. They insist that the file should be reviewed quickly. This pressure can push the recruiter to open the file without verification.",
        },
        {
          id: "too-perfect-profile",
          x: 30,
          y: 470,
          width: 890,
          height: 160,
          label: "Perfect profile",
          explanation:
            "The message matches the company's needs exactly, which is suspicious with so little research time. It presents a perfect profile that is available immediately. This adds pressure to HR, who sees a major potential gain.",
        },
      ],
    },
    {
      id: "trusted-document-request",
      title: "The document that asked for trust",
      instruction:
        "The attached file did not immediately display the CV. Lea remembers a technical message when opening the document. You examine this item as if examining a forced lock.",
      attackScenario:
        "The document was not only asking to be read. It was asking for permission.\n\nAnd that permission probably turned a simple HR file into an entry point. An attack does not always begin with a stolen password. Sometimes, it begins with a button clicked too quickly.",
      image: wordDocumentImage,
      imageWidth: 1536,
      imageHeight: 1024,
      hotspots: [
        {
          id: "enable-content-request",
          x: 0,
          y: 212,
          width: 1536,
          height: 45,
          label: "Request to enable content",
          explanation:
            "A document that asks to enable macros or active content can execute dangerous actions on the workstation.",
        },
        {
          id: "display-issue-pretext",
          x: 405,
          y: 385,
          width: 735,
          height: 420,
          label: "Display issue pretext",
          explanation:
            "The file claims that the document is displayed incorrectly or protected. This pretext is used to push the user to click.",
        },
      ],
    },
    {
      id: "overly-permissive-hr-folder",
      title: "The overly generous HR folder",
      instruction:
        "Peashooter&Co employees show you their corrupted cloud storage so you can see the scale of the damage caused by the attack. You now inspect the spaces that Lea's account could access.",
      attackScenario:
        "The trapped file may have opened the first door. But overly broad permissions opened the whole corridor.\n\nRansomware becomes more dangerous when a user account can reach many documents. The problem is therefore not only the CV. The problem is also what the HR workstation could touch once infected.",
      image: hrSharepointImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "identity-documents-folder",
          x: 245,
          y: 635,
          width: 245,
          height: 50,
          label: "\"Identity documents\" folder visible",
          explanation:
            "Very sensitive documents are accessible from this space. If the account is compromised, this data can be stolen or encrypted.",
        },
        {
          id: "employee-contracts-folder",
          x: 245,
          y: 575,
          width: 250,
          height: 50,
          label: "\"Employee contracts\" folder visible",
          explanation:
            "Contracts contain personal and professional information. They should not be accessible too broadly.",
        },
        {
          id: "whole-company-access",
          x: 1055,
          y: 260,
          width: 300,
          height: 50,
          label: "\"Whole company\" access",
          explanation:
            "The folder is shared with too many people. The more access there is, the greater the impact of a compromised account.",
        },
        {
          id: "external-edit-access",
          x: 1055,
          y: 355,
          width: 360,
          height: 70,
          label: "External account with edit rights",
          explanation:
            "A contractor or external account can modify files. This permission must be limited and controlled.",
        },
        {
          id: "anyone-link-can-edit",
          x: 1055,
          y: 485,
          width: 350,
          height: 60,
          label: "\"Anyone with the link can edit\" link",
          explanation:
            "This type of link is dangerous. If the link circulates, anyone can access or modify the folder.",
        },
        {
          id: "no-expiration-link",
          x: 1055,
          y: 605,
          width: 250,
          height: 50,
          label: "Link without expiration date",
          explanation:
            "A share without an expiration date remains active for a long time, even when the initial need has disappeared.",
        },
        {
          id: "download-allowed",
          x: 1055,
          y: 690,
          width: 255,
          height: 50,
          label: "Download allowed",
          explanation:
            "If downloading is allowed, an attacker can easily copy documents outside the company.",
        },
      ],
    },
  ],
};
