// Simple authentication utility without external dependencies

export interface User {
  id: string
  name: string
  email: string
}

export async function verifyCredentials(username: string, password: string): Promise<User | null> {
  // Verify against environment variables
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return {
      id: "1",
      name: "Admin",
      email: "admin@portfolio.com",
    }
  }
  return null
}

export function setAuthCookie(user: User) {
  // Store auth token in localStorage (client-side only)
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_user", JSON.stringify(user))
    localStorage.setItem("auth_token", btoa(`${user.id}:${Date.now()}`))
  }
}

export function getAuthUser(): User | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("auth_user")
    const token = localStorage.getItem("auth_token")
    if (userStr && token) {
      return JSON.parse(userStr)
    }
  }
  return null
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_token")
  }
}

export function isAuthenticated(): boolean {
  return getAuthUser() !== null
}
