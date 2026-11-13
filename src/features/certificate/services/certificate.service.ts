/**
 * @fileoverview Certificate Service Layer
 * @module features/certificate/services
 */

import type { VerificationResult, CertificateRecord } from "../types";

const MOCK_CERTIFICATES: Record<string, CertificateRecord> = {
  "DSCA-2026-0001": {
    certificateNumber: "DSCA-2026-0001",
    studentName: "Sample Student",
    courseName: "Barista Professional",
    duration: "10 days",
    issueDate: "14 March 2026",
    accreditation: "ISO 9001:2015",
    status: "verified",
  },
  "DSCA-2026-0002": {
    certificateNumber: "DSCA-2026-0002",
    studentName: "Sudipta Stanly Palma",
    courseName: "Barista Advance Professional",
    duration: "22 days",
    issueDate: "28 February 2026",
    accreditation: "ISO 9001:2015",
    status: "verified",
  },
  "DSCA-2026-0003": {
    certificateNumber: "DSCA-2026-0003",
    studentName: "Aynul Islam",
    courseName: "Barista Professional",
    duration: "10 days",
    issueDate: "10 January 2026",
    accreditation: "ISO 9001:2015",
    status: "verified",
  },
};

/**
 * Validates a certificate serial number against records.
 */
export async function verifyCertificate(serialNumber: string): Promise<VerificationResult> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  const sanitized = serialNumber.trim().toUpperCase();

  const record = MOCK_CERTIFICATES[sanitized];
  if (record) {
    return {
      success: true,
      certificate: { ...record },
    };
  }

  return {
    success: false,
    error: "No certificate found matching this serial number. Please check the spelling or contact DSCA directly.",
  };
}
