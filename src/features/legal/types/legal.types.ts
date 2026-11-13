/**
 * @fileoverview Legal Domain Types
 * @module features/legal/types
 */

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalDocument {
  type: "privacy" | "terms";
  title: string;
  subtitle: string;
  sections: LegalSection[];
  lastUpdated: string;
}
