
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/auth-config';
import { prisma } from '../../../../lib/db';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const profileId = params.id;

    // Verify profile belongs to user
    const existingProfile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: session.user.id,
      },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { error: 'Profile not found or not authorized' },
        { status: 404 }
      );
    }

    // Update profile
    const updatedProfile = await prisma.profile.update({
      where: { id: profileId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const profileId = params.id;

    // Verify profile belongs to user
    const existingProfile = await prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: session.user.id,
      },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { error: 'Profile not found or not authorized' },
        { status: 404 }
      );
    }

    // Delete profile
    await prisma.profile.delete({
      where: { id: profileId },
    });

    return NextResponse.json({
      message: 'Profile deleted successfully',
    });
  } catch (error) {
    console.error('Profile deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
