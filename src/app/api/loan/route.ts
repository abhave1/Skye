import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { creditScore } = body;

  if (creditScore === undefined) {
    return NextResponse.json({ error: 'Credit score is required' }, { status: 400 });
  }

  const score = Number(creditScore);

  if (isNaN(score) || score < 300 || score > 850) {
    return NextResponse.json({ error: 'Invalid credit score' }, { status: 400 });
  }

  let loanAmount = 'Not eligible for SBA Express loan';
  if (score >= 680) {
    loanAmount = 'Greater than $150,000';
  } else if (score >= 650) {
    loanAmount = 'Greater than $150,000';
  } else if (score >= 600) {
    loanAmount = 'Between $30,000 and $150,000';
  }

  return NextResponse.json({ loanAmount }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
