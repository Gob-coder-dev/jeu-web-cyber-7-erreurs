import type { Scenario } from '../../../../src/types/GameData';

export const scenario4: Scenario = {
  "id": "commute-security",
  "title": "The commute that had ears",
  "description": "Credo Agriculture is in crisis. A confidential document presented during a strategic meeting with an external contractor named Cedric Tset ended up in the hands of a competitor a few days later.\n\nCedric says he did not intentionally transmit anything.\n\nThe IT department finds no direct hacking on Credo Agriculture's servers. No internal account seems to have been forced. Yet the document did leave the circle of trust.\n\nYou will therefore retrace Cedric's movements to discover the cause of this problem.",
  "globalAttackScenario": "Probable method of operation: the attacker began by identifying the contractor's trip through a public post.\n\nDuring the commute, Cedric worked in a public space with a confidential document visible on his screen. Someone nearby could have read or photographed important information.\n\nOnce on site, the contractor connected to a Wi-Fi network that looked like an official network. The captive portal then asked him for too much information, potentially including professional credentials.\n\nOnce the account was compromised, the attacker could recover the documents they wanted without the systems detecting it.\n\nGood practice to remember\n\nWhen traveling, avoid displaying sensitive documents in public places, use a privacy filter, check Wi-Fi networks before connecting to them, and enable the company's VPN.",
  "questions": [
    {
      "id": "metro-complaint-social-post",
      "title": "The subway complaint on social media",
      "instruction": "Before following Cedric's movements, you start by looking at his social networks. You discover one of his posts from two weeks ago.",
      "attackScenario": "The post was simply meant to complain about public transport. But for an attacker who wants to track him, it is a gold mine of information. It gives a place, a date, and a target to reach a company. The attacker can simply go to this station and wait for Cedric to follow and spy on him.",
      "image": "/images/en/scenario4/tweet.png",
      "imageWidth": 822,
      "imageHeight": 976,
      "hotspots": [
        {
          "id": "commute-place-visible",
          "x": 430,
          "y": 100,
          "width": 140,
          "height": 50,
          "label": "Visible commute location",
          "explanation": "Cedric clearly says he uses metro line 6, and with the image added, it is clear which station he goes through every morning and evening, making it possible to follow him."
        },
        {
          "id": "commute-daily-work-complaint",
          "x": 8,
          "y": 150,
          "width": 600,
          "height": 40,
          "label": "Complaint about not being able to go to work",
          "explanation": "In his comment, he complains about not being able to go to work. We therefore understand that he uses this transport every day to go to work."
        },
        {
          "id": "tweet-send-time",
          "x": 4,
          "y": 780,
          "width": 230,
          "height": 45,
          "label": "Sending time",
          "explanation": "The tweet's sending time clearly shows that Cedric sent it during his commute to work. We therefore know when to find him in public transport."
        }
      ]
    },
    {
      "id": "working-in-public-transport",
      "title": "Working on the train",
      "instruction": "To retrace his route before the document theft, you take public transport with Cedric. During this trip, Cedric tells you that he absolutely has to work because, with everything that happened, he is behind on his tasks. He therefore starts working next to you.",
      "attackScenario": "With the right viewing angle, a camera, or an inattentive person, a stranger can access a lot of information.\n\nMobile work is convenient, but it can sometimes turn transport into an open meeting room or an easy theft opportunity. A confidential document displayed on a train is no longer only in the contractor's hands; it is in front of the whole carriage.",
      "image": "/images/en/scenario4/metro.jpg",
      "imageWidth": 4080,
      "imageHeight": 3060,
      "hotspots": [
        {
          "id": "public-transport-visible-screen",
          "x": 1970,
          "y": 200,
          "width": 870,
          "height": 760,
          "label": "Screen visible to passengers",
          "explanation": "A computer used in a public place can expose information to everyone nearby. This is the principle of shoulder surfing."
        },
        {
          "id": "public-transport-unprotected-bag",
          "x": 2320,
          "y": 1780,
          "width": 900,
          "height": 880,
          "label": "Unprotected bag placed on the floor",
          "explanation": "Cedric placed his bag containing company documents and hard drives on the floor without protection. A malicious person could steal them and recover all this information."
        },
        {
          "id": "public-transport-visible-badge",
          "x": 1750,
          "y": 1920,
          "width": 430,
          "height": 360,
          "label": "Employee badge not put away",
          "explanation": "Cedric's employee badge is completely visible on him. A stranger could steal his badge, photograph it, or discreetly scan it to make a fake card and enter the company."
        }
      ]
    },
    {
      "id": "wrong-wifi-network",
      "title": "The end of the trip",
      "instruction": "Once on site, Cedric tells us that he was late to his meeting because of yet another transport problem. He says he therefore quickly connected to the available Wi-Fi. You then check his Wi-Fi history.",
      "attackScenario": "A network that everyone chooses without thinking and that seems ordinary. Because Cedric was in a hurry, he picked a network without paying much attention to the details and connected to a completely open rogue network.",
      "image": "/images/en/scenario4/wifi.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "wifi-similar-network-names",
          "x": 940,
          "y": 395,
          "width": 250,
          "height": 40,
          "label": "Wi-Fi networks with very similar names",
          "explanation": "Several networks have almost identical names. An attacker can create a fake network that looks like the real one to trap users in a hurry."
        },
        {
          "id": "wifi-open-network",
          "x": 940,
          "y": 430,
          "width": 470,
          "height": 120,
          "label": "Unsecured network",
          "explanation": "An open or poorly protected network increases the risks of interception or redirection to fake pages."
        }
      ]
    },
    {
      "id": "fake-wifi-captive-portal",
      "title": "The portal that was too curious",
      "instruction": "After choosing the \"Credo Agriculture Free\" network, Cedric says he landed on an automatic login page. You therefore look at this login page.",
      "attackScenario": "The portal did not only want to provide internet access. It wanted to obtain information.\n\nThe contractor thought he was accessing Wi-Fi. In reality, even if he had internet access, the hacker could manipulate or read all network traffic from his computer and collect professional information and documents.",
      "image": "/images/en/scenario4/wifi-phishing.png",
      "imageWidth": 1448,
      "imageHeight": 1086,
      "hotspots": [
        {
          "id": "portal-professional-password-request",
          "x": 305,
          "y": 590,
          "width": 830,
          "height": 60,
          "label": "Request for the professional password",
          "explanation": "A Wi-Fi portal has no reason to ask for the password of a professional account. This is a major warning sign."
        },
        {
          "id": "portal-suspicious-url",
          "x": 470,
          "y": 82,
          "width": 655,
          "height": 40,
          "label": "Suspicious URL",
          "explanation": "The page address does not clearly match the meeting location or an official service. The overly long link is clumsy."
        },
        {
          "id": "portal-not-secure",
          "x": 300,
          "y": 82,
          "width": 160,
          "height": 40,
          "label": "No HTTPS or doubtful certificate",
          "explanation": "An unsecured page that asks for personal or professional information should not be used."
        },
        {
          "id": "portal-intrusive-form",
          "x": 305,
          "y": 535,
          "width": 830,
          "height": 285,
          "label": "Overly intrusive form",
          "explanation": "Asking for a professional email address, phone number, company, and job title goes far beyond the need for guest Wi-Fi access."
        },
        {
          "id": "portal-pressing-message",
          "x": 265,
          "y": 320,
          "width": 930,
          "height": 100,
          "label": "Pressing message",
          "explanation": "Text that pushes the user to connect quickly to \"avoid session expiration\" uses pressure to reduce vigilance."
        }
      ]
    }
  ]
};
