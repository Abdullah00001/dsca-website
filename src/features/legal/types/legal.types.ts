/**
 * @fileoverview Legal Domain Types
 * @module features/legal/types
 */

export interface LegalItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface LegalState {
  items: LegalItem[];
  isLoading: boolean;
  error: string | null;
}
