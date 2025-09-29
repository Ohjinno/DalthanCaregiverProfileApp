
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Download, FileText, User, Palette, ArrowLeft } from 'lucide-react';
import { LoadingDots } from '../../components/loading-dots';
import { UserProfile } from '../../lib/types';
import { PDF_TEMPLATES } from '../../lib/profession-data';
import { PDFGenerator } from '../../lib/pdf-generator';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function TemplatesPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session?.user) {
      fetchProfile();
    }
  }, [session, status, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profiles');
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      } else if (response.status === 404) {
        toast.error('Please create your profile first');
        router.push('/profile');
        return;
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      toast.error('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = async (templateId: string) => {
    if (!profile) {
      toast.error('Profile not found');
      return;
    }

    setIsGenerating(templateId);

    try {
      const generator = new PDFGenerator(profile, templateId);
      const pdfDataUri = generator.generate();

      // Create download link
      const link = document.createElement('a');
      link.href = pdfDataUri;
      link.download = `${profile.firstName}_${profile.lastName}_Profile.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsGenerating(null);
    }
  };

  const handlePreviewPDF = async (templateId: string) => {
    if (!profile) return;

    setIsGenerating(templateId);

    try {
      const generator = new PDFGenerator(profile, templateId);
      const pdfDataUri = generator.generate();

      // Open in new tab
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${profile.firstName} ${profile.lastName} - Profile Preview</title></head>
            <body style="margin:0;">
              <iframe src="${pdfDataUri}" width="100%" height="100%" frameborder="0"></iframe>
            </body>
          </html>
        `);
      }
    } catch (error) {
      console.error('PDF preview error:', error);
      toast.error('Failed to preview PDF');
    } finally {
      setIsGenerating(null);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access templates</h1>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Profile Found</h1>
          <p className="text-gray-600 mb-6">
            You need to create a profile before you can generate PDFs.
          </p>
          <Link href="/profile" className="btn-primary">
            Create Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Link
              href="/dashboard"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Template
          </h1>
          <p className="text-gray-600">
            Select a professional template that matches your style and download your PDF profile.
          </p>
        </motion.div>

        {/* Profile Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border p-6 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="bg-teal-100 p-3 rounded-full">
              <User className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.profession}</p>
              <p className="text-sm text-gray-500">{profile.email}</p>
            </div>
          </div>
          
          {(!profile.bio || !profile.yearsExperience) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                ⚠️ Your profile is incomplete. Consider updating it for better PDF results.
              </p>
              <Link href="/profile" className="text-yellow-700 hover:text-yellow-800 text-sm font-medium">
                Update Profile →
              </Link>
            </div>
          )}
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.values(PDF_TEMPLATES).map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 2) }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Template Preview */}
              <div 
                className="h-48 p-6 flex items-center justify-center"
                style={{ backgroundColor: template.colors.secondary }}
              >
                <div 
                  className="w-full h-full rounded-lg shadow-sm flex flex-col justify-between p-4"
                  style={{ backgroundColor: 'white' }}
                >
                  <div>
                    <div 
                      className="h-3 rounded mb-2"
                      style={{ backgroundColor: template.colors.primary, width: '70%' }}
                    />
                    <div className="h-2 bg-gray-200 rounded mb-1" style={{ width: '50%' }} />
                    <div className="h-2 bg-gray-200 rounded" style={{ width: '60%' }} />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1 bg-gray-200 rounded" />
                    <div className="h-1 bg-gray-200 rounded" style={{ width: '80%' }} />
                    <div className="h-1 bg-gray-200 rounded" style={{ width: '90%' }} />
                  </div>
                  <div className="flex space-x-1">
                    <div 
                      className="w-2 h-2 rounded"
                      style={{ backgroundColor: template.colors.primary }}
                    />
                    <div className="w-2 h-2 bg-gray-200 rounded" />
                    <div className="w-2 h-2 bg-gray-200 rounded" />
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Palette 
                    className="w-4 h-4"
                    style={{ color: template.colors.primary }}
                  />
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{template.description}</p>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handlePreviewPDF(template.id)}
                    disabled={isGenerating === template.id}
                    className="w-full btn-secondary text-sm justify-center"
                  >
                    {isGenerating === template.id ? (
                      <LoadingDots size="sm" />
                    ) : (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Preview
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleGeneratePDF(template.id)}
                    disabled={isGenerating === template.id}
                    className="w-full btn-primary text-sm justify-center"
                    style={{ backgroundColor: template.colors.primary }}
                  >
                    {isGenerating === template.id ? (
                      <LoadingDots size="sm" />
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Professional PDFs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Complete Your Profile</h4>
              <p className="text-sm text-gray-600">
                Make sure all sections are filled out for the best results
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Choose the Right Style</h4>
              <p className="text-sm text-gray-600">
                Select a template that matches your profession and personality
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 text-sm">Keep It Updated</h4>
              <p className="text-sm text-gray-600">
                Regularly update your profile to reflect your latest achievements
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
