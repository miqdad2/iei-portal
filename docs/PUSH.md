# Push plan (Expo → FCM/APNs)

1. EC publishes event/notice/job → Postgres insert.
2. Edge/worker (self-hosted) selects subscribed tokens in `push_tokens`.
3. Worker posts to Expo Push service → FCM (Android) / APNs (iOS).
4. App opens deep link: `ieikuwait://events/{id}`.

Required later: `google-services.json`, `GoogleService-Info.plist`,
APNs key, `expo-notifications` + config plugin, worker secrets.
Hook: `packages/api-client/src/push.ts` → `usePushToken()`.
