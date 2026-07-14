export interface NavItem {
  /** Section id the link scrolls to, e.g. "about" -> #about */
  id: string;
  label: string;
  href: `#${string}`;
}
