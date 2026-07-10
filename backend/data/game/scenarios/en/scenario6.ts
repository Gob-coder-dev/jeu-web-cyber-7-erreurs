import type { Scenario } from '../../../../src/types/GameData';

export const scenario6: Scenario = {
  "id": "fake-it-support",
  "title": "IT support",
  "description": "Esquie detected several unusual logins on internal accounts. The strangest thing is that the affected accounts were protected by two-factor authentication.\n\nThe victims say they never gave out their password. They even say that an IT service helped them better secure their account to counter a security flaw.\n\nThey only say that they received a security alert, then were contacted by someone presenting themselves as IT support.\n\nHowever, the official IT department opened no ticket that day. No technician was assigned to call employees. And yet, someone managed to get in.\n\nYou will be assisted by one of the attack victims: Jerome.",
  "globalAttackScenario": "The attacker began by sending a fake security alert to create concern. Then they contacted the victims while pretending to be IT support, exactly when the victims expected to receive help.\n\nThey then requested or triggered MFA approvals. The protection was not broken: it was validated by the user under pressure. Once connected, the attacker modified mailbox rules to receive certain emails and hide their tracks.\n\nGood practice to remember\n\nNever communicate a two-factor authentication code and never approve a login request that you did not initiate. When in doubt, contact support through a known official channel, never from a link or message you received.",
  "questions": [
    {
      "id": "security-alert-setup",
      "title": "The alert that prepared the ground",
      "instruction": "Jerome shows you the message received on the morning of the incident, reporting unusual activity on his account.",
      "attackScenario": "The email does not steal the account yet. It creates concern.\n\nThe victim thinks that a security problem is already underway. From that point on, any message from a supposed support service seems more credible.",
      "image": "/images/en/scenario6/mail_connexion.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "suspicious-sender-address",
          "x": 283,
          "y": 305,
          "width": 1132,
          "height": 48,
          "label": "Suspicious sender address",
          "explanation": "The displayed name imitates Microsoft support, but it is clearly not the real address."
        },
        {
          "id": "account-lock-threat",
          "x": 283,
          "y": 360,
          "width": 943,
          "height": 45,
          "label": "Account lock threat",
          "explanation": "Fear of losing access pushes the user to act quickly. This is classic psychological pressure."
        },
        {
          "id": "doubtful-verification-link",
          "x": 540,
          "y": 815,
          "width": 225,
          "height": 50,
          "label": "Doubtful verification link",
          "explanation": "A link received by email should not be used to verify a sensitive account. You must use the official website or internal portal."
        },
        {
          "id": "immediate-validation-request",
          "x": 365,
          "y": 875,
          "width": 550,
          "height": 85,
          "label": "Immediate validation request",
          "explanation": "Urgency reduces thinking time and increases the risk of mistakes."
        },
        {
          "id": "approximate-layout",
          "x": 350,
          "y": 415,
          "width": 575,
          "height": 380,
          "label": "Approximate logo or layout",
          "explanation": "A fake message can copy the appearance of an official service, but some visual details can reveal the copy."
        }
      ]
    },
    {
      "id": "helpful-fake-technician",
      "title": "The overly helpful technician",
      "instruction": "A few minutes after the alert, the employees reportedly received private messages from IT. You therefore look at this conversation.",
      "attackScenario": "The fake support does not break the security. It asks the victim to help bypass it.\n\nThe costume is simple: a logo, technical vocabulary, and a confident tone. With this, the attacker tries to obtain an approval that only the user can give.",
      "image": "/images/en/scenario6/teams_chat.png",
      "imageWidth": 1672,
      "imageHeight": 941,
      "hotspots": [
        {
          "id": "external-or-unverified-account",
          "x": 500,
          "y": 75,
          "width": 850,
          "height": 125,
          "label": "External or unverified account",
          "explanation": "Internal support must be clearly identifiable. An external, recent, or poorly named account must be verified."
        },
        {
          "id": "no-official-ticket",
          "x": 590,
          "y": 440,
          "width": 640,
          "height": 90,
          "label": "No official ticket",
          "explanation": "A serious support intervention must be tracked. Without a ticket number, the request must be considered suspicious."
        },
        {
          "id": "mfa-code-request",
          "x": 590,
          "y": 680,
          "width": 600,
          "height": 70,
          "label": "MFA code request",
          "explanation": "A two-factor authentication code is personal. It must never be communicated, even to IT support."
        },
        {
          "id": "time-pressure",
          "x": 590,
          "y": 580,
          "width": 560,
          "height": 75,
          "label": "Time pressure",
          "explanation": "The fake technician insists on speed to prevent the user from contacting the real support."
        },
        {
          "id": "stay-in-chat-request",
          "x": 590,
          "y": 275,
          "width": 550,
          "height": 45,
          "label": "Request to stay in the conversation",
          "explanation": "The attacker tries to keep the victim busy and prevent any external verification."
        }
      ]
    },
    {
      "id": "hidden-mailbox-rules",
      "title": "The hidden mailbox rules",
      "instruction": "Jerome reportedly gave the MFA login code to this fake IT service. The attacker therefore gained access to the employee's entire mailbox. Yet at first glance, you notice nothing abnormal. You browse Jerome's mailbox and go to the account settings.",
      "attackScenario": "The initial access was only the beginning. Once inside, the attacker prepared the silence.\n\nRead, forward, delete, hide: the mailbox becomes a listening post. The absence of noise does not mean the absence of an intruder.",
      "image": "/images/en/scenario6/regles_mail.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "invoice-forwarding-to-external-mailbox",
          "x": 690,
          "y": 645,
          "width": 610,
          "height": 135,
          "label": "Invoice forwarding to an external mailbox",
          "explanation": "Forwarding invoice or payment emails to an unknown address is extremely dangerous. The attacker wanted long-term, discreet access to internal documents."
        },
        {
          "id": "unknown-external-address",
          "x": 690,
          "y": 495,
          "width": 610,
          "height": 125,
          "label": "Forwarding to an unknown external address",
          "explanation": "Automatic forwarding of emails to an unknown address. The attacker wanted long-term, discreet access to internal documents."
        },
        {
          "id": "silent-read-and-automatic-deletion",
          "x": 690,
          "y": 350,
          "width": 610,
          "height": 125,
          "label": "Messages read without visible action and automatic deletion",
          "explanation": "The attacker can delete alerts or notifications to hide their tracks. In addition, they are marked as read so the user is less likely to be notified of these actions."
        }
      ]
    }
  ]
};
