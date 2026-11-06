import { carromCrestPrivacyHtml } from "./carrom-crest-privacy";

/**
 * Each game's own privacy policy, by slug. Kept apart from content/games.ts so
 * these long texts are never sent to the browser with the navigation.
 */
export const gamePrivacyPolicies: Record<string, string> = {
  "carrom-crest": carromCrestPrivacyHtml,
};
