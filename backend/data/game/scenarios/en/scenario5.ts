import type { Scenario } from '../../../../src/types/GameData';

export const scenario5: Scenario = {
  "id": "ransomware-cv-attachment",
  "title": "Urgent recruitment",
  "description": "Peashooter&Co is in crisis. Since this morning, several HR department folders have become unreadable. The files have changed names, some documents no longer open, and a ransom message has appeared on several workstations.\n\nThe IT department suspects a ransomware attack. The HR department does not understand. According to Lea, the recruitment officer, she did not install anything in particular. She says the last thing she did before the attack was work on recruitment for an urgent job offer published a few days earlier.\n\nNo administrator account seems to have been forced. No direct intrusion on the servers is detected.",
  "globalAttackScenario": "Probable method of operation: the attacker began by studying the job offer published by Peashooter&Co. They found the recruiter's name, address, recruitment context, and urgency of the need.\n\nThey then sent a very credible fake application, built to match the position exactly. The attached file did not only contain a CV: it asked the user to enable dangerous content. Once this action was performed, Lea's workstation was probably compromised.\n\nThe attack then spread to the HR folders that the account could access. Overly broad rights, poorly organized shares, and file synchronization increased the impact until many documents were encrypted.\n\nGood practice to remember\n\nNever enable macros or active content in a document received by email without verification. Be wary of unusual attachments, use secure recruitment platforms, verify candidates, and limit access rights to sensitive folders.",
  "questions": [
    {
      "id": "overly-detailed-job-ad",
      "title": "The job ad that said too much",
      "instruction": "Before looking at the CV, you go back to the source. The job offer published by Peashooter&Co seems ordinary. But sometimes, a job ad does not speak only to candidates.\n\n3 urgency signals in the image",
      "attackScenario": "A job offer is meant to attract candidates. But here, it also attracts unwanted attention.\n\nThe ad gives a name, an address, context, urgency, and business vocabulary. For an attacker, it is almost a preparation sheet. They do not yet know how to get in, but they already know who to write to, when to do it, and what tone to use.",
      "image": "/images/en/scenario5/annonce.png",
      "imageWidth": 1449,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "recruiter-name-visible",
          "x": 1080,
          "y": 690,
          "width": 260,
          "height": 37,
          "label": "Visible recruiter name",
          "explanation": "The name of the person in charge of recruitment is displayed publicly. It directly presents a target."
        },
        {
          "id": "direct-email-address",
          "x": 1081,
          "y": 745,
          "width": 270,
          "height": 35,
          "label": "Direct email address",
          "explanation": "The recruiter's professional address is visible. This makes it easier to send targeted phishing directly to their mailbox."
        },
        {
          "id": "urgent-hiring-pressure",
          "x": 970,
          "y": 145,
          "width": 420,
          "height": 150,
          "label": "Recruitment urgency",
          "explanation": "The ad insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly."
        },
        {
          "id": "urgent-hiring-pressure-2",
          "x": 65,
          "y": 160,
          "width": 280,
          "height": 50,
          "label": "Recruitment urgency",
          "explanation": "The ad insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly."
        },
        {
          "id": "urgent-hiring-pressure-3",
          "x": 60,
          "y": 880,
          "width": 720,
          "height": 120,
          "label": "Recruitment urgency",
          "explanation": "The ad insists on the urgent nature of the recruitment. An attacker can exploit this pressure to send an application that will be opened quickly."
        },
        {
          "id": "team-details-visible",
          "x": 970,
          "y": 345,
          "width": 390,
          "height": 90,
          "label": "Precise details about the team",
          "explanation": "The more details the ad gives about the team, project, or internal organization, the more the attacker can adapt their message."
        }
      ]
    },
    {
      "id": "perfect-candidate-email",
      "title": "The perfect candidate",
      "instruction": "Lea shows you the email received the day before the incident. The profile seems to match the position exactly. Maybe a little too exactly.",
      "attackScenario": "The email looks like an ideal application. And that is exactly the problem.\n\nThe attacker wants to produce a document that the HR department will want to open. In recruitment, receiving files is normal. The trap is therefore hidden in an everyday action.",
      "image": "/images/en/scenario5/mail.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "suspicious-attachment",
          "x": 30,
          "y": 290,
          "width": 475,
          "height": 85,
          "label": "Suspicious attachment",
          "explanation": "The CV is sent in an unusual or risky format, such as a compressed file or a document with an abnormal file name."
        },
        {
          "id": "shortened-portfolio-link",
          "x": 30,
          "y": 745,
          "width": 250,
          "height": 35,
          "label": "Shortened portfolio link",
          "explanation": "A shortened link hides the real destination. It can redirect to a fake site, a download page, or a credential theft page."
        },
        {
          "id": "quick-opening-request",
          "x": 30,
          "y": 875,
          "width": 810,
          "height": 40,
          "label": "Request to open quickly",
          "explanation": "The candidate reminds the company of the urgency of the position and also mentions his own urgency due to many other applications at other companies. He therefore insists that the file be reviewed quickly."
        },
        {
          "id": "too-perfect-profile",
          "x": 30,
          "y": 470,
          "width": 940,
          "height": 170,
          "label": "Perfect profile",
          "explanation": "The message repeats exactly what the company needs. For such a short research period, this is suspicious. It is a perfect profile that is available immediately. This adds extra pressure on HR, who sees a major potential gain."
        }
      ]
    },
    {
      "id": "trusted-document-request",
      "title": "The document that asked for trust",
      "instruction": "While showing you the received CV, Lea tells you that the attached file did not immediately display the CV. She shows you a technical message that appeared when opening the document.",
      "attackScenario": "The document was not only asking to be read. It was asking for permission.\n\nAnd that permission probably turned a simple HR file into an entry point on the victim's computer.",
      "image": "/images/en/scenario5/word.png",
      "imageWidth": 1536,
      "imageHeight": 1024,
      "hotspots": [
        {
          "id": "enable-content-request",
          "x": 0,
          "y": 215,
          "width": 1536,
          "height": 55,
          "label": "Request to enable content",
          "explanation": "A document that asks to enable macros or active content can execute dangerous actions on the workstation."
        },
        {
          "id": "display-issue-pretext",
          "x": 405,
          "y": 385,
          "width": 735,
          "height": 445,
          "label": "Display issue pretext",
          "explanation": "The file pretends that the document is displayed incorrectly or protected. This pretext is used to push the user to click."
        }
      ]
    },
    {
      "id": "overly-permissive-hr-folder",
      "title": "The overly generous HR folder",
      "instruction": "The employees of Peashooter&Co show you their corrupted cloud so you can see the extent of the attack damage. You now inspect the spaces that Lea's account had access to.",
      "attackScenario": "The malicious file may have opened the first door. But the overly broad rights opened the whole corridor.\n\nRansomware becomes more dangerous when a user account can reach many documents. The problem is therefore not only the CV. The problem is also what the HR workstation could touch once infected.",
      "image": "/images/en/scenario5/sharepoint.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "whole-company-access-all-folders",
          "x": 510,
          "y": 455,
          "width": 190,
          "height": 400,
          "label": "The whole company has access to everything",
          "explanation": "All folders are freely accessible by the company. They should be limited to specific people."
        },
        {
          "id": "subfolders-inherit-permissions",
          "x": 190,
          "y": 880,
          "width": 720,
          "height": 110,
          "label": "Subfolders inherit permissions",
          "explanation": "All folders are accessible, and in addition, subfolders are automatically accessible too. Browsing sensitive documents is extremely simple for anyone."
        },
        {
          "id": "subfolders-inherit-permissions-2",
          "x": 971,
          "y": 780,
          "width": 450,
          "height": 120,
          "label": "Subfolders inherit permissions",
          "explanation": "All folders are accessible, and in addition, subfolders are automatically accessible too. Browsing sensitive documents is extremely simple for anyone."
        },
        {
          "id": "whole-company-access",
          "x": 980,
          "y": 250,
          "width": 320,
          "height": 60,
          "label": "\"Entire company\" read access",
          "explanation": "The folder can be read by too many people. The more access there is, the greater the impact of a compromised account."
        },
        {
          "id": "external-edit-access",
          "x": 980,
          "y": 360,
          "width": 370,
          "height": 70,
          "label": "External account with edit rights",
          "explanation": "A contractor or external account can modify the files. This right must be limited and controlled."
        },
        {
          "id": "anyone-link-can-edit",
          "x": 980,
          "y": 485,
          "width": 360,
          "height": 60,
          "label": "\"Anyone with the link can edit\" link",
          "explanation": "This type of link is dangerous. If the link circulates, anyone can access or modify the folder."
        },
        {
          "id": "no-expiration-link",
          "x": 980,
          "y": 600,
          "width": 250,
          "height": 60,
          "label": "Link without expiration date",
          "explanation": "A share without expiration remains active for a long time, even when the initial need has disappeared."
        },
        {
          "id": "download-allowed",
          "x": 980,
          "y": 685,
          "width": 250,
          "height": 60,
          "label": "Download allowed",
          "explanation": "If downloading is allowed, an attacker can easily copy documents outside the company."
        }
      ]
    }
  ]
};
