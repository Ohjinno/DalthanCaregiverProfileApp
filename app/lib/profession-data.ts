
import { ProfessionType } from './types';

export const PROFESSIONS: ProfessionType[] = [
  'Caregiver',
  'Nurse',
  'Nanny',
  'Freelancer',
  'Contractor'
];

export const PROFESSION_FORMS = {
  Caregiver: {
    title: 'Caregiver Profile',
    icon: '🏥',
    color: 'bg-blue-500',
    fields: [
      { key: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'text', required: false },
      { key: 'certifications', label: 'Certifications & Licenses', type: 'textarea', required: true },
      { key: 'specialties', label: 'Areas of Specialty', type: 'multiselect', options: ['Elderly Care', 'Alzheimer\'s/Dementia', 'Post-Surgery Recovery', 'Disability Care', 'Hospice Care', 'Medication Management'], required: true },
      { key: 'availability', label: 'Availability', type: 'multiselect', options: ['Full-time', 'Part-time', 'Live-in', 'Overnight', 'Weekends', 'Holidays'], required: true },
      { key: 'transportation', label: 'Own Transportation', type: 'boolean', required: true },
      { key: 'languages', label: 'Languages Spoken', type: 'multiselect', options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean'], required: true }
    ],
    bioPrompts: [
      'Describe your approach to patient care and what makes you a compassionate caregiver.',
      'Share your experience with specific conditions or age groups.',
      'What motivates you in your caregiving career?'
    ]
  },
  Nurse: {
    title: 'Nursing Profile',
    icon: '💉',
    color: 'bg-green-500',
    fields: [
      { key: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'text', required: false },
      { key: 'licenseNumber', label: 'License Number', type: 'text', required: true },
      { key: 'education', label: 'Education/Degree', type: 'text', required: true },
      { key: 'specialties', label: 'Nursing Specialties', type: 'multiselect', options: ['Home Health', 'Critical Care', 'Pediatric', 'Geriatric', 'Oncology', 'Cardiac', 'Wound Care', 'IV Therapy'], required: true },
      { key: 'certifications', label: 'Additional Certifications', type: 'textarea', required: true },
      { key: 'availability', label: 'Availability', type: 'multiselect', options: ['Full-time', 'Part-time', 'Per Diem', 'Night Shifts', 'Weekends', 'On-call'], required: true },
      { key: 'languages', label: 'Languages Spoken', type: 'multiselect', options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean'], required: true }
    ],
    bioPrompts: [
      'Describe your nursing philosophy and approach to patient care.',
      'Highlight your clinical expertise and specialized training.',
      'What drives your passion for nursing?'
    ]
  },
  Nanny: {
    title: 'Nanny Profile',
    icon: '👶',
    color: 'bg-pink-500',
    fields: [
      { key: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'text', required: false },
      { key: 'ageGroups', label: 'Age Groups You Work With', type: 'multiselect', options: ['Infants (0-12 months)', 'Toddlers (1-3 years)', 'Preschoolers (3-5 years)', 'School Age (6-12 years)', 'Teenagers (13+ years)'], required: true },
      { key: 'certifications', label: 'Certifications (CPR, First Aid, etc.)', type: 'textarea', required: true },
      { key: 'activities', label: 'Activities & Skills', type: 'multiselect', options: ['Educational Activities', 'Arts & Crafts', 'Outdoor Play', 'Music/Dance', 'Cooking', 'Homework Help', 'Language Teaching', 'Swimming'], required: true },
      { key: 'availability', label: 'Availability', type: 'multiselect', options: ['Full-time', 'Part-time', 'Live-in', 'Date Nights', 'Weekends', 'Travel Available'], required: true },
      { key: 'transportation', label: 'Own Transportation', type: 'boolean', required: true },
      { key: 'languages', label: 'Languages Spoken', type: 'multiselect', options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean'], required: true }
    ],
    bioPrompts: [
      'Describe your childcare philosophy and approach to nurturing children.',
      'Share your experience with different age groups and activities you enjoy with children.',
      'What makes you passionate about working with families?'
    ]
  },
  Freelancer: {
    title: 'Freelancer Profile',
    icon: '💼',
    color: 'bg-purple-500',
    fields: [
      { key: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'text', required: false },
      { key: 'services', label: 'Services Offered', type: 'multiselect', options: ['Web Development', 'Graphic Design', 'Content Writing', 'Digital Marketing', 'Consulting', 'Photography', 'Video Production', 'Translation', 'Virtual Assistant', 'Other'], required: true },
      { key: 'skills', label: 'Technical Skills', type: 'multiselect', options: ['HTML/CSS', 'JavaScript', 'Python', 'React', 'WordPress', 'Adobe Creative Suite', 'SEO', 'Social Media', 'Project Management', 'Data Analysis'], required: true },
      { key: 'availability', label: 'Availability', type: 'multiselect', options: ['Full-time', 'Part-time', 'Project-based', 'Remote', 'On-site', 'Flexible Hours'], required: true },
      { key: 'languages', label: 'Languages Spoken', type: 'multiselect', options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Chinese', 'Japanese', 'Korean'], required: true }
    ],
    bioPrompts: [
      'Describe your professional expertise and the unique value you bring to clients.',
      'Share your experience with notable projects or achievements.',
      'What drives your passion for freelance work?'
    ]
  },
  Contractor: {
    title: 'Contractor Profile',
    icon: '🔨',
    color: 'bg-orange-500',
    fields: [
      { key: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { key: 'hourlyRate', label: 'Hourly Rate ($)', type: 'text', required: false },
      { key: 'services', label: 'Services Offered', type: 'multiselect', options: ['General Contracting', 'Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Flooring', 'Painting', 'Carpentry', 'Landscaping', 'Handyman Services'], required: true },
      { key: 'licenseNumber', label: 'License Number', type: 'text', required: false },
      { key: 'insurance', label: 'Insurance Coverage', type: 'text', required: true },
      { key: 'certifications', label: 'Certifications & Training', type: 'textarea', required: true },
      { key: 'availability', label: 'Availability', type: 'multiselect', options: ['Full-time', 'Part-time', 'Emergency Services', 'Weekends', 'Evenings', 'Seasonal Work'], required: true },
      { key: 'serviceArea', label: 'Service Area (miles)', type: 'text', required: true }
    ],
    bioPrompts: [
      'Describe your contracting expertise and approach to quality workmanship.',
      'Share your experience with different types of projects and your commitment to customer satisfaction.',
      'What sets you apart from other contractors in your field?'
    ]
  }
};

export const PDF_TEMPLATES = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, modern design with bold typography',
    colors: { primary: '#26A69A', secondary: '#E0E0E0', text: '#333' }
  },
  classic: {
    id: 'classic',
    name: 'Classic Elegant',
    description: 'Traditional, elegant layout with serif fonts',
    colors: { primary: '#2C3E50', secondary: '#ECF0F1', text: '#34495E' }
  },
  creative: {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design with vibrant colors',
    colors: { primary: '#E74C3C', secondary: '#F8C471', text: '#2C3E50' }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple, clean design focused on content',
    colors: { primary: '#95A5A6', secondary: '#FFFFFF', text: '#2C3E50' }
  }
};
