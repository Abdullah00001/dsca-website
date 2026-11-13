/**
 * @fileoverview Contact & Enrollment Domain Types
 * @module features/contact/types
 */

export interface EnrollmentEnquiry {
  fullName: string;
  phone: string;
  email?: string;
  courseId: string;
  notes?: string;
  preferredBatchMonth?: string;
  questions?: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
  referenceId?: string;
}

export interface AcademyContactInfo {
  address: string;
  phone: string;
  whatsappNumber: string;
  hours: string;
  email: string;
  mapEmbedUrl: string;
}
