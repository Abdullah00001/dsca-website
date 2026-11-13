/**
 * @fileoverview Legal Service Layer
 * @module features/legal/services
 */

import type { LegalDocument } from "../types";

const PRIVACY_POLICY: LegalDocument = {
  type: "privacy",
  title: "Privacy policy",
  subtitle: "How we collect, use and protect your personal information when you contact or train with Dhaka Specialty Coffee Academy.",
  lastUpdated: "October 2026",
  sections: [
    {
      title: "Information we collect",
      body: "We collect your name, phone number, email address and course preferences when you message us, fill an enrollment form or call the academy.",
    },
    {
      title: "How we use it",
      body: "We use your details to answer your inquiry, confirm your batch, issue and verify your certificate, send updates you asked for and improve our training.",
    },
    {
      title: "Sharing",
      body: "We do not sell your personal information. We share it only with service providers who help us run the academy, and where the law requires it.",
    },
    {
      title: "Cookies",
      body: "Our website uses essential cookies and privacy-conscious analytics. You can block cookies in your browser without losing the ability to enroll.",
    },
    {
      title: "Your rights",
      body: "You may ask to see, correct or delete the personal information we hold about you. Contact us and we will respond within a reasonable time.",
    },
    {
      title: "Contact",
      body: "Dhaka Specialty Coffee Academy, House 34/A, Indira Road, Farmgate, Dhaka-1215. Phone and WhatsApp (+880) 1810-545545.",
    },
  ],
};

const TERMS_CONDITIONS: LegalDocument = {
  type: "terms",
  title: "Terms and conditions",
  subtitle: "Please read these terms before enrolling in a course at Dhaka Specialty Coffee Academy.",
  lastUpdated: "October 2026",
  sections: [
    {
      title: "Enrollment",
      body: "A seat is confirmed once DSCA acknowledges your request and receives the course fee or agreed advance. Batches are limited to 12 students and seats are allocated in order of confirmation.",
    },
    {
      title: "Fees and payment",
      body: "Fees are listed in Bangladeshi Taka. Promotional prices apply for the period shown. Fees cover practice materials and your completion certificate unless stated otherwise.",
    },
    {
      title: "Attendance",
      body: "Practical skills are built session by session, so regular attendance is expected. Missed sessions may be made up in a later batch at our discretion.",
    },
    {
      title: "Certificates",
      body: "A DSCA completion certificate is issued after you complete the course and any practical assessment. Each certificate carries a number that can be verified on our website.",
    },
    {
      title: "Cancellations and refunds",
      body: "Contact us as early as possible if you cannot attend. Where a refund or transfer is possible we will confirm the terms in writing before the batch begins.",
    },
    {
      title: "Conduct and safety",
      body: "Students are expected to treat trainers, classmates and equipment with care and follow hygiene and safety instructions.",
    },
    {
      title: "Changes",
      body: "We may update these terms from time to time. The date at the top shows when they last changed.",
    },
  ],
};

export async function getLegalDocument(type: "privacy" | "terms"): Promise<LegalDocument> {
  return type === "privacy" ? { ...PRIVACY_POLICY } : { ...TERMS_CONDITIONS };
}
