/**
 * @fileoverview Certificate Domain Types
 * @module features/certificate/types
 */

export interface CertificateItem {
  id: string;
  name: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface CertificateState {
  items: CertificateItem[];
  isLoading: boolean;
  error: string | null;
}
