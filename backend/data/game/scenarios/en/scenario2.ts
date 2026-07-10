import type { Scenario } from '../../../../src/types/GameData';

export const scenario2: Scenario = {
  "id": "phishing-inbox-melanie",
  "title": "Melanie's mailbox",
  "description": "Melanie, an administrative assistant, received several emails about suspicious login attempts on several of her online service customer accounts on the same day: UPS, Amazon, Sephora, and Decathlon. The next day, an unusual login attempt was detected on Melanie's account in the internal service.\n\nDetective, you examine Melanie's mailbox. You find suspicious messages there.",
  "globalAttackScenario": "Probable method of operation: the attacker flooded Melanie with several different lures on the same day. By relying on pressure, curiosity, reward, and habit, the attacker sent emails about urgent delivery, a gift, a limited offer, and a known brand. This likely pushed her, tempted by the possible gain, to click on these fake links and enter personal information. The hacker was then able to collect her information and use it to log in to the sites in question, hoping to abuse these accounts, attempt purchases with Melanie's card, or collect additional information about the victim.",
  "goodPractices": "Before clicking, check the sender's real address, the URL, the context of the request, and the level of urgency. When in doubt, do not click: use an official channel.",
  "questions": [
    {
      "id": "ups-urgent-delivery",
      "title": "The package that was too urgent",
      "instruction": "Melanie received this urgent UPS delivery email.",
      "attackScenario": "This message tries to create a feeling of urgency around an ordinary topic: a package delivery. That is exactly what makes it effective. The attacker does not need to be original; they only need to arrive at the right time, with the right pretext.",
      "image": "/images/en/scenario2/email_phishing_2.png",
      "imageWidth": 1074,
      "imageHeight": 1464,
      "hotspots": [
        {
          "id": "ups-suspicious-sender-domain",
          "x": 46,
          "y": 80,
          "width": 597,
          "height": 27,
          "label": "Suspicious sender and domain",
          "explanation": "The displayed name imitates UPS, but the real address does not match a reliable official domain."
        },
        {
          "id": "ups-approximate-logo",
          "x": 345,
          "y": 140,
          "width": 63,
          "height": 40,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        },
        {
          "id": "ups-limited-time-subject",
          "x": 46,
          "y": 50,
          "width": 372,
          "height": 28,
          "label": "Subject with a limited deadline",
          "explanation": "The limited deadline puts the victim under pressure. Urgency is a classic technique used to reduce thinking time."
        },
        {
          "id": "ups-personal-data-request",
          "x": 345,
          "y": 510,
          "width": 345,
          "height": 110,
          "label": "Request for personal data",
          "explanation": "The message asks for an address, a phone number, and a delivery date. This information can be used to enrich a profile or prepare a more targeted attack. In addition, delivery companies cannot start a delivery if they do not already have your address or personal information."
        },
        {
          "id": "ups-suspicious-link",
          "x": 345,
          "y": 720,
          "width": 206,
          "height": 70,
          "label": "Suspicious link",
          "explanation": "The visible link does not look like an official UPS domain. The right reflex is to use the official website or application, never a link received in a suspicious message."
        },
        {
          "id": "ups-pressure-section",
          "x": 350,
          "y": 1000,
          "width": 378,
          "height": 77,
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
      "imageWidth": 1451,
      "imageHeight": 1084,
      "hotspots": [
        {
          "id": "amazon-sensational-subject",
          "x": 68,
          "y": 65,
          "width": 980,
          "height": 45,
          "label": "Overly sensational subject",
          "explanation": "The flames, congratulations, and precise date create an announcement effect. The goal is to catch the eye and trigger a quick click."
        },
        {
          "id": "amazon-random-sender",
          "x": 68,
          "y": 125,
          "width": 630,
          "height": 40,
          "label": "Suspicious sender",
          "explanation": "The email sender is completely random. It does not look like a real sender at all."
        },
        {
          "id": "amazon-approximate-logo",
          "x": 625,
          "y": 235,
          "width": 240,
          "height": 120,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        },
        {
          "id": "amazon-improbable-prize",
          "x": 415,
          "y": 375,
          "width": 655,
          "height": 130,
          "label": "Improbable prize",
          "explanation": "A major reward announced without clear context should raise suspicion. Fake rewards exploit curiosity and the desire to take advantage of an opportunity."
        },
        {
          "id": "amazon-personal-data-confirmation",
          "x": 515,
          "y": 530,
          "width": 455,
          "height": 205,
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
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "decathlon-suspicious-sender",
          "x": 65,
          "y": 115,
          "width": 600,
          "height": 45,
          "label": "Suspicious sender address",
          "explanation": "The address does not match an official Decathlon domain."
        },
        {
          "id": "decathlon-too-good-offer",
          "x": 460,
          "y": 630,
          "width": 530,
          "height": 65,
          "label": "Offer too good to be true",
          "explanation": "The message announces a reserved bicycle without any clear previous action. An advantageous, unexpected, and unsolicited promise should raise doubts."
        },
        {
          "id": "decathlon-artificial-urgency",
          "x": 500,
          "y": 750,
          "width": 445,
          "height": 90,
          "label": "Artificial urgency",
          "explanation": "The announced expiration today pushes the user to act quickly. Limited time is psychological pressure used to prevent verification."
        },
        {
          "id": "decathlon-inconsistent-button",
          "x": 525,
          "y": 850,
          "width": 410,
          "height": 65,
          "label": "Button inconsistent with the offer",
          "explanation": "The button offers to reserve a bicycle even though the message says it is already reserved. This inconsistency shows that the email scenario is not solid."
        },
        {
          "id": "decathlon-approximate-logo",
          "x": 535,
          "y": 215,
          "width": 390,
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
      "imageWidth": 1480,
      "imageHeight": 1063,
      "hotspots": [
        {
          "id": "sephora-suspicious-sender",
          "x": 70,
          "y": 125,
          "width": 555,
          "height": 35,
          "label": "Suspicious sender",
          "explanation": "The sender address does not match an official Sephora domain."
        },
        {
          "id": "sephora-unexpected-exclusive-offer",
          "x": 70,
          "y": 70,
          "width": 635,
          "height": 40,
          "label": "Unexpected exclusive offer",
          "explanation": "An unexpected gift offer can push the user to click before thinking."
        },
        {
          "id": "sephora-clumsy-greeting",
          "x": 560,
          "y": 440,
          "width": 187,
          "height": 45,
          "label": "Clumsy personalization",
          "explanation": "The message tries to use a personalized greeting, but the result looks automated and not very credible: your email without the @. This is a common sign of a fraudulent campaign."
        },
        {
          "id": "sephora-personal-data-visible",
          "x": 510,
          "y": 570,
          "width": 495,
          "height": 190,
          "label": "Personal data displayed",
          "explanation": "The message displays an identifier and an email address. These elements can be used to make the attack more credible or to confirm that the address is active. However, the displayed information is extremely basic: a fake name and an email address."
        },
        {
          "id": "sephora-approximate-logo",
          "x": 600,
          "y": 290,
          "width": 310,
          "height": 80,
          "label": "Approximate logo",
          "explanation": "The visual identity is slightly different from the official one. The logo is sloppy and approximate, and it does not look like the original."
        }
      ]
    }
  ]
};
