type AnalyticsProperty = string | number | boolean | null | undefined;

const POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

let posthogPromise: Promise<typeof import("posthog-js").default | null> | null = null;

const getPostHog = () => {
  if (!POSTHOG_KEY) return Promise.resolve(null);
  if (!posthogPromise) {
    posthogPromise = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        defaults: "2026-01-30",
      });
      return posthog;
    });
  }
  return posthogPromise;
};

export const captureAnalyticsEvent = (
  eventName: string,
  properties?: Record<string, AnalyticsProperty>,
) => {
  void getPostHog().then((posthog) => posthog?.capture(eventName, properties));
};
