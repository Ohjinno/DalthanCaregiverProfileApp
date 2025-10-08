
export interface UserProfile {
  id?: string;
  userId?: string;
  profession: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  photoUrl?: string;
  bio?: string;
  experience?: string;
  education?: string;
  certifications?: string;
  skills?: string[];
  availability?: string[];
  hourlyRate?: string;
  yearsExperience?: number;
  languages?: string[];
  references?: Reference[];
  portfolioItems?: PortfolioItem[];
  templateStyle?: string;
  isComplete?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface Reference {
  name: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  relationship: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  imageUrl?: string;
  date: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  profession?: string;
  message?: string;
  source?: string;
  status?: string;
}

export type ProfessionType = 'Caregiver' | 'Nurse' | 'Nanny' | 'Freelancer' | 'Contractor';

export interface FormData {
  [key: string]: any;
}

export interface PDFTemplate {
  id: string;
  name: string;
  profession: string;
  description: string;
  previewImage: string;
}
