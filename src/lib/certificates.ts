import type { Certificate } from "@/types/certificate";

const DRIVE_FILE_ID_PATTERNS = [
  /\/file\/d\/([^/]+)/, // https://drive.google.com/file/d/<id>/view
  /[?&]id=([^&]+)/, // https://drive.google.com/open?id=<id> or uc?id=<id>
];

/** Extracts the file id from a Google Drive share/open/uc URL, or null. */
export function extractDriveFileId(url: string): string | null {
  for (const pattern of DRIVE_FILE_ID_PATTERNS) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function isGoogleDriveUrl(url: string): boolean {
  return url.includes("drive.google.com");
}

/**
 * Resolves the best thumbnail we can show for a certificate:
 * 1. An explicit thumbnailUrl, if provided.
 * 2. An auto-derived Google Drive thumbnail, if fileUrl is a Drive link.
 * 3. null — the card renders an elegant category placeholder instead.
 */
export function resolveCertificateThumbnail(certificate: Certificate): string | null {
  if (certificate.thumbnailUrl) return certificate.thumbnailUrl;

  if (certificate.fileUrl && isGoogleDriveUrl(certificate.fileUrl)) {
    const fileId = extractDriveFileId(certificate.fileUrl);
    if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  return null;
}
