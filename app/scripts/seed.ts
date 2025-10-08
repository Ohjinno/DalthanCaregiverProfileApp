
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seed...');

  // Create test user
  const testPassword = await bcrypt.hash('johndoe123', 12);
  
  const testUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john@doe.com',
      password: testPassword,
    },
  });

  console.log('Created test user:', testUser.email);

  // Create sample profile for test user
  const existingProfile = await prisma.profile.findFirst({
    where: { userId: testUser.id }
  });

  let sampleProfile;
  if (!existingProfile) {
    sampleProfile = await prisma.profile.create({
      data: {
      userId: testUser.id,
      profession: 'Caregiver',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      phone: '(555) 123-4567',
      address: '123 Care Street',
      city: 'Healthcare City',
      state: 'CA',
      zipCode: '90210',
      bio: 'Compassionate and dedicated caregiver with over 5 years of experience providing exceptional care to elderly clients. Committed to enhancing the quality of life for those in need through personalized care plans and emotional support.',
      experience: 'Worked with elderly clients with various conditions including dementia, mobility issues, and post-surgery recovery. Experienced in medication management, personal care assistance, and companionship.',
      education: 'Certified Nursing Assistant (CNA) from Healthcare Institute, CPR and First Aid Certified',
      certifications: 'CNA License #12345, CPR Certification, First Aid Certification, Alzheimer\'s Care Training',
      skills: ['Elderly Care', 'Medication Management', 'Personal Care', 'Companionship', 'Mobility Assistance'],
      availability: ['Full-time', 'Weekends', 'Overnight'],
      hourlyRate: '25',
      yearsExperience: 5,
      languages: ['English', 'Spanish'],
      references: [
        {
          name: 'Mary Johnson',
          position: 'Care Coordinator',
          company: 'Senior Care Services',
          phone: '(555) 987-6543',
          email: 'mary@seniorcare.com',
          relationship: 'Former Supervisor'
        }
      ],
      templateStyle: 'modern',
      isComplete: true,
      },
    });
    console.log('Created sample profile for test user');
  } else {
    sampleProfile = existingProfile;
    console.log('Sample profile already exists for test user');
  }

  // Create sample leads
  const sampleLeads = [
    {
      name: 'Sarah Wilson',
      email: 'sarah@email.com',
      profession: 'Nurse',
      message: 'Interested in creating a professional nursing profile',
      source: 'homepage_cta',
    },
    {
      name: 'Mike Chen',
      email: 'mike@email.com',
      profession: 'Contractor',
      message: 'Need help with professional PDF templates',
      source: 'signup',
    },
    {
      name: 'Lisa Rodriguez',
      email: 'lisa@email.com',
      profession: 'Nanny',
      source: 'homepage_cta',
    },
  ];

  for (const lead of sampleLeads) {
    const existingLead = await prisma.lead.findFirst({
      where: { email: lead.email }
    });
    
    if (!existingLead) {
      await prisma.lead.create({
        data: lead,
      });
    }
  }

  console.log('Created sample leads');
  console.log('Database seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
