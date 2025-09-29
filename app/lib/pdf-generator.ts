
import jsPDF from 'jspdf';
import { UserProfile } from './types';
import { PDF_TEMPLATES } from './profession-data';

export class PDFGenerator {
  private pdf: jsPDF;
  private profile: UserProfile;
  private template: any;

  constructor(profile: UserProfile, templateId: string = 'modern') {
    this.pdf = new jsPDF('portrait', 'mm', 'a4');
    this.profile = profile;
    this.template = PDF_TEMPLATES[templateId as keyof typeof PDF_TEMPLATES] || PDF_TEMPLATES.modern;
  }

  generate(): string {
    this.addHeader();
    this.addPersonalInfo();
    this.addProfessionalSummary();
    this.addExperience();
    this.addSkills();
    this.addEducationAndCertifications();
    this.addReferences();
    this.addFooter();

    return this.pdf.output('datauristring');
  }

  private addHeader(): void {
    const { primary } = this.template.colors;
    
    // Header background
    this.pdf.setFillColor(primary);
    this.pdf.rect(0, 0, 210, 40, 'F');

    // Profile photo placeholder
    if (this.profile.photoUrl) {
      this.pdf.setFillColor(255, 255, 255);
      this.pdf.circle(25, 20, 15, 'F');
      this.pdf.setTextColor(100, 100, 100);
      this.pdf.setFontSize(8);
      this.pdf.text('Photo', 22, 22);
    }

    // Name and title
    this.pdf.setTextColor(255, 255, 255);
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(`${this.profile.firstName} ${this.profile.lastName}`, 45, 18);
    
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(this.profile.profession, 45, 28);

    // Contact info
    this.pdf.setFontSize(10);
    let yPos = 35;
    this.pdf.text(`📧 ${this.profile.email}`, 45, yPos);
    if (this.profile.phone) {
      this.pdf.text(`📱 ${this.profile.phone}`, 120, yPos);
    }
  }

  private addPersonalInfo(): void {
    let yPos = 50;
    
    if (this.profile.address || this.profile.city) {
      this.pdf.setTextColor(60, 60, 60);
      this.pdf.setFontSize(10);
      const address = `${this.profile.address || ''}, ${this.profile.city || ''}, ${this.profile.state || ''} ${this.profile.zipCode || ''}`.trim();
      this.pdf.text(`📍 ${address}`, 20, yPos);
      yPos += 8;
    }
  }

  private addProfessionalSummary(): void {
    let yPos = 65;
    
    this.pdf.setTextColor(this.template.colors.primary);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Professional Summary', 20, yPos);
    yPos += 8;

    if (this.profile.bio) {
      this.pdf.setTextColor(60, 60, 60);
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'normal');
      const splitBio = this.pdf.splitTextToSize(this.profile.bio, 170);
      this.pdf.text(splitBio, 20, yPos);
      yPos += splitBio.length * 4 + 5;
    }
  }

  private addExperience(): void {
    let yPos = 95;
    
    this.pdf.setTextColor(this.template.colors.primary);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Experience', 20, yPos);
    yPos += 8;

    this.pdf.setTextColor(60, 60, 60);
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');

    if (this.profile.yearsExperience) {
      this.pdf.text(`Years of Experience: ${this.profile.yearsExperience}`, 20, yPos);
      yPos += 6;
    }

    if (this.profile.hourlyRate) {
      this.pdf.text(`Hourly Rate: $${this.profile.hourlyRate}`, 20, yPos);
      yPos += 6;
    }

    if (this.profile.experience) {
      const splitExp = this.pdf.splitTextToSize(this.profile.experience, 170);
      this.pdf.text(splitExp, 20, yPos);
      yPos += splitExp.length * 4 + 5;
    }
  }

  private addSkills(): void {
    let yPos = 140;
    
    this.pdf.setTextColor(this.template.colors.primary);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Skills & Specialties', 20, yPos);
    yPos += 8;

    this.pdf.setTextColor(60, 60, 60);
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');

    if (this.profile.skills && this.profile.skills.length > 0) {
      const skillsText = this.profile.skills.join(' • ');
      const splitSkills = this.pdf.splitTextToSize(skillsText, 170);
      this.pdf.text(splitSkills, 20, yPos);
      yPos += splitSkills.length * 4 + 5;
    }

    if (this.profile.languages && this.profile.languages.length > 0) {
      this.pdf.text(`Languages: ${this.profile.languages.join(', ')}`, 20, yPos);
      yPos += 6;
    }

    if (this.profile.availability && this.profile.availability.length > 0) {
      this.pdf.text(`Availability: ${this.profile.availability.join(', ')}`, 20, yPos);
      yPos += 6;
    }
  }

  private addEducationAndCertifications(): void {
    let yPos = 190;
    
    this.pdf.setTextColor(this.template.colors.primary);
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Education & Certifications', 20, yPos);
    yPos += 8;

    this.pdf.setTextColor(60, 60, 60);
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');

    if (this.profile.education) {
      const splitEdu = this.pdf.splitTextToSize(this.profile.education, 170);
      this.pdf.text(splitEdu, 20, yPos);
      yPos += splitEdu.length * 4 + 5;
    }

    if (this.profile.certifications) {
      const splitCert = this.pdf.splitTextToSize(this.profile.certifications, 170);
      this.pdf.text(splitCert, 20, yPos);
      yPos += splitCert.length * 4 + 5;
    }
  }

  private addReferences(): void {
    let yPos = 230;
    
    if (this.profile.references && this.profile.references.length > 0) {
      this.pdf.setTextColor(this.template.colors.primary);
      this.pdf.setFontSize(14);
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.text('References', 20, yPos);
      yPos += 8;

      this.pdf.setTextColor(60, 60, 60);
      this.pdf.setFontSize(10);
      this.pdf.setFont('helvetica', 'normal');

      this.profile.references.slice(0, 2).forEach((ref) => {
        this.pdf.text(`${ref.name} - ${ref.position} at ${ref.company}`, 20, yPos);
        yPos += 4;
        this.pdf.text(`📱 ${ref.phone} | 📧 ${ref.email}`, 20, yPos);
        yPos += 8;
      });
    } else {
      this.pdf.setTextColor(60, 60, 60);
      this.pdf.setFontSize(10);
      this.pdf.text('References available upon request', 20, yPos);
    }
  }

  private addFooter(): void {
    this.pdf.setTextColor(120, 120, 120);
    this.pdf.setFontSize(8);
    this.pdf.text('Generated with CaregiverProfileApp', 20, 285);
    this.pdf.text(`Created on ${new Date().toLocaleDateString()}`, 140, 285);
  }
}
