import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Insert into the signups table
  const { error } = await supabase
    .from('signups')
    .insert([{ email }]);

  if (error) {
    console.error('Supabase insert error:', error);
    if (error.code === '23505') {
      return NextResponse.json({ error: 'You already signed up' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  return NextResponse.json({ message: 'Signup successful!' }, { status: 200 });
}

// Optionally, handle other methods
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}