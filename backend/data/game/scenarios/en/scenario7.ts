import type { Scenario } from '../../../../src/types/GameData';

export const scenario7: Scenario = {
  "id": "open-teams-channel",
  "title": "The project that leaked",
  "description": "MaugaOW received a particularly credible phishing email. The message mentioned the exact name of an internal project, the project manager's name, the delivery schedule, and even some technical details. Fortunately, no one clicked on this suspicious email, but everyone is wondering how the project information could have leaked.\n\nEmployees are convinced that the attacker had access to internal information. Yet no clear intrusion appears on the servers. No administrator account seems compromised.\n\nThe project was extremely confidential and was only handled in a Teams conversation used for several months to track the project.",
  "globalAttackScenario": "Probable method of operation: the attacker took advantage of a Teams channel that was too open, where the project team shared sensitive information: project name, schedule, documents, managers, and technical details.\n\nA guest account or former contractor still present in the channel could have read the conversations and downloaded a document shared with overly broad rights. This information was then used to build targeted phishing, much more credible than a generic message.\n\nThe fraudulent email reused all the collected information and the real project context.\n\nGood practice to remember\n\nLimit access to discussion channels, remove former guests, control sharing links, and avoid publishing sensitive information in overly broad spaces.\n\nA message that uses internal information must also be verified. The more personalized a phishing email seems, the more dangerous it can be.",
  "questions": [
    {
      "id": "public-project-channel",
      "title": "The private channel",
      "instruction": "You start by observing the channel used by the project team. The messages seem ordinary: quick exchanges, shared documents, last-minute decisions.",
      "attackScenario": "The channel is supposed to be confidential. Important discussions, secret documents, and sensitive decisions are present there. Yet the channel is public, and external contractors who are no longer affiliated with the project are still in this channel. Intrusion is therefore easy, and every message can become a major piece of intelligence.",
      "image": "/images/en/scenario7/teams.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "public-channel",
          "x": 1255,
          "y": 355,
          "width": 110,
          "height": 165,
          "label": "Channel marked \"Public\"",
          "explanation": "The project channel is public even though it is a private and confidential project."
        },
        {
          "id": "too-many-members",
          "x": 1255,
          "y": 530,
          "width": 130,
          "height": 55,
          "label": "Channel accessible to too many members",
          "explanation": "A channel that is too broad increases the risk that confidential information will be read or reused."
        },
        {
          "id": "external-guests-present",
          "x": 1255,
          "y": 600,
          "width": 160,
          "height": 55,
          "label": "External guests present",
          "explanation": "External guests can see messages and documents in the channel. Their presence must be justified and controlled."
        },
        {
          "id": "confidential-project-name",
          "x": 555,
          "y": 70,
          "width": 440,
          "height": 50,
          "label": "Confidential project name in the channel",
          "explanation": "The project name becomes sensitive if the channel is not strictly limited to the people concerned."
        },
        {
          "id": "external-provider-message",
          "x": 495,
          "y": 620,
          "width": 465,
          "height": 85,
          "label": "Message from an external contractor",
          "explanation": "The active presence of a contractor shows that information may potentially leave the internal circle."
        },
        {
          "id": "sensitive-document-shared",
          "x": 580,
          "y": 450,
          "width": 460,
          "height": 70,
          "label": "Sensitive document shared in the thread",
          "explanation": "A file containing budget, planning, or strategy should not be posted in a channel that is too broad."
        }
      ]
    },
    {
      "id": "forgotten-guest",
      "title": "The forgotten guest",
      "instruction": "You open the channel member list. The names follow one another: employees, managers, contractors, guests.",
      "attackScenario": "The suspect is not always hidden. They can simply be forgotten. If one or more unsupervised and rarely used accounts are in the channel, they can become a listening channel for attackers without anyone noticing. With unlimited access added to that, these forgotten accounts are time bombs.",
      "image": "/images/en/scenario7/teams_list.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "external-guest-account",
          "x": 510,
          "y": 495,
          "width": 415,
          "height": 140,
          "label": "External guest account",
          "explanation": "An external account in an internal channel must be monitored. It can see shared messages and documents."
        },
        {
          "id": "old-provider-still-present",
          "x": 1280,
          "y": 655,
          "width": 180,
          "height": 50,
          "label": "Former contractor still present",
          "explanation": "A contractor who no longer works on the project should no longer have access to the conversations."
        },
        {
          "id": "same-member-rights",
          "x": 965,
          "y": 495,
          "width": 110,
          "height": 140,
          "label": "\"Member\" rights identical to internal users",
          "explanation": "An external guest should not necessarily have the same reading, downloading, or sharing rights as an employee."
        },
        {
          "id": "guest-download-allowed",
          "x": 510,
          "y": 811,
          "width": 440,
          "height": 70,
          "label": "Too many permissions for guests",
          "explanation": "If guests can download documents, files can easily leave the company."
        },
        {
          "id": "confidential-project-name",
          "x": 555,
          "y": 70,
          "width": 440,
          "height": 50,
          "label": "Confidential project name in the channel",
          "explanation": "The project name becomes sensitive if the channel is not strictly limited to the people concerned."
        },
        {
          "id": "missing-account-owner",
          "x": 1465,
          "y": 500,
          "width": 110,
          "height": 200,
          "label": "No account owner",
          "explanation": "If guests can download documents and share links, document leaks can become more frequent and harder to eliminate."
        }
      ]
    },
    {
      "id": "unlocked-shared-document",
      "title": "The shared document without a lock",
      "instruction": "The channel contains several documents. One of them seems to be at the center of the case. It gathers the information later used in the phishing email.",
      "attackScenario": "The document was not forcibly stolen. It was shared too broadly.\n\nAn overly permissive SharePoint, a document rich in information, a channel with too many people.\n\nThis accumulation of flaws becomes a headache when trying to avoid document leaks.",
      "image": "/images/en/scenario7/sharepoint.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "anyone-with-link-access",
          "x": 1430,
          "y": 235,
          "width": 220,
          "height": 80,
          "label": "Link accessible to anyone who has it",
          "explanation": "A link that is too open can circulate outside the channel without real control."
        },
        {
          "id": "edit-allowed",
          "x": 1430,
          "y": 380,
          "width": 220,
          "height": 50,
          "label": "Editing allowed",
          "explanation": "If too many people can modify the document, the attacker can alter its content or add a malicious link."
        },
        {
          "id": "no-expiration-date",
          "x": 1430,
          "y": 480,
          "width": 220,
          "height": 50,
          "label": "No expiration date",
          "explanation": "A permanent link remains dangerous long after the initial need has ended."
        },
        {
          "id": "sensitive-document-in-large-channel",
          "x": 320,
          "y": 315,
          "width": 200,
          "height": 45,
          "label": "Sensitive document shared in a broad channel",
          "explanation": "A confidential document should not be published in a space accessible to guests or too many employees."
        },
        {
          "id": "confidential-project-name",
          "x": 290,
          "y": 60,
          "width": 530,
          "height": 50,
          "label": "Confidential project name in SharePoint",
          "explanation": "The project name becomes sensitive if SharePoint is not strictly limited to the people concerned."
        },
        {
          "id": "download-enabled",
          "x": 1430,
          "y": 435,
          "width": 220,
          "height": 50,
          "label": "Download allowed",
          "explanation": "If downloading is possible, an external person can keep a copy of the document."
        },
        {
          "id": "no-classification",
          "x": 880,
          "y": 315,
          "width": 90,
          "height": 45,
          "label": "No classification",
          "explanation": "A sensitive document not marked as confidential will be treated like an ordinary document."
        }
      ]
    },
    {
      "id": "well-informed-phishing",
      "title": "The phishing email that knew too much",
      "instruction": "During the incident, several employees received an email. It seems to come from someone who knows the project. Yet the specific instruction had been given to discuss the project only in the Teams channel. You will therefore analyze this famous email.",
      "attackScenario": "This phishing email is credible because it speaks the company's language.\n\nThe attacker knows the names, dates, documents, and habits. The message seems internal because it was fed by overly exposed internal information.\n\nAnd the email address used to send this phishing message is indeed one of the forgotten accounts in the confidential Teams channel.",
      "image": "/images/en/scenario7/mail.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "exact-project-name",
          "x": 720,
          "y": 230,
          "width": 550,
          "height": 45,
          "label": "Exact project name",
          "explanation": "The email uses the real project name. This creates an impression of legitimacy and reduces suspicion."
        },
        {
          "id": "project-manager-name",
          "x": 790,
          "y": 290,
          "width": 350,
          "height": 47,
          "label": "Project manager's name",
          "explanation": "The attacker uses a known name to give authority to the request."
        },
        {
          "id": "real-calendar-reference",
          "x": 720,
          "y": 475,
          "width": 500,
          "height": 45,
          "label": "Reference to the real calendar",
          "explanation": "The message mentions a real date or meeting, which makes the trap credible."
        },
        {
          "id": "login-request-and-link",
          "x": 720,
          "y": 585,
          "width": 450,
          "height": 70,
          "label": "Login request and external link",
          "explanation": "The email asks the user to log in to view a document. This may be an attempt to steal credentials. The link points to an external or unknown website."
        },
        {
          "id": "urgent-tone",
          "x": 720,
          "y": 525,
          "width": 500,
          "height": 45,
          "label": "Urgent tone",
          "explanation": "Urgency pushes employees to click quickly, especially if the message seems linked to a real project."
        }
      ]
    }
  ]
};
