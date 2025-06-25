export function getUserKeyFromRequest(req: Request) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }
    return null;
  }
  
export function validateUserKey(userKey: string | null) {
    const USER_PUBLIC_KEY = process.env.USER_PUBLIC_KEY!;
    return userKey === USER_PUBLIC_KEY;
  }