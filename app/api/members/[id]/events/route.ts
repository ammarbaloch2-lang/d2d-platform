import { NextRequest, NextResponse } from 'next/server'
import { memberEventsDb } from '@/lib/membersDb'

// GET /api/members/[id]/events - Get all events for a member
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const memberEvents = memberEventsDb.getByMemberId(params.id)
    return NextResponse.json(memberEvents)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch member events' },
      { status: 500 }
    )
  }
}
