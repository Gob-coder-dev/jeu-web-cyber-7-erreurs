import type { Scenario } from '../../../../src/types/GameData';

const directorLinkedinPostImage = "/images/en/scenario3/linkedin_post.png";
const callTranscriptImage = "/images/en/scenario3/discussion.png";
const urgentInvoiceEmailImage = "/images/en/scenario3/email_phishing.png";
const confirmationEmailImage = "/images/en/scenario3/mail_phishing_2.png";

export const scenario3: Scenario = {
  id: "director-voice-fraud",
  title: "The voice of the ghost director",
  description:
    "The company PepsCorp is on alert. According to employees present on site, accountant Claire Martin allegedly made an urgent transfer to new supplier bank details after receiving a call from the director himself.\n\nThe problem is that the director says he never made this call. He was on holiday abroad at the time of the events and says he did not have access to his work phone for several hours.\n\nThe accountant is convinced she followed an official instruction. No malware was detected on Claire's workstation. No administrator account appears to have been compromised.",
  globalAttackScenario:
    "Probable method of operation: the attacker began by collecting public information about the director of PepsCorp. A post taught him that the executive was on holiday, abroad, and therefore potentially less reachable.\n\nHe then called Claire while pretending to be him. The scenario was simple but effective: bad connection, urgency, confidentiality, supplier transfer, and exceptional bypassing of the procedure.\n\nDuring the call, he sent an email containing an invoice and new bank details to give weight to his request. Once the transfer was made, he sent a final confirmation message to reassure the accountant and delay checks.\n\nInvestigation conclusion: the attack did not rely on advanced technical hacking. It relied on credible impersonation, prepared using public information and reinforced by psychological pressure. The director never called, but the attacker knew exactly how to make his shadow speak.\n\nGood reflex to remember\n\nAny request for a transfer, change of bank details, or urgent payment must be verified through an independent and official channel. Procedure bypasses must be refused, even when they seem to come from a line manager.\n\nIf in doubt, stop the action, contact the person via a known number, notify a manager, and report the attempt.",
  questions: [
    {
      id: "director-public-trip-post",
      title: "The digital postcard",
      instruction:
        "Before questioning the systems, you start by checking the company's public information. The director's latest post seems harmless. Too harmless, perhaps.",
      attackScenario:
        "The director's post simply wanted to show a travel moment. But in an attacker's notebook, it becomes a huge intelligence sheet. It reveals an absence, context, responsibilities, and sometimes even the people to target.",
      image: directorLinkedinPostImage,
      imageWidth: 708,
      imageHeight: 780,
      hotspots: [
        {
          id: "director-absence-dates",
          x: 420,
          y: 205,
          width: 180,
          height: 40,
          label: "Visible holiday dates",
          explanation:
            "The director's absence dates are public. An attacker can use them to know when he will be difficult to reach.",
        },
        {
          id: "director-trip-location",
          x: 15,
          y: 245,
          width: 110,
          height: 40,
          label: "Visible holiday location",
          explanation:
            "The location gives context to the attacker. He can adapt his pretext, talk about time difference, travel, or being unable to call for long.",
        },
        {
          id: "director-replacement-person",
          x: 15,
          y: 345,
          width: 635,
          height: 110,
          label: "Name of the replacement person",
          explanation:
            "The post indicates who handles certain topics during the director's absence. For an attacker, this is a direct lead to the right target.",
        },
      ],
    },
    {
      id: "fake-director-call-transcript",
      title: "The voice that hurried the pace",
      instruction:
        "Since the accountant says she received a call from the director, you therefore look at her history to see the text transcript of the call. She says she recognized the director's tone.",
      attackScenario:
        "The call contains no line of code, no virus, no malicious link. And yet, it contains almost the entire attack mechanism.\n\nThe attacker uses the director's absence, urgency, confidentiality, and hierarchical authority. He does not force the system: he pushes a person to act against procedure, giving her the impression that she is helping her manager.",
      image: callTranscriptImage,
      imageWidth: 1103,
      imageHeight: 1426,
      hotspots: [
        {
          id: "call-bad-connection-pretext",
          x: 175,
          y: 245,
          width: 780,
          height: 95,
          label: "Bad connection pretext",
          explanation:
            "The supposed director explains that he is calling from abroad with poor network coverage. This justifies a short call and limits verification possibilities.",
        },
        {
          id: "call-big-gain-pressure",
          x: 175,
          y: 620,
          width: 790,
          height: 75,
          label: "Big gain",
          explanation: "Strong pressure on Claire because of a possible big gain.",
        },
        {
          id: "call-urgent-request",
          x: 175,
          y: 705,
          width: 500,
          height: 50,
          label: "Strong urgency",
          explanation:
            "The request must be handled quickly. Urgency is used to prevent the victim from taking the time to verify.",
        },
        {
          id: "call-big-loss-pressure",
          x: 175,
          y: 750,
          width: 400,
          height: 50,
          label: "Big loss",
          explanation:
            "Additional pressure because there will be a major loss if she does not do what is needed.",
        },
        {
          id: "call-sensitive-financial-request",
          x: 175,
          y: 995,
          width: 800,
          height: 115,
          label: "Sensitive financial request",
          explanation:
            "A transfer or a change of bank details is a critical action. It should never be validated on a simple call.",
        },
        {
          id: "call-confidentiality-request",
          x: 175,
          y: 1260,
          width: 820,
          height: 75,
          label: "Request for confidentiality",
          explanation:
            "The attacker isolates the victim by asking her not to warn anyone. The fewer witnesses there are, the more likely the trap is to work.",
        },
        {
          id: "call-hierarchical-pressure-confirmation",
          x: 175,
          y: 1325,
          width: 805,
          height: 62,
          label: "Hierarchical tone and confirmation requested after action",
          explanation:
            "The attacker uses the supposed authority of the director to reduce the accountant's ability to question the request.\n\nThe attacker wants to know when the operation is finished. This allows him to track the progress of the fraud.",
        },
      ],
    },
    {
      id: "urgent-invoice-with-new-rib",
      title: "The invoice that arrived during the call",
      instruction:
        "The accountant shows you the email she received during the call. The timing seems to confirm the director's words during the call.",
      attackScenario:
        "The email arrives as proof, but above all it plays the role of a prop. It gives an administrative form to the telephone order.\n\nThe attacker knows that an oral request can seem fragile. So he adds an invoice, bank details, an attachment, and a professional tone. Each element makes the story stronger, even if the whole thing rests on a false identity.",
      image: urgentInvoiceEmailImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "invoice-suspicious-sender",
          x: 380,
          y: 215,
          width: 490,
          height: 58,
          label: "Suspicious sender address",
          explanation:
            "The displayed name can imitate the director or a supplier, but the real address must be checked carefully.",
        },
        {
          id: "invoice-unprofessional-file-name",
          x: 365,
          y: 320,
          width: 455,
          height: 58,
          label: "Invoice with an unprofessional name",
          explanation:
            "The invoice attached to the email does not look professional. The name seems sloppy.",
        },
        {
          id: "invoice-doubtful-logo",
          x: 330,
          y: 400,
          width: 500,
          height: 165,
          label: "Questionable logos",
          explanation:
            "The logo of the company sending the invoice looks fake or AI-generated. This shows poorly written and pre-generated emails.",
        },
        {
          id: "invoice-foreign-rib",
          x: 330,
          y: 752,
          width: 640,
          height: 55,
          label: "Foreign supplier bank details",
          explanation:
            "The bank details in the email come from a foreign country (here, Russia). An unexpected bank, country, or format should trigger additional verification.",
        },
        {
          id: "invoice-wrong-copyright",
          x: 330,
          y: 1005,
          width: 700,
          height: 48,
          label: "Bad copyright",
          explanation:
            "The email tries to look professional with a fake, incorrectly dated copyright.",
        },
      ],
    },
    {
      id: "fraud-confirmation-email",
      title: "The confirmation that closes the trap",
      instruction:
        "After the transfer, Claire allegedly received one last message in her mailbox.",
      attackScenario:
        "The last message is used to calm the victim. It gives the impression that the operation is finished, validated, and under control. In reality, it mainly allows the attacker to gain time.",
      image: confirmationEmailImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "confirmation-vague-subject",
          x: 312,
          y: 145,
          width: 300,
          height: 50,
          label: "Vague confirmation",
          explanation:
            "A message that says thank you without precisely mentioning the file can be designed to remain credible while limiting verifiable details.",
        },
        {
          id: "confirmation-no-more-action",
          x: 315,
          y: 475,
          width: 770,
          height: 55,
          label: "No additional procedure",
          explanation:
            "Clarification that everything is in order and that no additional action is necessary.\n\nThe attacker tries to close the conversation and avoid any checks after the fact.",
        },
        {
          id: "confirmation-informal-text",
          x: 315,
          y: 340,
          width: 600,
          height: 300,
          label: "Informal text",
          explanation:
            "Informal thanks and unprofessional text. This shows that the email was generated quickly and that nothing was formal.",
        },
        {
          id: "confirmation-different-logo",
          x: 315,
          y: 835,
          width: 180,
          height: 75,
          label: "Different logo",
          explanation:
            "The logo of the 2nd email is different from the first. This shows that the logos and emails are messy and made quickly.",
        },
        {
          id: "confirmation-copyright",
          x: 500,
          y: 840,
          width: 520,
          height: 45,
          label: "Copyright",
          explanation:
            "The email tries to look professional with a fake, incorrectly dated copyright.",
        },
      ],
    },
  ],
};
