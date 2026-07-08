import type { Scenario } from '../../../../src/types/GameData';

export const scenario3: Scenario = {
  "id": "director-voice-fraud",
  "title": "The voice of the ghost director",
  "description": "PepsCorp is on alert. According to the employees present on site, accountant Claire Martin made an urgent transfer to a new supplier bank account after receiving a call from the director herself.\n\nThe problem is that the director says she never made that call. She was on leave abroad at the time and says she did not have access to her work phone for several hours.\n\nClaire is convinced she followed an official instruction. No malware was detected on the accountant's workstation. No administrator account appears to have been compromised.",
  "globalAttackScenario": "Probable method of operation: the attacker began by collecting public information about PepsCorp's director. A post taught them that the executive was traveling abroad and was therefore potentially harder to reach.\n\nThey then called the accountant while pretending to be her. The scenario was simple but effective: poor connection, urgency, confidentiality, supplier payment, and exceptional bypass of the procedure.\n\nDuring the call, the attacker sent an email containing an invoice and new bank details to give weight to the request. Once the transfer was made, they sent a final confirmation message to reassure the accountant and delay checks.\n\nGood practice to remember\n\nAny request for a transfer, bank details change, or urgent payment must be verified through an independent and official channel. Procedure bypasses must be refused, even when they seem to come from a manager.\n\nWhen in doubt, suspend the action, contact the person through a known number, warn a manager, and report the attempt.",
  "questions": [
    {
      "id": "director-public-trip-post",
      "title": "The digital postcard",
      "instruction": "Before questioning the systems, you start by checking the company's public information. You begin with the director's latest post.",
      "attackScenario": "The director's post was simply meant to show a travel moment. But in an attacker's notebook, it becomes a huge intelligence sheet. It reveals an absence, a context, responsibilities, and sometimes even the people to target.",
      "image": "/images/en/scenario3/linkedin_post.png",
      "imageWidth": 708,
      "imageHeight": 780,
      "hotspots": [
        {
          "id": "director-absence-dates",
          "x": 420,
          "y": 205,
          "width": 180,
          "height": 40,
          "label": "Visible vacation dates",
          "explanation": "The director's absence dates are public. An attacker can use them to know when she will be hard to reach."
        },
        {
          "id": "director-trip-location",
          "x": 15,
          "y": 245,
          "width": 110,
          "height": 40,
          "label": "Visible vacation location",
          "explanation": "The location gives context to the attacker. They can adapt their pretext and mention a time difference, travel, or an inability to make a long call."
        },
        {
          "id": "director-replacement-person",
          "x": 15,
          "y": 345,
          "width": 635,
          "height": 110,
          "label": "Name of the replacement person",
          "explanation": "The post indicates who handles certain topics during the director's absence. This gives a direct lead to the right target."
        }
      ]
    },
    {
      "id": "fake-director-call-transcript",
      "title": "The voice pushing her to hurry",
      "instruction": "Since the accountant says she received a call from the director, you check her call history to see the text transcript of the call. She says she recognized the director's tone.",
      "attackScenario": "The attacker uses the director's absence, urgency, confidentiality, and hierarchical authority. They push a person to act against procedure by making her feel that she is helping her manager and doing the right thing.",
      "image": "/images/en/scenario3/discussion.png",
      "imageWidth": 1103,
      "imageHeight": 1426,
      "hotspots": [
        {
          "id": "call-bad-connection-pretext",
          "x": 175,
          "y": 245,
          "width": 780,
          "height": 95,
          "label": "Poor connection pretext",
          "explanation": "The supposed director explains that she is calling from abroad with poor network coverage. This justifies a short call and limits verification opportunities."
        },
        {
          "id": "call-big-gain-pressure",
          "x": 175,
          "y": 620,
          "width": 790,
          "height": 75,
          "label": "Major gain",
          "explanation": "Strong pressure is placed on the accountant because there is a possible major gain."
        },
        {
          "id": "call-urgent-request",
          "x": 175,
          "y": 705,
          "width": 500,
          "height": 50,
          "label": "Strong urgency",
          "explanation": "The request must be handled quickly. Urgency is used to prevent the victim from taking time to verify."
        },
        {
          "id": "call-big-loss-pressure",
          "x": 175,
          "y": 750,
          "width": 400,
          "height": 50,
          "label": "Major loss",
          "explanation": "Additional pressure is created by presenting a major loss if she does not do what is needed."
        },
        {
          "id": "call-sensitive-financial-request",
          "x": 175,
          "y": 995,
          "width": 800,
          "height": 115,
          "label": "Sensitive financial request",
          "explanation": "A transfer or bank details change is a critical action. It should never be validated based on a simple call."
        },
        {
          "id": "call-confidentiality-request",
          "x": 175,
          "y": 1260,
          "width": 820,
          "height": 75,
          "label": "Confidentiality request",
          "explanation": "The attacker isolates the victim by asking her not to warn anyone. The fewer witnesses there are, the more likely the trap is to work."
        },
        {
          "id": "call-hierarchical-pressure-confirmation",
          "x": 175,
          "y": 1325,
          "width": 805,
          "height": 62,
          "label": "Hierarchical tone and confirmation requested after action",
          "explanation": "The attacker uses the director's supposed authority to reduce the accountant's ability to question the request. The attacker also wants to know when the operation is finished so they can track the progress of the fraud."
        }
      ]
    },
    {
      "id": "urgent-invoice-with-new-rib",
      "title": "The invoice that arrived during the call",
      "instruction": "The accountant shows you the email she received during the call. The timing seems to confirm the director's words during the call.",
      "attackScenario": "The email arrives like proof, but it mainly acts as a prop. It gives an administrative form to the phone instruction.\n\nThe attacker knows that an oral request may seem fragile. They therefore add an invoice, bank details, an attachment, and a professional tone, which makes the story more solid.",
      "image": "/images/en/scenario3/email_phishing.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "invoice-suspicious-sender",
          "x": 370,
          "y": 205,
          "width": 380,
          "height": 58,
          "label": "Suspicious sender address",
          "explanation": "The displayed name may imitate the director, but the email address does not match. It uses direct0r instead of director."
        },
        {
          "id": "invoice-foreign-rib",
          "x": 330,
          "y": 752,
          "width": 450,
          "height": 55,
          "label": "Foreign supplier bank details",
          "explanation": "The bank details in the email come from a foreign country, here Russia. An unexpected bank, country, or format must trigger an additional check."
        },
        {
          "id": "invoice-unprofessional-file-name",
          "x": 360,
          "y": 315,
          "width": 400,
          "height": 58,
          "label": "Invoice with an unprofessional name",
          "explanation": "The invoice attached to the email does not look professional. The name looks sloppy."
        },
        {
          "id": "invoice-wrong-copyright",
          "x": 330,
          "y": 1005,
          "width": 420,
          "height": 48,
          "label": "Wrong copyright",
          "explanation": "The email tries to look professional with a fake, incorrectly dated copyright."
        }
      ]
    },
    {
      "id": "fraud-confirmation-email",
      "title": "The confirmation that closes the trap",
      "instruction": "After the transfer, the accountant reportedly received one last message in her mailbox.",
      "attackScenario": "The final message is used to calm the victim. It gives the impression that the operation is finished, validated, and under control. In reality, it mainly allows the attacker to gain time.",
      "image": "/images/en/scenario3/mail_phishing_2.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "confirmation-vague-subject",
          "x": 302,
          "y": 135,
          "width": 250,
          "height": 50,
          "label": "Vague confirmation",
          "explanation": "A sloppy thank-you message: since the attacker has already received the transfer, they try to reassure the victim without much effort because the money is already in their pocket."
        },
        {
          "id": "confirmation-suspicious-sender",
          "x": 370,
          "y": 205,
          "width": 450,
          "height": 58,
          "label": "Suspicious sender address",
          "explanation": "Once again, the displayed name may imitate the director, but the email address does not match. It uses direct0r instead of director."
        },
        {
          "id": "confirmation-no-more-action",
          "x": 315,
          "y": 475,
          "width": 470,
          "height": 55,
          "label": "No additional procedure",
          "explanation": "The message states that everything is in order and that no further action is needed. The attacker tries to close the conversation and avoid any later verification."
        },
        {
          "id": "confirmation-informal-text",
          "x": 300,
          "y": 330,
          "width": 550,
          "height": 300,
          "label": "Informal text",
          "explanation": "Informal thanks and unprofessional text. This shows that the email was made quickly and that nothing was formal."
        },
        {
          "id": "confirmation-different-logo",
          "x": 315,
          "y": 835,
          "width": 180,
          "height": 75,
          "label": "Different logo",
          "explanation": "The logo in the second email is different from the one in the first. This shows that the logos and emails are messy and were made quickly."
        },
        {
          "id": "confirmation-copyright",
          "x": 500,
          "y": 840,
          "width": 450,
          "height": 45,
          "label": "Copyright",
          "explanation": "Once again, the email tries to look professional with a fake, incorrectly dated copyright."
        }
      ]
    }
  ]
};
