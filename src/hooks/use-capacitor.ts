"use client";

import { useCallback } from "react";

import { Clipboard as CapClipboard } from "@capacitor/clipboard";
import { Share as CapShare } from "@capacitor/share";

import { useCapacitor } from "@/components/capacitor-provider";

export function useClipboard() {
  const { isNative } = useCapacitor();

  const write = useCallback(
    async (text: string) => {
      if (isNative) {
        await CapClipboard.write({ string: text });
      } else {
        await navigator.clipboard.writeText(text);
      }
    },
    [isNative],
  );

  return { write };
}

export function useShare() {
  const { isNative } = useCapacitor();

  const share = useCallback(
    async (options: { title?: string; text?: string; url?: string }) => {
      if (isNative) {
        await CapShare.share(options);
      } else if (navigator.share) {
        await navigator.share(options);
      }
    },
    [isNative],
  );

  return { share };
}
