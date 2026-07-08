import type { Scenario } from '../../../../src/types/GameData';

const securityAlertImage = "/images/en/scenario6/mail_connexion.png";
const fakeSupportChatImage = "/images/en/scenario6/teams_chat.png";
const mailboxRulesImage = "/images/en/scenario6/regles_mail.png";

export const scenario6: Scenario = {
  id: "fake-it-support",
  title: "The fake IT support",
  description:
    "Esquie has detected several unusual connections on internal accounts. The strangest part is that the affected accounts were protected by two-factor authentication.\n\nThe victims say they never gave away their password. They even say that an IT service helped them secure their account better to counter a security flaw.\n\nThey only say they received a security alert, then were contacted by someone claiming to be IT support.\n\nThe official IT department had not opened any ticket that day. No technician was assigned to call employees. And yet, someone managed to get in.\n\nYour mission, detective: understand how a security system meant to protect accounts could be bypassed without being technically hacked.\n\nYou will be assisted by one of the victims of the attack: Jerome.",
  globalAttackScenario:
    "Probable method of operation: the attacker began by sending a fake security alert to create concern. Then they contacted the victims while pretending to be IT support, exactly when the victims expected to receive help.\n\nThey then requested or triggered MFA validations. The protection was not broken: it was validated by the user under pressure. Once connected, the attacker modified mailbox rules to receive certain emails and hide their traces.\n\nInvestigation conclusion: the password was not guessed. The code was not forced. The system did not explode. Someone simply asked for the key with enough confidence that it was handed over.\n\nGood reflex to remember\n\nNever share a two-factor authentication code and never approve a login request you did not initiate. If in doubt, contact support through a known official channel, never through a link or message you received.",
  questions: [
    {
      id: "security-alert-setup",
      title: "The alert that set the stage",
      instruction:
        "Jerome shows you the message he received on the morning of the incident. It claims to report unusual activity on his account. An alert, yes. But maybe not the one he thought it was.",
      attackScenario:
        "The email does not steal the account yet. It creates concern.\n\nThe victim thinks a security problem is already happening. From that point on, any message from a supposed support team seems more credible. The attacker does not force the door at the start: they make the victim believe it is already open.",
      image: securityAlertImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "suspicious-sender-address",
          x: 295,
          y: 255,
          width: 930,
          height: 48,
          label: "Suspicious sender address",
          explanation:
            "The displayed name can imitate an official service, but the real address does not necessarily match the company's domain.",
        },
        {
          id: "account-lock-threat",
          x: 300,
          y: 365,
          width: 1010,
          height: 40,
          label: "Threat of account blocking",
          explanation:
            "The fear of losing access pushes the user to act quickly. This is classic psychological pressure.",
        },
        {
          id: "doubtful-verification-link",
          x: 545,
          y: 820,
          width: 230,
          height: 45,
          label: "Questionable verification link",
          explanation:
            "A link received by email should not be used to verify a sensitive account. The right approach is to use the official website or internal portal.",
        },
        {
          id: "immediate-validation-request",
          x: 375,
          y: 885,
          width: 650,
          height: 80,
          label: "Immediate validation request",
          explanation:
            "Urgency reduces thinking time and increases the risk of mistakes.",
        },
        {
          id: "approximate-layout",
          x: 375,
          y: 420,
          width: 620,
          height: 330,
          label: "Approximate logo or layout",
          explanation:
            "A fake message can reuse the appearance of an official service, but some visual details can reveal the copy.",
        },
      ],
    },
    {
      id: "helpful-fake-technician",
      title: "The overly helpful technician",
      instruction:
        "A few minutes after the alert, employees reportedly received private messages from the IT department. You therefore look at this conversation.",
      attackScenario:
        "The fake support does not break security. It asks the victim to help bypass it.\n\nThe costume is simple: a logo, technical vocabulary, and a confident tone. But behind that costume, the objective is clear: obtain a validation that only the user can provide.",
      image: fakeSupportChatImage,
      imageWidth: 1672,
      imageHeight: 941,
      hotspots: [
        {
          id: "external-or-unverified-account",
          x: 500,
          y: 75,
          width: 850,
          height: 125,
          label: "External or unverified account",
          explanation:
            "Internal support must be clearly identifiable. An external, recent, or poorly named account must be verified.",
        },
        {
          id: "no-official-ticket",
          x: 590,
          y: 440,
          width: 640,
          height: 90,
          label: "No official ticket",
          explanation:
            "A serious support intervention must be tracked. Without a ticket number, the request should be considered suspicious.",
        },
        {
          id: "mfa-code-request",
          x: 590,
          y: 680,
          width: 600,
          height: 70,
          label: "MFA code request",
          explanation:
            "A two-factor authentication code is personal. It must never be shared, even with IT support.",
        },
        {
          id: "reassuring-directive-tone",
          x: 590,
          y: 230,
          width: 740,
          height: 45,
          label: "Reassuring but directive tone",
          explanation:
            "The attacker uses a professional tone to push the victim to obey without asking questions.",
        },
        {
          id: "time-pressure",
          x: 590,
          y: 580,
          width: 560,
          height: 75,
          label: "Time pressure",
          explanation:
            "The fake technician insists on speed to prevent the user from contacting the real support team.",
        },
        {
          id: "stay-in-chat-request",
          x: 590,
          y: 275,
          width: 550,
          height: 45,
          label: "Request to stay in the conversation",
          explanation:
            "The attacker tries to keep the victim busy and prevent any external verification.",
        },
      ],
    },
    {
      id: "hidden-mailbox-rules",
      title: "The hidden mailbox rules",
      instruction:
        "Jerome supposedly gave the MFA login code to this fake IT service. The attacker therefore gained access to the employee's entire mailbox. Yet at first glance, you notice nothing unusual. You browse Jerome's mailbox and open the account settings.",
      attackScenario:
        "The initial access was only the beginning. Once inside, the attacker prepared the silence.\n\nRead, forward, delete, hide: the mailbox becomes a listening post. The absence of noise does not mean the absence of an intruder.",
      image: mailboxRulesImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "invoice-forwarding-to-external-mailbox",
          x: 690,
          y: 645,
          width: 610,
          height: 135,
          label: "Invoice forwarding to an external mailbox",
          explanation:
            "Forwarding invoice or payment emails to an unknown address is extremely dangerous.",
        },
        {
          id: "unknown-external-address",
          x: 690,
          y: 495,
          width: 610,
          height: 125,
          label: "Forwarding to an unknown external address",
          explanation:
            "Forwarding emails to an unknown address in mailbox rules is a strong sign of compromise.",
        },
        {
          id: "silent-read-and-automatic-deletion",
          x: 690,
          y: 350,
          width: 610,
          height: 125,
          label: "Messages read without visible action and automatic deletion",
          explanation:
            "The attacker can delete alerts or notifications to hide their traces. They are also marked as read so the user is less notified about these actions.",
        },
      ],
    },
  ],
};
