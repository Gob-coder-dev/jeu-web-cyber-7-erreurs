import type { Scenario } from '../../../../src/types/GameData';

const socialPostImage = "/images/scenario4/tweet.png";
const trainWorkTempImage = "/images/scenario4/metro.jpg";
const wifiListImage = "/images/scenario4/wifi.png";
const wifiPhishingPortalImage = "/images/scenario4/wifi-phishing.png";

export const scenario4: Scenario = {
  id: "commute-security",
  title: "The commute that had ears",
  description:
    "The company Credo Agriculture is in crisis. A confidential document presented during a strategic meeting with an external contractor named Cedric Tset ended up in the hands of a competitor a few days later.\n\nCedric says he did not intentionally transmit anything.\n\nThe IT department finds no direct hacking on Credo Agriculture's servers. No internal account appears to have been forced. Yet the document did leave the circle of trust.\n\nYou will therefore retrace Cedric's movements to discover the cause of this problem.",
  globalAttackScenario:
    "Probable method of operation: the attacker began by identifying the contractor's trip thanks to a public post.\n\nDuring the commute, Cedric worked in a public space, with a confidential document visible on his screen. Someone nearby could have read or photographed important information.\n\nOnce on site, the contractor connected to a Wi-Fi network that looked like an official network. The captive portal then asked him for too much information, potentially including professional credentials.\n\nOnce the account was compromised, the attacker was able to recover the documents he wanted without the systems detecting him.\n\nInvestigation conclusion: the incident does not come from a direct attack against Credo Agriculture. It comes from a chain of negligence around an external partner: too much information published, a screen too visible, an unverified network, an overly curious portal, and a trusted account used as a relay.\n\nThe confidential document was not torn from a digital vault. It slipped between the seats of a train, the waves of a questionable Wi-Fi network, and the natural trust given to a contractor.\n\nGood reflex to remember\n\nWhen traveling, avoid displaying sensitive documents in public places, use a privacy filter, check Wi-Fi networks before connecting to them, and enable the company's VPN.",
  questions: [
    {
      id: "metro-complaint-social-post",
      title: "The metro complaint on social networks",
      instruction:
        "Before following Cedric's movements, you start by looking at his social networks. And you discover one of his posts from 2 weeks ago.",
      attackScenario:
        "The post was simply meant to complain about transport. But in an attacker's notebook, it becomes tracking. It gives a place, a date, and a target to reach a company. The attacker can simply go to this station and wait for Cedric to follow and spy on him.",
      image: socialPostImage,
      imageWidth: 822,
      imageHeight: 976,
      hotspots: [
        {
          id: "commute-place-visible",
          x: 430,
          y: 100,
          width: 140,
          height: 50,
          label: "Visible travel location",
          explanation:
            "In the image, you can clearly see where he is. This may refer to a station he often uses.",
        },
        {
          id: "commute-daily-work-complaint",
          x: 8,
          y: 150,
          width: 600,
          height: 40,
          label: "Complaint about not going to work",
          explanation:
            "In his comment, he complains about not being able to go to work. We therefore understand that he uses this transport every day to go to work.",
        },
      ],
    },
    {
      id: "working-in-public-transport",
      title: "Working on the train",
      instruction:
        "To retrace his route before the document theft, you take public transport with Cedric. During this trip, Cedric tells you that he absolutely has to work because, with this whole situation, he has fallen behind on his tasks. He therefore starts working next to you.",
      attackScenario:
        "Here, the attacker does not need malware. All he needs is a viewing angle, a discreet camera, or an inattentive person.\n\nMobile work is convenient, but it sometimes turns public transport into an open meeting room or an easy theft opportunity. A confidential document displayed on a train is no longer only in the contractor's hands; it is potentially in front of the entire carriage.",
      image: trainWorkTempImage,
      imageWidth: 1200,
      imageHeight: 758,
      // Temporary hotspots: the final image for this room is not available yet.
      hotspots: [
        {
          id: "public-transport-visible-screen",
          x: 490,
          y: 250,
          width: 310,
          height: 210,
          label: "Screen visible to passengers",
          explanation:
            "A computer used in a public place can expose information to everyone around. This is the principle of shoulder surfing.",
        },
        {
          id: "public-transport-unprotected-bag",
          x: 30,
          y: 450,
          width: 260,
          height: 240,
          label: "Bag placed on the floor without protection",
          explanation:
            "Cedric placed his bag containing company documents and hard drives on the floor without protection. A malicious person could steal them and recover all this information.",
        },
        {
          id: "public-transport-visible-badge",
          x: 815,
          y: 260,
          width: 180,
          height: 230,
          label: "Employee badge not put away",
          explanation:
            "Cedric's employee badge is completely visible on him. A stranger could steal his badge. A stranger could also photograph or discreetly scan the badge to make a fake card and break into the company.",
        },
      ],
    },
    {
      id: "wrong-wifi-network",
      title: "The end of the commute",
      instruction:
        "Once on site, Cedric tells us that he was late for his meeting because of yet another transport problem. He says he therefore quickly connected to the available Wi-Fi. You therefore look at his Wi-Fi history.",
      attackScenario:
        "The wrong Wi-Fi does not need to have a scary name. On the contrary, it must look ordinary. It must resemble the network that everyone chooses without thinking.\n\nIn a cyber investigation, appearances are often the best disguises. Here, the suspicious network forces no one to enter. It waits for someone to choose it.",
      image: wifiListImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "wifi-similar-network-names",
          x: 940,
          y: 395,
          width: 250,
          height: 40,
          label: "Wi-Fi networks with very similar names",
          explanation:
            "Several networks have almost identical names. An attacker can create a fake network resembling the real one to trap users in a hurry.",
        },
        {
          id: "wifi-open-network",
          x: 940,
          y: 430,
          width: 470,
          height: 120,
          label: "Unsecured network",
          explanation:
            "An open or poorly protected network increases the risk of interception or redirection to fake pages.",
        },
      ],
    },
    {
      id: "fake-wifi-captive-portal",
      title: "The overly curious portal",
      instruction:
        "After choosing the \"Credo Agriculture Free\" network, Cedric tells us he landed on an automatic login page. You therefore look at this login page.",
      attackScenario:
        "The portal did not only want to provide Internet access. It wanted to obtain information.\n\nThe contractor thought he was accessing Wi-Fi. In reality, even if he had internet access, the hacker could manipulate or read all the network traffic from his computer and collect professional information about his accounts and passwords.",
      image: wifiPhishingPortalImage,
      imageWidth: 1448,
      imageHeight: 1086,
      hotspots: [
        {
          id: "portal-suspicious-url",
          x: 470,
          y: 82,
          width: 655,
          height: 40,
          label: "Suspicious URL",
          explanation:
            "The page address does not clearly match the meeting place or an official service.",
        },
        {
          id: "portal-not-secure",
          x: 300,
          y: 82,
          width: 160,
          height: 40,
          label: "No HTTPS or questionable certificate",
          explanation:
            "An unsecured page that asks for personal or professional information should not be used.",
        },
        {
          id: "portal-intrusive-form",
          x: 305,
          y: 535,
          width: 830,
          height: 285,
          label: "Overly intrusive form",
          explanation:
            "Asking for professional email, password, phone number, company, and job title goes far beyond the need for guest Wi-Fi access.",
        },
        {
          id: "portal-pressing-message",
          x: 265,
          y: 320,
          width: 930,
          height: 100,
          label: "Pressing message",
          explanation:
            "Text that pushes the user to log in quickly to \"avoid session expiration\" uses pressure to reduce vigilance.",
        },
      ],
    },
  ],
};
