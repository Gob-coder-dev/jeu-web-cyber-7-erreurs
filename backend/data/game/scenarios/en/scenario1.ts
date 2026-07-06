import type { Scenario } from '../../../../src/types/GameData';

const linkedinPostImage = "/images/en/scenario1/linkedin_post.png";
const desktopImage = "/images/en/scenario1/desktop.jpg";

export const scenario1: Scenario = {
  id: "physical-intrusion",
  title: "Intrusion on the premises",
  description:
    "The company Orialys suffered a discreet intrusion. Accounting data was stolen and suspicious transfers from the company's account to foreign countries were detected. The IT department does not understand, because no account monitoring system identified an intrusion or a virus.\n\nThe only lead found is that the last person to consult the stolen files was Julien, the company's new accountant. However, he denies all accusations. The company therefore believes that his account was hacked.",
  globalAttackScenario:
    "Probable method of operation: the attacker discovers the LinkedIn post introducing Julien. The photo contains sensitive information: a visible password, the operating system, and even personal details (manga, football, medical appointment). The attacker uses this information to prepare a physical intrusion and, a few days later during Julien's medical appointment, the attacker appears at the company's door pretending to be a supplier. He locates Julien's desk thanks to the LinkedIn photo and unlocks the computer with the password written on the post-it near the keyboard. The attacker inserts a malicious USB key and malware installs itself on Julien's Windows computer, allowing all confidential information about the company to be recovered. One of the biggest weaknesses: human negligence combined with overexposure of information online.\n\nHe was also able to recover other data more easily just by taking the USB key from the desk.\n\nInvestigation conclusion: the intrusion did not rely on a single mistake, but on a chain of small neglected details. An overly revealing photo, an unlocked workstation, a visible password, and accessible equipment can be enough to turn a simple visit into a security incident.\n\nGood reflex to remember\n\nBefore publishing a professional photo, check whether any compromising information is being sent: password, employee habits, dates, the company's IT tools...\n\nBefore leaving your workstation, lock your session. Never display a password. Keep sensitive documents, phones, and equipment out of reach.",
  questions: [
    {
      id: "linkedin-post-sensitive-data",
      title: "The photo that said too much",
      instruction:
        "As you try to understand what the hacker could have done to attack Orialys, you will look for all company information that can be easily found on the internet, starting with social networks.\n\nOn LinkedIn, you look at the latest post made by Orialys, which seems suspicious to you: \"We would like to welcome our new accountant Julien Duckey!\"",
      attackScenario:
        "The post seemed positive: welcoming a new colleague, showing company life, creating a sense of closeness. But for a malicious observer, it becomes an intelligence sheet. Name, role, technical environment, habits, and interests: every detail feeds the attacker's file.",
      image: linkedinPostImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "password-visible-post-it",
          x: 168,
          y: 176,
          width: 104,
          height: 110,
          label: "Visible password",
          explanation:
            "The post-it reveals a password in plain text. Published online, everyone knows the employee's password.",
        },
        {
          id: "medical-appointment-visible",
          x: 178,
          y: 292,
          width: 102,
          height: 100,
          label: "Visible personal information",
          explanation:
            "The post-it contains a medical appointment. This is personal data that should not appear in a post.",
        },
        {
          id: "operating-system-visible",
          x: 0,
          y: 306,
          width: 165,
          height: 265,
          label: "Visible operating system",
          explanation:
            "The computer screen shows the operating system used by the company. This can help an attacker target attacks based on the vulnerabilities of that system.",
        },
        {
          id: "personal-interest-football-card",
          x: 88,
          y: 575,
          width: 135,
          height: 92,
          label: "Interests visible on the desk",
          explanation:
            "A football game card is visible on the desk. The attacker therefore knows personal information about the employee, which can help create a targeted phishing attack.",
        },
        {
          id: "personal-interest-manga-shirt",
          x: 990,
          y: 550,
          width: 400,
          height: 520,
          label: "Personal clue linked to clothing",
          explanation:
            "A manga t-shirt is visible in the photo. The attacker therefore knows personal information about the employee, which can help create a targeted phishing attack.",
        },
      ],
    },
    {
      id: "abandoned-workstation",
      title: "The workstation abandoned during the break",
      instruction:
        "After finding this problematic post, you return to Orialys' premises to inform them of the situation. At the entrance to the building, you run into Julien on a coffee break, and on the way, you pass by his desk. You therefore take a look at how his work area is organized.",
      attackScenario:
        "This scene shows a very simple weakness: the lack of locking, a USB key freely accessible. The attack does not always require advanced technique. In some cases, access starts with a desk left open and a password displayed in plain sight.",
      image: desktopImage,
      imageWidth: 4080,
      imageHeight: 3060,
      hotspots: [
        {
          id: "unlocked-computer",
          x: 2750,
          y: 1000,
          width: 900,
          height: 700,
          label: "Computer left on",
          explanation:
            "The computer is left on and logged in, which can allow an attacker to access sensitive information if the user steps away from the workstation.",
        },
        {
          id: "password-post-it-workstation",
          x: 1860,
          y: 460,
          width: 170,
          height: 260,
          label: "Password visible on a post-it",
          explanation:
            "The user's password is written on a post-it stuck next to the computer, which can allow an attacker to find it easily and access the user's account.",
        },
        {
          id: "usb-drive-unattended",
          x: 1960,
          y: 1420,
          width: 260,
          height: 160,
          label: "Freely accessible USB key",
          explanation:
            "A USB key is lying on the desk without supervision or security. It can be stolen and potentially sensitive data is therefore freely accessible.",
        },
      ],
    },
  ],
};
