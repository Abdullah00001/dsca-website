/**
 * @fileoverview Certificate Custom Hook
 * @module features/certificate/hooks/use-certificate
 */

"use client";

import { useState } from "react";
import type { VerificationResult } from "../types";
import { verifyCertificate } from "../services";

export function useCertificate() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function checkCertificate(serial: string) {
    if (!serial.trim()) return;
    setIsLoading(true);
    try {
      const data = await verifyCertificate(serial);
      setResult(data);
    } catch {
      setResult({
        success: false,
        error: "Verification service temporarily unavailable. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { result, isLoading, checkCertificate };
}
