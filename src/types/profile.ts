export interface QuickFact {
  label: string;
  value: string;
}

export interface ProfileData {
  fullName: string;
  displayName: string;

  /** Rotating titles shown under the name in the Hero. */
  titles: string[];

  tagline: string;

  /** 3–4 line hero introduction. */
  heroIntro: string;

  /** Longer About section biography, one entry per paragraph. */
  aboutParagraphs: string[];

  quickFacts: QuickFact[];

  hobbies: string[];

  location: {
    present: string;
    permanent: string;
  };

  cvUrl: string;

  /**
   * Hero profile image
   * Example:
   * /assets/profile/profile.jpg
   */
  profileImageSrc: string | null;

  /**
   * About section image
   * Example:
   * /assets/profile/about.webp
   */
  aboutImageSrc: string | null;

  /**
   * Hero cover image
   * Example:
   * /assets/profile/cover.webp
   */
  coverImageSrc: string | null;
}