export const COOKIE_CONSENT_STORAGE_KEY = 'app-cookie-consent-v1';
export const COOKIE_CONSENT_OPEN_EVENT_NAME = 'app:open-cookie-settings';
export const COOKIE_CONSENT_CHANGE_EVENT_NAME = 'app:cookie-consent-changed';

export type CookieConsentStatus = 'accepted' | 'rejected';
export type CookieConsentSnapshot = CookieConsentStatus | null | 'pending';

export function isCookieConsentStatus(value: string | null): value is CookieConsentStatus {
  return value === 'accepted' || value === 'rejected';
}

export function getCookieConsentSnapshot(): CookieConsentSnapshot {
  if (typeof window === 'undefined') {
    return 'pending';
  }

  const savedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

  return isCookieConsentStatus(savedConsent) ? savedConsent : null;
}

export function getServerCookieConsentSnapshot(): CookieConsentSnapshot {
  return 'pending';
}

export function subscribeCookieConsent(listener: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  function handleStorage(event: StorageEvent) {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) {
      listener();
    }
  }

  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT_NAME, listener);
  window.addEventListener('storage', handleStorage);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT_NAME, listener);
    window.removeEventListener('storage', handleStorage);
  };
}

export function setCookieConsent(status: CookieConsentStatus) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
  window.dispatchEvent(new Event(COOKIE_CONSENT_CHANGE_EVENT_NAME));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT_NAME));
}
