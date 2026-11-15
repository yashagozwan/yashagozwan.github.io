import type { User } from 'firebase/auth'

/**
 * Checks if the user is authenticated specifically using Email & Password credentials.
 * Users signed in via Google or other social providers are strictly disallowed from admin areas.
 */
export function isPasswordAuthenticatedAdmin(user: User | null): boolean {
  if (!user) return false

  // Must have at least one provider and it must be 'password' (Email & Password)
  const hasPasswordProvider = user.providerData.some(
    (provider) => provider.providerId === 'password'
  )

  return hasPasswordProvider
}
