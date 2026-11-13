/**
 * @fileoverview Contact Domain Types
 * @module features/contact/types
 */

export interface ContactItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface ContactState {
  items: ContactItem[];
  isLoading: boolean;
  error: string | null;
}
