/**
 * Tiny typed wrapper over `localStorage` — the app's "local DB".
 * All keys are namespaced so they don't collide with anything else on the origin.
 * Every call is defensive: quota errors, disabled storage (private mode) and
 * corrupt JSON all fall back gracefully instead of throwing.
 */
const PREFIX = 'hrflow:'

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw == null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // Ignore write failures (quota exceeded / storage disabled).
  }
}

export function removeKey(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key)
  } catch {
    // Ignore.
  }
}
