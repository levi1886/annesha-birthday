import { DEFAULT_GIFT_CONFIG, GiftConfig } from '../types/gift';

const STORAGE_KEY = 'heartfelt_birthday_gift_v1';

export function saveLocalGiftConfig(config: GiftConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.warn('Failed to save gift config', e);
  }
}

export function loadGiftConfig(): GiftConfig {
  // Clear any legacy cached template data from localStorage or hash
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname);
      }
    }
  } catch (e) {
    console.warn('Storage cleanup notice', e);
  }

  // Dedicated single-use gift config for Annesha from Shubham Jha
  return DEFAULT_GIFT_CONFIG;
}

export function generateShareableUrl(_config?: any): string {
  return typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
}

