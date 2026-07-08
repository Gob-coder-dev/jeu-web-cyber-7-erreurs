import type { Scenario } from '../../../../src/types/GameData';

export const scenario2: Scenario = {
  "id": "phishing-inbox-melanie",
  "title": "Melanie's mailbox",
  "description": "Melanie, an administrative assistant, received several emails about unidentified login attempts on several of her online service customer accounts on the same day: UPS, Amazon, Sephora, and Decathlon. The next day, an unusual login attempt was detected on Melanie's account in the internal service.\n\nDetective, you examine Melanie's mailbox. You find suspicious messages there.",
  "globalAttackScenario": "Probable method of operation: the attacker flooded Melanie with several different lures on the same day. By relying on pressure, curiosity, reward, and habit, the attacker sent emails about urgent delivery, a gift, a limited offer, and a known brand. This likely pushed her, tempted by the possible gain, to click on these fake links and enter personal information. The hacker was then able to collect her information and use it to log in to the sites in question, hoping to abuse these accounts, attempt purchases with Melanie's card, or collect additional information about the victim.\n\nGood practice to remember\n\nBefore clicking, check the sender's real address, the URL, the context of the request, and the level of urgency. When in doubt, do not click: use an official channel.",
  "questions": [
    {
      "id": "ups-urgent-delivery",
      "title": "The package that was too urgent",
      "instruction": "Melanie received this urgent UPS delivery email. An urgent delivery to validate.",
      "attackScenario": "This message tries to create a feeling of urgency around an ordinary topic: a package delivery. That is exactly what makes it effective. The attacker does not need to be original; they only need to arrive at the right time, with the right pretext.",
      "image": "/images/en/scenario2/email_phishing_2.png",
      "imageWidth": 1618,
      "imageHeight": 2198,
      "hotspots": [
        {
          "id": "ups-suspicious-sender-domain",
          "x": 70,
          "y": 110,
          "width": 900,
          "height": 40,
          "label": "Suspicious sender and domain",
          "explanation": "The displayed name imitates UPS, but the real address does not match a reliable official domain."
        },
        {
          "id": "ups-approximate-logo",
          "x": 540,
          "y": 210,
          "width": 95,
          "height": 50,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        },
        {
          "id": "ups-limited-time-subject",
          "x": 65,
          "y": 60,
          "width": 560,
          "height": 42,
          "label": "Subject with a limited deadline",
          "explanation": "The limited deadline puts the victim under pressure. Urgency is a classic technique used to reduce thinking time."
        },
        {
          "id": "ups-personal-data-request",
          "x": 535,
          "y": 730,
          "width": 520,
          "height": 165,
          "label": "Request for personal data",
          "explanation": "The message asks for an address, a phone number, and a delivery date. This information can be used to enrich a profile or prepare a more targeted attack. In addition, delivery companies cannot start a delivery if they do not already have your address or personal information."
        },
        {
          "id": "ups-suspicious-link",
          "x": 530,
          "y": 1030,
          "width": 310,
          "height": 105,
          "label": "Suspicious link",
          "explanation": "The visible link does not look like an official UPS domain. The right reflex is to use the official website or application, never a link received in a suspicious message."
        },
        {
          "id": "ups-pressure-section",
          "x": 530,
          "y": 1425,
          "width": 570,
          "height": 115,
          "label": "Section to remember",
          "explanation": "This text section uses the psychological effect of a possible gain for the user and adds extra mental pressure."
        }
      ]
    },
    {
      "id": "amazon-unexpected-gift",
      "title": "The gift out of nowhere",
      "instruction": "A second message announces an unexpected reward from Amazon.",
      "attackScenario": "Here, the lure is no longer urgency, but reward. The message tries to lower vigilance by giving the victim the impression that they have something to gain.",
      "image": "/images/en/scenario2/email_phishing_3.png",
      "imageWidth": 1592,
      "imageHeight": 1188,
      "hotspots": [
        {
          "id": "amazon-sensational-subject",
          "x": 75,
          "y": 72,
          "width": 1010,
          "height": 42,
          "label": "Overly sensational subject",
          "explanation": "The flames, congratulations, and precise date create an announcement effect. The goal is to catch the eye and trigger a quick click."
        },
        {
          "id": "amazon-random-sender",
          "x": 80,
          "y": 125,
          "width": 700,
          "height": 36,
          "label": "Suspicious sender",
          "explanation": "The email sender is completely random. It does not look like a real sender at all."
        },
        {
          "id": "amazon-approximate-logo",
          "x": 690,
          "y": 260,
          "width": 260,
          "height": 110,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        },
        {
          "id": "amazon-improbable-prize",
          "x": 455,
          "y": 410,
          "width": 720,
          "height": 135,
          "label": "Improbable prize",
          "explanation": "A major reward announced without clear context should raise suspicion. Fake rewards exploit curiosity and the desire to take advantage of an opportunity."
        },
        {
          "id": "amazon-personal-data-confirmation",
          "x": 565,
          "y": 580,
          "width": 500,
          "height": 220,
          "label": "Personal data and poor translation",
          "explanation": "The message displays a semblance of personal information to reassure you and \"prove\" that the email is legitimate. However, no real information is shown apart from the email address. In addition, the details are poorly translated: the product condition is given in Spanish."
        }
      ]
    },
    {
      "id": "decathlon-forced-promotion",
      "title": "The promotion that forces your hand",
      "instruction": "Melanie received a third email about a bicycle reservation that she says she did not make.",
      "attackScenario": "This message combines reward and urgency. It promises an advantage, then threatens to make it disappear. This combination is common and forces the victim to make a quick decision.",
      "image": "/images/en/scenario2/email_phishing.png",
      "imageWidth": 1589,
      "imageHeight": 1195,
      "hotspots": [
        {
          "id": "decathlon-suspicious-sender",
          "x": 70,
          "y": 118,
          "width": 620,
          "height": 38,
          "label": "Suspicious sender address",
          "explanation": "The address does not match an official Decathlon domain."
        },
        {
          "id": "decathlon-too-good-offer",
          "x": 520,
          "y": 670,
          "width": 570,
          "height": 72,
          "label": "Offer too good to be true",
          "explanation": "The message announces a reserved bicycle without any clear previous action. An advantageous, unexpected, and unsolicited promise should raise doubts."
        },
        {
          "id": "decathlon-artificial-urgency",
          "x": 620,
          "y": 830,
          "width": 430,
          "height": 35,
          "label": "Artificial urgency",
          "explanation": "The announced expiration today pushes the user to act quickly. Limited time is psychological pressure used to prevent verification."
        },
        {
          "id": "decathlon-inconsistent-button",
          "x": 580,
          "y": 880,
          "width": 450,
          "height": 68,
          "label": "Button inconsistent with the offer",
          "explanation": "The button offers to reserve a bicycle even though the message says it is already reserved. This inconsistency shows that the email scenario is not solid."
        },
        {
          "id": "decathlon-approximate-logo",
          "x": 610,
          "y": 225,
          "width": 395,
          "height": 95,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        }
      ]
    },
    {
      "id": "sephora-clumsy-personalization",
      "title": "The clumsy personalization",
      "instruction": "A final email concerns a suspicious Sephora offer.",
      "attackScenario": "The message tries to look personal, but it rings false. In a real attack, even approximate personalization can be enough if the victim is tired, in a hurry, or used to receiving many marketing emails.",
      "image": "/images/en/scenario2/email_phishing_4.png",
      "imageWidth": 1585,
      "imageHeight": 1138,
      "hotspots": [
        {
          "id": "sephora-suspicious-sender",
          "x": 75,
          "y": 125,
          "width": 610,
          "height": 38,
          "label": "Suspicious sender",
          "explanation": "The sender address does not match an official Sephora domain."
        },
        {
          "id": "sephora-unexpected-exclusive-offer",
          "x": 75,
          "y": 75,
          "width": 680,
          "height": 38,
          "label": "Unexpected exclusive offer",
          "explanation": "An unexpected gift offer can push the user to click before thinking."
        },
        {
          "id": "sephora-clumsy-greeting",
          "x": 610,
          "y": 470,
          "width": 200,
          "height": 50,
          "label": "Clumsy personalization",
          "explanation": "The message tries to use a personalized greeting, but the result looks automated and not very credible: your email without the @. This is a common sign of a fraudulent campaign."
        },
        {
          "id": "sephora-personal-data-visible",
          "x": 550,
          "y": 610,
          "width": 530,
          "height": 205,
          "label": "Personal data displayed",
          "explanation": "The message displays an identifier and an email address. These elements can be used to make the attack more credible or to confirm that the address is active. However, the displayed information is extremely basic: a fake name and an email address."
        }
      ]
    }
  ]
};
