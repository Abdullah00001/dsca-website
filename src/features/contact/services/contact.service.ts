/**
 * @fileoverview Contact Service Layer
 * @module features/contact/services
 */

import type { EnrollmentEnquiry, EnquiryResponse, AcademyContactInfo } from "../types";

export const ACADEMY_CONTACT_INFO: AcademyContactInfo = {
  address: "House 34/A, Indira Road, Farmgate (Kazi & Chitra Square, Lift-5, next to Kutubbag Darbar Sharif), Dhaka-1215",
  phone: "(+880) 1810-545545",
  whatsappNumber: "8801810545545",
  hours: "Saturday to Friday · 9:00 AM to 9:00 PM",
  email: "dhakaspecialtycoffeeacademy@gmail.com",
  mapEmbedUrl: "https://maps.google.com/?q=Dhaka+Specialty+Coffee+Academy",
};

export async function getContactInfo(): Promise<AcademyContactInfo> {
  return { ...ACADEMY_CONTACT_INFO };
}

/**
 * Submits student course enquiry.
 * Currently simulates network latency and returns a generated booking ref;
 * ready for seamless REST API integration.
 */
export async function submitEnrollmentEnquiry(enquiry: EnrollmentEnquiry): Promise<EnquiryResponse> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!enquiry.fullName || !enquiry.phone) {
    return {
      success: false,
      message: "Please provide your full name and phone number.",
    };
  }

  const randomRef = `DSCA-ENQ-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    success: true,
    message: "Thank you! Your request has been received. Our team will contact you via WhatsApp / Phone to confirm batch seat availability.",
    referenceId: randomRef,
  };
}
