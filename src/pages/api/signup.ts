// pages/api/signup.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Example: Use a secret from your environment variables
  const secret = process.env.MY_SECRET_KEY;

  // TODO: Add your backend logic here (e.g., save to DB, call Supabase, etc.)

  return res.status(200).json({ message: 'Signup successful!' });
}