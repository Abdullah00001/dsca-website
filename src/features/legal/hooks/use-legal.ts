/**
 * @fileoverview Legal Custom Hook
 * @module features/legal/hooks/use-legal
 */

"use client";

import { useEffect, useState } from "react";
import type { LegalDocument } from "../types";
import { getLegalDocument } from "../services";

export function useLegal(documentType: "privacy" | "terms") {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        setIsLoading(true);
        const data = await getLegalDocument(documentType);
        if (mounted) {
          setDocument(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load document");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [documentType]);

  return { document, isLoading, error };
}
