import { NextRequest, NextResponse } from 'next/server'
import { membersDb } from '@/lib/membersDb'

// GET /api/members - Get all members
export async function GET() {
  try {
    const members = membersDb.getAll()
    return NextResponse.json(members)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    )
  }
}

// POST /api/members - Create a new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'name',
      'dob',
      'idNumber',
      'dateJoined',
      'region',
      'city',
      'car',
      'carType',
      'nationality',
      'contactNumber',
    ]

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const newMember = membersDb.create({
      name: body.name,
      dob: body.dob,
      idNumber: body.idNumber,
      dateJoined: body.dateJoined,
      region: body.region,
      city: body.city,
      car: body.car,
      carType: body.carType,
      nationality: body.nationality,
      contactNumber: body.contactNumber,
      email: body.email || '',
      status: body.status || 'active',
    })

    return NextResponse.json(newMember, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create member' },
      { status: 500 }
    )
  }
}
