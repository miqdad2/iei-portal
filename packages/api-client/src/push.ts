import { useEffect, useState } from "react";

/**
 * Push-ready hook (Expo Push → FCM/APNs).
 * Self-hosted worker sends to Expo push service; token registered in `push_tokens`.
 * Returns token or setup hint — no network call until configured.
 */
export function usePushToken(): { token: string | null; hint: string } {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    // Next: Notifications.getExpoPushTokenAsync() behind config-plugin + permission.
    setToken(null);
  }, []);
  return { token, hint: "Push worker + FCM/APNs keys required (see docs/PUSH.md)." };
}
