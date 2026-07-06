import type { Scenario } from '../../../../src/types/GameData';

const teamsChannelImage = "/images/en/scenario7/teams.png";
const teamsMembersImage = "/images/en/scenario7/teams_list.png";
const sharepointDocumentImage = "/images/en/scenario7/sharepoint.png";
const phishingEmailImage = "/images/en/scenario7/mail.png";

export const scenario7: Scenario = {
  id: "open-teams-channel",
  title: "The Teams channel that was too open",
  description:
    "MaugaOW received a particularly credible phishing email. The message mentioned the exact name of an internal project, the project manager's name, the delivery schedule, and even some technical details. Fortunately, no one clicked on this suspicious email, but everyone wonders how the project information could have leaked.\n\nEmployees are convinced that the attacker had access to internal information. Yet no clear intrusion appears on the servers. No administrator account seems compromised.\n\nThe project was extremely confidential and was only handled in a Teams conversation used for several months to track the project.\n\nYour mission, detective: understand how an attacker could build such precise phishing without directly entering the core of the system.",
  globalAttackScenario:
    "Probable method of operation: the attacker did not start by directly attacking MaugaOW's servers. They took advantage of a Teams channel that was too open, where the project team shared sensitive information: project name, schedule, documents, managers, and technical details.\n\nA guest account or former contractor, still present in the channel, could have read the conversations and downloaded a document shared with overly broad permissions. This information was then used to build targeted phishing, much more credible than a generic message.\n\nThe fraudulent email reused real names, real dates, and the real project context.\n\nInvestigation conclusion: the leak did not come from a spectacular hack, but from too much trust in a collaborative space. The Teams channel was practical, but it had become too talkative.\n\nGood reflex to remember\n\nLimit access to discussion channels, remove old guests, control sharing links, and avoid publishing sensitive information in spaces that are too broad.\n\nA message that uses internal information must also be verified. The more personalized a phishing email seems, the more dangerous it can be.",
  questions: [
    {
      id: "public-project-channel",
      title: "The private channel",
      instruction:
        "You start by observing the channel used by the project team. The messages seem ordinary: quick exchanges, shared documents, last-minute decisions. But an internal channel can sometimes speak to more people than expected.",
      attackScenario:
        "The channel looks like a normal workspace. That is exactly what makes it dangerous.\n\nTeams talk quickly, share a lot, and fix issues in real time. But every message can become a piece of intelligence if the wrong eyes are in the conversation.",
      image: teamsChannelImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "public-channel",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Channel marked \"Public\"",
          explanation:
            "The project channel is public even though it is a private and confidential project.",
        },
        {
          id: "too-many-members",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Channel accessible to too many members",
          explanation:
            "A channel with too many people increases the risk that confidential information will be read or reused.",
        },
        {
          id: "external-guests-present",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "External guests present",
          explanation:
            "External guests can see messages and documents in the channel. Their presence must be justified and controlled.",
        },
        {
          id: "confidential-project-name",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Confidential project name in the channel",
          explanation:
            "The project name becomes sensitive if the channel is not strictly limited to the people concerned.",
        },
        {
          id: "external-provider-message",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Message from an external contractor",
          explanation:
            "The active presence of a contractor shows that information may leave the internal circle.",
        },
        {
          id: "sensitive-document-shared",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Sensitive document shared in the thread",
          explanation:
            "A file containing budget, planning, or strategy should not be posted in a channel that is too broad.",
        },
      ],
    },
    {
      id: "forgotten-guest",
      title: "The forgotten guest",
      instruction:
        "You open the channel member list. The names follow one another: employees, managers, contractors, guests.",
      attackScenario:
        "The suspect is not always hidden in a virus. They can be listed in the member list.\n\nA forgotten guest does not need to force entry. The company has already given them a seat in the room. And sometimes, being present is enough to listen.",
      image: teamsMembersImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "external-guest-account",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "External guest account",
          explanation:
            "An external account in an internal channel must be monitored. It can see shared messages and documents.",
        },
        {
          id: "old-provider-still-present",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Former contractor still present",
          explanation:
            "A contractor who no longer works on the project should no longer have access to the conversations.",
        },
        {
          id: "same-member-rights",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "\"Member\" rights identical to internal users",
          explanation:
            "An external guest should not necessarily have the same reading, downloading, or sharing rights as an employee.",
        },
        {
          id: "guest-download-allowed",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Download allowed for guests",
          explanation:
            "If guests can download documents, files can easily leave the company.",
        },
        {
          id: "missing-account-owner",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "No account owner",
          explanation:
            "If no one is responsible for an external access, it becomes difficult to know why it still exists.",
        },
      ],
    },
    {
      id: "unlocked-shared-document",
      title: "The shared document without a lock",
      instruction:
        "The channel contains several documents. One of them seems to be at the center of the case. It gathers the information later used in the phishing email.",
      attackScenario:
        "The document was not forcibly stolen. It was shared too broadly.\n\nIn an investigation, sometimes you must stop looking for a forced door. Here, the door was open by configuration: an overly permissive link, a document rich in information, and a channel with too many people.",
      image: sharepointDocumentImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "anyone-with-link-access",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Link accessible to anyone who has it",
          explanation:
            "A link that is too open can circulate outside the channel without real control.",
        },
        {
          id: "edit-allowed",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Editing allowed",
          explanation:
            "If too many people can modify the document, the attacker can alter its content or add a malicious link.",
        },
        {
          id: "no-expiration-date",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "No expiration date",
          explanation:
            "A permanent link remains dangerous long after the initial need has ended.",
        },
        {
          id: "sensitive-document-in-large-channel",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Sensitive document shared in a broad channel",
          explanation:
            "A confidential document should not be published in a space accessible to guests or too many employees.",
        },
        {
          id: "download-enabled",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Download enabled",
          explanation:
            "If downloading is possible, an external person can keep a copy of the document.",
        },
        {
          id: "no-classification",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "No classification",
          explanation:
            "A sensitive document not marked as confidential will be treated like an ordinary document.",
        },
      ],
    },
    {
      id: "well-informed-phishing",
      title: "The phishing email that knew too much",
      instruction:
        "A few days before the incident, several employees received an email. It seems to come from someone who knows the project. However, the explicit instruction was to discuss the project only in the Teams channel. You will therefore analyze this email.",
      attackScenario:
        "This phishing email is not credible by magic. It is credible because it speaks the company's language.\n\nThe attacker knows the names, dates, documents, and habits. The message feels internal because it was fed by internal information that was too exposed.",
      image: phishingEmailImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "exact-project-name",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Exact project name",
          explanation:
            "The email uses the real project name. This creates an impression of legitimacy and reduces suspicion.",
        },
        {
          id: "project-manager-name",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Project manager's name",
          explanation:
            "The attacker uses a known name to give authority to the request.",
        },
        {
          id: "real-calendar-reference",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Reference to the real calendar",
          explanation:
            "The message mentions a real date or meeting, which makes the trap credible.",
        },
        {
          id: "external-link",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "External link",
          explanation:
            "Despite the internal context, the link points to an external or unknown website.",
        },
        {
          id: "login-request",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Login request",
          explanation:
            "The email asks the user to log in to view a document. This may be an attempt to steal credentials.",
        },
        {
          id: "urgent-tone",
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          label: "Urgent tone",
          explanation:
            "Urgency pushes employees to click quickly, especially if the message seems linked to a real project.",
        },
      ],
    },
  ],
};
