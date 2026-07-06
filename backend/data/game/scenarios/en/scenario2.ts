import type { Scenario } from '../../../../src/types/GameData';

const emailPhishingDecathlonImage = "/images/en/scenario2/email_phishing.png";
const emailPhishingUpsImage = "/images/en/scenario2/email_phishing_2.png";
const emailPhishingAmazonImage = "/images/en/scenario2/email_phishing_3.png";
const emailPhishingSephoraImage = "/images/en/scenario2/email_phishing_4.png";

export const scenario2: Scenario = {
  id: "phishing-inbox-melanie",
  title: "Melanie's mailbox",
  description:
    "Melanie, an administrative assistant, received several emails about unidentified login attempts on several of her online service customer accounts on the same day: UPS, Amazon, Sephora, and Decathlon. The next day, an unusual login attempt was detected on Melanie's account in the internal service.\n\nDetective, you examine Melanie's mailbox. You discover suspicious messages there.",
  globalAttackScenario:
    "Probable method of operation: the attacker bombarded Melanie with several different lures on the same day. Urgent delivery, gift, limited offer, well-known brand. This must have pushed her, with the lure of gain, to click on these fake links and fill in personal information. The hacker was therefore able to collect her information and used it to log in to the basic sites. Each message tests a different emotion.\n\nInvestigation conclusion: phishing does not only rely on mistakes or crude emails. It relies above all on pressure, curiosity, reward, and habit. The right reflex is to check the sender, avoid direct links, go through official sites, and report suspicious messages.\n\nGood reflex to remember\n\nBefore clicking, check the sender's real address, the URL, the context of the request, and the level of urgency. If in doubt, do not click: report it or use an official channel.",
  questions: [
    {
      id: "ups-urgent-delivery",
      title: "The package in too much of a hurry",
      instruction:
        "Melanie received this urgent UPS delivery email. The message looks professional, but several details do not fit.",
      attackScenario:
        "This message tries to create a sense of urgency around an ordinary topic: the delivery of a package. That is precisely what makes it effective. The attacker does not need to be original; he only needs to arrive at the right moment, with the right pretext.",
      image: emailPhishingUpsImage,
      imageWidth: 1618,
      imageHeight: 2198,
      hotspots: [
        {
          id: "ups-suspicious-sender-domain",
          x: 70,
          y: 110,
          width: 900,
          height: 40,
          label: "Suspicious sender and domain",
          explanation:
            "The displayed name imitates UPS, but the real address does not match a reliable official domain. In phishing, the visible name can lie: you must look at the full address.",
        },
        {
          id: "ups-limited-time-subject",
          x: 65,
          y: 60,
          width: 560,
          height: 42,
          label: "Subject with limited deadline",
          explanation:
            "The limited deadline puts the victim under pressure. Urgency is a classic technique used to reduce thinking time.",
        },
        {
          id: "ups-personal-data-request",
          x: 535,
          y: 730,
          width: 520,
          height: 165,
          label: "Request for personal data",
          explanation:
            "The message asks for address, phone number, and delivery date. This information can be used to enrich a profile or prepare a more targeted attack. In addition, delivery companies cannot initiate a delivery if they do not have your address or your personal information.",
        },
        {
          id: "ups-suspicious-link",
          x: 530,
          y: 1030,
          width: 310,
          height: 105,
          label: "Suspicious link",
          explanation:
            "The visible link does not look like an official UPS domain. The right reflex is to go through the official website or app, never through a link received in a suspicious message.",
        },
        {
          id: "ups-pressure-section",
          x: 530,
          y: 1425,
          width: 570,
          height: 115,
          label: "Section to remember",
          explanation:
            "This section of text uses the psychological aspect of possible gain for the user and adds extra mental pressure.",
        },
      ],
    },
    {
      id: "amazon-unexpected-gift",
      title: "The gift that fell from the sky",
      instruction:
        "A second message announces an unexpected reward from Amazon.",
      attackScenario:
        "Here, the lure is no longer urgency, but reward. The message tries to lower vigilance by giving the impression that the victim has something to gain.",
      image: emailPhishingAmazonImage,
      imageWidth: 1592,
      imageHeight: 1188,
      hotspots: [
        {
          id: "amazon-sensational-subject",
          x: 75,
          y: 72,
          width: 1010,
          height: 42,
          label: "Overly sensational subject",
          explanation:
            "The flames, congratulations, and precise date create an announcement effect. The goal is to catch the eye and provoke a quick click.",
        },
        {
          id: "amazon-random-sender",
          x: 80,
          y: 125,
          width: 700,
          height: 36,
          label: "Suspicious sender",
          explanation:
            "The email sender is completely random. It does not look at all like a real sender.",
        },
        {
          id: "amazon-approximate-logo",
          x: 690,
          y: 260,
          width: 260,
          height: 110,
          label: "Approximate logo",
          explanation:
            "A slightly different visual identity can reveal a fraudulent message. Attackers often copy brands, but the details sometimes betray the copy.",
        },
        {
          id: "amazon-improbable-prize",
          x: 455,
          y: 410,
          width: 720,
          height: 135,
          label: "Unlikely prize",
          explanation:
            "A major reward announced without clear context should raise an alert. Fake rewards exploit curiosity and the desire to take advantage of an opportunity.",
        },
        {
          id: "amazon-personal-data-confirmation",
          x: 565,
          y: 580,
          width: 500,
          height: 220,
          label: "Personal data to confirm",
          explanation:
            "The message asks for or displays personal information. The objective may be to validate an identity, complete a profile, or prepare another attack.",
        },
      ],
    },
    {
      id: "decathlon-forced-promotion",
      title: "The reservation promotion",
      instruction:
        "Melanie received a third email about a bicycle reservation that she says she did not make.",
      attackScenario:
        "This message mixes reward and urgency. It promises an advantage, then threatens to make it disappear. This combination is common: the attacker first creates desire, then imposes a quick decision.",
      image: emailPhishingDecathlonImage,
      imageWidth: 1589,
      imageHeight: 1195,
      hotspots: [
        {
          id: "decathlon-suspicious-sender",
          x: 70,
          y: 118,
          width: 620,
          height: 38,
          label: "Suspicious sender address",
          explanation:
            "The address does not match an official Decathlon domain.",
        },
        {
          id: "decathlon-too-good-offer",
          x: 520,
          y: 670,
          width: 570,
          height: 72,
          label: "Offer too good to be true",
          explanation:
            "Clue confirmed. The message announces a reserved bicycle without any clear previous action. An advantageous, unexpected, and unsolicited promise should raise doubts.",
        },
        {
          id: "decathlon-artificial-urgency",
          x: 620,
          y: 830,
          width: 430,
          height: 35,
          label: "Artificial urgency",
          explanation:
            "The announced expiration today pushes people to act quickly. Limited time is psychological pressure used to prevent verification.",
        },
        {
          id: "decathlon-inconsistent-button",
          x: 580,
          y: 880,
          width: 450,
          height: 68,
          label: "Button inconsistent with the offer",
          explanation:
            "The button proposes reserving a bicycle even though the message claims it is already reserved. This inconsistency shows that the email scenario is not solid.",
        },
      ],
    },
    {
      id: "sephora-clumsy-personalization",
      title: "The Gift Box",
      instruction: "One last email concerns a suspicious Sephora offer.",
      attackScenario:
        "The message tries to appear personal, but it rings false. In a real attack, even approximate personalization can be enough if the victim is tired, in a hurry, or used to receiving many commercial emails.",
      image: emailPhishingSephoraImage,
      imageWidth: 1585,
      imageHeight: 1138,
      hotspots: [
        {
          id: "sephora-suspicious-sender",
          x: 75,
          y: 125,
          width: 610,
          height: 38,
          label: "Suspicious sender",
          explanation:
            "The sender's address does not match an official Sephora domain. The displayed name is a facade: the full address remains the proof to examine.",
        },
        {
          id: "sephora-unexpected-exclusive-offer",
          x: 75,
          y: 75,
          width: 680,
          height: 38,
          label: "Unexpected exclusive offer",
          explanation:
            "An unexpected gift offer can push the user to click before thinking. The surprise effect is a manipulation tool.",
        },
        {
          id: "sephora-clumsy-greeting",
          x: 610,
          y: 470,
          width: 200,
          height: 50,
          label: "Clumsy personalization",
          explanation:
            "The message tries to use a personalized greeting, but the result looks automated and not very credible (your email without the @). Failed personalization is a frequent clue of a fraudulent campaign.",
        },
        {
          id: "sephora-personal-data-visible",
          x: 550,
          y: 610,
          width: 530,
          height: 205,
          label: "Personal data displayed",
          explanation:
            "The message displays an identifier and an email address. These elements can be used to make the attack more credible or to confirm that the address is active.\n\nHowever, the displayed information is very basic: a fake name and an email.",
        },
        {
          id: "sephora-fake-copyright-date",
          x: 520,
          y: 940,
          width: 575,
          height: 82,
          label: "Fake copyright and a wrong date",
          explanation:
            "The email tries to look professional with a fake copyright, but the date is not correct. The email was sent in 2026 and the fake copyright is dated 2025.",
        },
      ],
    },
  ],
};
