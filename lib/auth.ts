import crypto from 'crypto'

// IMPORTANT: Change this password in production!
// Store in environment variable: ADMIN_PASSWORD
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'QCFinance2026!'

// Generate a simple token
export function generateToken(password: string): string {
  const secret = process.env.JWT_SECRET || 'qcfinance-secret-key-2026'
  return crypto
    .createHmac('sha256', secret)
    .update(password + Date.now())
    .digest('hex')
}

// Verify token
export function verifyToken(token: string): boolean {
  // Simple verification - in production use JWT
  return !!(token && token.length === 64)
}

// Check if user is authenticated (client-side)
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const token = localStorage.getItem('admin_token')
  return token ? verifyToken(token) : false
}

// Save token (client-side)
export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token)
  }
}

// Remove token (client-side)
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token')
  }
}

// Logout helper (alias for removeToken)
export function logout(): void {
  removeToken()
}
