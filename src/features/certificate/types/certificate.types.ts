/**
 * @fileoverview Certificate Domain Types
 * @module features/certificate/types
 */

export interface CertificateRecord {
  certificateNumber: string;
  studentName: string;
  courseName: string;
  duration: string;
  issueDate: string;
  accreditation: string;
  status: "verified" | "revoked";
}

export interface VerificationResult {
  success: boolean;
  certificate?: CertificateRecord;
  error?: string;
}

export interface CertificateState {
  searchQuery: string;
  result: VerificationResult | null;
  isLoading: boolean;
}
