/**
 * Utilitaires de sécurité
 */

/**
 * Échappe les caractères HTML pour prévenir les injections XSS
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
