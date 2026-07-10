import type { Scenario } from '../../../../src/types/GameData';

export const scenario1: Scenario = {
  "id": "physical-intrusion",
  "title": "Intrusion on the premises",
  "description": "Orialys suffered an intrusion. Accounting data was stolen, and suspicious transfers from the company's account to foreign countries were detected. The IT department does not understand what happened because no account monitoring system identified an intrusion or a virus.\n\nThe only lead found is that the last person to view the stolen files was Julien, the company's new accountant. However, he denies all accusations. The company therefore believes that his account was hacked.",
  "difficulty": 1,
  "globalAttackScenario": "Probable method of operation: the attacker discovered the LinkedIn post introducing Julien. The photo contains sensitive information: a visible password, the operating system, and even personal details such as manga, football, and a medical appointment. The attacker uses this information to prepare a physical intrusion. A few days later, during Julien's medical appointment, the attacker appears at the company's door pretending to be a supplier. They identify Julien's desk from the LinkedIn photo and unlock the computer with the password written on the sticky note near the keyboard. The attacker does not even need to hack the victim's computer: they have all the displayed passwords needed to log in wherever they want and recover confidential company information without leaving traces.\n\nThey could also recover other data more easily just by taking the USB drive from the desk.",
  "goodPractices": "Before publishing a professional photo, check that it contains no compromising information: passwords, employee habits, dates, company IT tools...\n\nBefore leaving your workstation, lock your session. Never display a password. Keep documents, phones, and sensitive equipment out of anyone's reach.",
  "questions": [
    {
      "id": "linkedin-post-sensitive-data",
      "title": "The photo that said too much",
      "instruction": "Since you are trying to understand what the hacker could have done to attack Orialys, you search for all company information that can be found easily on the internet, starting with social networks.\n\nOn LinkedIn, you look at the latest post made by Orialys, which seems suspicious to you: \"We welcome our new accountant Julien Duckey!\"",
      "attackScenario": "The post looked positive: welcoming a new colleague, showing company life, and creating a sense of closeness. But for a malicious observer, it becomes an intelligence sheet. Name, role, technical environment, habits, and interests: every detail feeds the attacker's file.",
      "image": "/images/en/scenario1/linkedin_post.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "password-visible-post-it",
          "x": 168,
          "y": 176,
          "width": 104,
          "height": 110,
          "label": "Visible password",
          "explanation": "The sticky note reveals a password in plain text. Once published online, everyone knows the employee's password."
        },
        {
          "id": "medical-appointment-visible",
          "x": 178,
          "y": 292,
          "width": 102,
          "height": 100,
          "label": "Visible personal information",
          "explanation": "The sticky note contains a medical appointment. This is personal data that should not appear in a post."
        },
        {
          "id": "operating-system-visible",
          "x": 290,
          "y": 175,
          "width": 385,
          "height": 265,
          "label": "Visible operating system",
          "explanation": "The computer screen shows the operating system used by the company. This can help an attacker target attacks based on vulnerabilities in that system."
        },
        {
          "id": "operating-system-visible-2",
          "x": 0,
          "y": 306,
          "width": 165,
          "height": 265,
          "label": "Visible operating system",
          "explanation": "The computer screen shows the operating system used by the company. This can help an attacker target attacks based on vulnerabilities in that system."
        },
        {
          "id": "personal-interest-football-card",
          "x": 88,
          "y": 575,
          "width": 135,
          "height": 92,
          "label": "Visible interests on the desk",
          "explanation": "A football game card is visible on the desk. The attacker therefore learns about the employee's interests, which can help them create a targeted phishing attack."
        },
        {
          "id": "personal-interest-manga-shirt",
          "x": 990,
          "y": 550,
          "width": 400,
          "height": 520,
          "label": "Personal clue linked to clothing",
          "explanation": "A T-shirt with a manga reference is visible in the photo. The attacker therefore learns personal information about the employee, which can help them create a targeted phishing attack."
        }
      ]
    },
    {
      "id": "abandoned-workstation",
      "title": "The workstation abandoned during the break",
      "instruction": "After finding this problematic post, you return to Orialys's premises to inform them about the situation. At the building entrance, you run into Julien during his coffee break, and on the way you pass by his new desk. You therefore take a look at his workstation setup.",
      "attackScenario": "This scene shows very simple but very common weaknesses: no locking, a USB drive left in free access, and a computer left on. It is a gold mine for anyone who wants to access critical company information.",
      "image": "/images/en/scenario1/desktop.jpg",
      "imageWidth": 4080,
      "imageHeight": 3060,
      "hotspots": [
        {
          "id": "unlocked-computer",
          "x": 2950,
          "y": 1300,
          "width": 950,
          "height": 700,
          "label": "Computer left on",
          "explanation": "The computer is left on and logged in, which may allow an attacker to access sensitive information if the user moves away from the workstation."
        },
        {
          "id": "password-post-it-workstation",
          "x": 1800,
          "y": 750,
          "width": 220,
          "height": 230,
          "label": "Password visible on a sticky note",
          "explanation": "The user's password is written on a sticky note next to the computer, which can allow an attacker to find it easily and access the user's account."
        },
        {
          "id": "usb-drive-unattended",
          "x": 1960,
          "y": 1730,
          "width": 260,
          "height": 160,
          "label": "USB drive left in free access",
          "explanation": "A USB drive is placed on the desk with no supervision or protection. It could be stolen, meaning potentially sensitive data is freely accessible."
        }
      ]
    }
  ]
};
