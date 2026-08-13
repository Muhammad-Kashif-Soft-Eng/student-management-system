import { useCallback } from "react";

import { useToastContext } from "@/components/ui/toast";

export function useToast() {
  const { pushToast, dismissToast } = useToastContext();

  const toast = useCallback(
    (options) => {
      pushToast({
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
        duration: options.duration ?? 3000,
      });
    },
    [pushToast]
  );

  return {
    toast,
    dismissToast,
  };
}
