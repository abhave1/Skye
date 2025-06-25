export async function hashKeys(userKey: string, serverKey: string) {
    const data = new TextEncoder().encode(userKey + serverKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }