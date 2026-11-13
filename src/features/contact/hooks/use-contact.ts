/**
 * @fileoverview Contact Custom Hook
 * @module features/contact/hooks/use-contact
 */

"use client";

import { useState } from "react";
import type { EnrollmentEnquiry, EnquiryResponse } from "../types";
import { submitEnrollmentEnquiry } from "../services";

export function useContact() {
  const [response, setResponse] = useState<EnquiryResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendEnquiry(enquiry: EnrollmentEnquiry) {
    setIsSubmitting(true);
    try {
      const res = await submitEnrollmentEnquiry(enquiry);
      setResponse(res);
    } catch {
      setResponse({
        success: false,
        message: "Failed to submit enquiry. Please try WhatsApp or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return { response, isSubmitting, sendEnquiry };
}
