import type { IconType } from "react-icons";

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: IconType;
  /** Shown in the hover tooltip, e.g. "Follow on GitHub". */
  tooltip: string;
  displayOrder: number;
}
