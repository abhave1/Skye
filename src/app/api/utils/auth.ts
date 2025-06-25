export async function authenticateRequest(req: Request) {
    const USER_PUBLIC_KEY = process.env.USER_PUBLIC_KEY!;
    const SERVER_SECRET_KEY = process.env.SERVER_SECRET_KEY!;
    const ACTUAL_HASH = process.env.ACTUAL_HASH!;

  
    const authHeader = req.headers.get('authorization');

    let userKey = null;
  
    if (authHeader && authHeader.startsWith('Bearer ')) {
      userKey = authHeader.slice(7);
    }


    if (!userKey) {
      return { authorized: false, reason: 'Unauthorized: Missing userKey' };
    }
  
    if (userKey !== USER_PUBLIC_KEY) {
      return { authorized: false, reason: 'Unauthorized: Invalid userKey' };
    }
  
    // Validate hash
    const expectedHash = await hashKeys(userKey, SERVER_SECRET_KEY);
    if (expectedHash !== ACTUAL_HASH) {
      return { authorized: false, reason: 'Unauthorized: Invalid Key' };
    }
    
    return { authorized: true };
  }
  
  // You can use your hashKeys function here as well
  async function hashKeys(userKey: string, serverKey: string) {
    const data = new TextEncoder().encode(userKey + serverKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  }