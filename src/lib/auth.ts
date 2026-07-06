export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
  created_at?: string | null;
};

export type AuthSession = {
  token: string;
  user: AuthUser;
};

const AUTH_STORAGE_KEY = "capital-engineering-auth";

export function getAuthSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession) as AuthSession;
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function saveAuthSession(session: AuthSession): void {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("auth-session-changed"));
}

export function clearAuthSession(): void {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("auth-session-changed"));
}
