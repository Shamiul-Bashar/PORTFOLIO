import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";
import { SiCodeforces } from "react-icons/si";
import { MdEmail } from "react-icons/md";

import type { SocialLink } from "@/types/social";

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/Shamiul-Bashar",
    icon: FaGithub,
    tooltip: "View my GitHub profile",
    displayOrder: 1,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/shamiulbasher",
    icon: FaLinkedin,
    tooltip: "Connect with me on LinkedIn",
    displayOrder: 2,
  },
  {
    id: "codeforces",
    name: "Codeforces",
    url: "https://codeforces.com/profile/Shamiul_Bashar",
    icon: SiCodeforces,
    tooltip: "View my Codeforces profile",
    displayOrder: 3,
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:siambasher@gmail.com",
    icon: MdEmail,
    tooltip: "Send me an email",
    displayOrder: 4,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/8801521729325",
    icon: FaWhatsapp,
    tooltip: "Chat with me on WhatsApp",
    displayOrder: 5,
  },
  {
    id: "facebook",
    name: "Facebook",
    url: "https://www.facebook.com/share/1B8BFgCfYB/",
    icon: FaFacebook,
    tooltip: "Visit my Facebook profile",
    displayOrder: 6,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/siam_bashar?igsh=MTQ2OTEybDA0dmVidg==",
    icon: FaInstagram,
    tooltip: "Follow me on Instagram",
    displayOrder: 7,
  },
];