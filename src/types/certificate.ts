export type CertificateCategory =
  | "Academic"
  | "Programming"
  | "Competition"
  | "Workshop"
  | "Training"
  | "Seminar"
  | "Others";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** e.g. "2026" or "March 2026" */
  date: string;
  category: CertificateCategory;
  /**
   * Where the certificate opens when clicked — a direct file path
   * (public/assets/certificates/...) or a Google Drive share link
   * (https://drive.google.com/file/d/<id>/view). Required for a card
   * to be clickable; omit while a certificate is only announced but
   * not yet uploaded.
   */
  fileUrl: string | null;
  /**
   * Optional explicit thumbnail. If omitted and fileUrl is a Google
   * Drive link, a thumbnail is derived automatically — see
   * src/lib/certificates.ts.
   */
  thumbnailUrl?: string | null;
  description?: string;
}
