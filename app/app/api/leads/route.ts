
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { name, email, profession, message, source } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check for existing lead with same email
    const existingLead = await prisma.lead.findFirst({
      where: { email }
    });

    if (existingLead) {
      // Update existing lead
      const updatedLead = await prisma.lead.update({
        where: { id: existingLead.id },
        data: {
          name,
          profession: profession || existingLead.profession,
          message: message || existingLead.message,
          source: source || existingLead.source,
          updatedAt: new Date(),
        },
      });

      return NextResponse.json({
        message: 'Lead updated successfully',
        lead: updatedLead,
      });
    }

    // Create new lead
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        profession,
        message,
        source: source || 'unknown',
      },
    });

    return NextResponse.json({
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const profession = searchParams.get('profession');

    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (profession) where.profession = profession;

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.lead.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Leads fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
