export async function hashPasswordToHex(plainTextPassword) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hex;
}

export function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}