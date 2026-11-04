// Owner Configuration — wired outside the visible app.
// No settings UI, gear icon, or config screen is shown to the user.
export interface OwnerConfig {
  sheetsUrl: string;
  whatsappNumber: string;
  apkDownloadUrl: string;
}

// The owner config can be set here or retrieved from a hidden storage key.
// It is completely invisible to the questionnaire user.
export const DEFAULT_OWNER_CONFIG: OwnerConfig = {
  sheetsUrl: '', // Google Apps Script Web App URL
  whatsappNumber: '', // WhatsApp recipient phone e.g. '15551234567'
  apkDownloadUrl: '/screen-habits-companion.apk' // Real built companion APK
};

const HIDDEN_CONFIG_KEY = '_screen_habits_owner_internal_cfg';

export function getInternalOwnerConfig(): OwnerConfig {
  try {
    const raw = localStorage.getItem(HIDDEN_CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        sheetsUrl: parsed.sheetsUrl !== undefined ? parsed.sheetsUrl : DEFAULT_OWNER_CONFIG.sheetsUrl,
        whatsappNumber: parsed.whatsappNumber !== undefined ? parsed.whatsappNumber : DEFAULT_OWNER_CONFIG.whatsappNumber,
        apkDownloadUrl: parsed.apkDownloadUrl !== undefined ? parsed.apkDownloadUrl : DEFAULT_OWNER_CONFIG.apkDownloadUrl
      };
    }
  } catch {
    // fallback silently
  }
  return DEFAULT_OWNER_CONFIG;
}

export function setInternalOwnerConfig(config: Partial<OwnerConfig>): void {
  try {
    const current = getInternalOwnerConfig();
    localStorage.setItem(HIDDEN_CONFIG_KEY, JSON.stringify({ ...current, ...config }));
  } catch {
    // fallback silently
  }
}
