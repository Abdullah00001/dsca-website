/**
 * @fileoverview Certificate Custom Hook
 * @module features/certificate/hooks/use-certificate
 */

"use client";

import { useEffect, useState } from "react";
import type { CertificateItem } from "../types";
import { getCertificateItems } from "../services";

export function useCertificate() {
  const [items, setItems] = useState<CertificateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getCertificateItems();
        if (mounted) {
          setItems(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load certificate data");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    items,
    isLoading,
    error,
  };
}
