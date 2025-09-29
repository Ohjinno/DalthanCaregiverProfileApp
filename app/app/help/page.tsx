
'use client';

import { motion } from 'framer-motion';
import { Search, ChevronDown, ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How do I create my professional profile?',
      answer: 'Creating your profile is easy! After signing up, click on "Create Profile" and follow our step-by-step guide. You\'ll choose your profession, fill in your details, add your experience, and review everything before saving.'
    },
    {
      question: 'What professions are supported?',
      answer: 'We support five main professional categories: Caregivers, Nurses, Nannies, Freelancers, and Contractors. Each category has profession-specific fields and templates designed for your industry.'
    },
    {
      question: 'How do I upload my photo?',
      answer: 'In the profile builder, you can upload your photo by dragging and dropping an image file or clicking "browse" to select one from your device. We accept JPG and PNG files up to 5MB, and automatically resize them for optimal display.'
    },
    {
      question: 'Can I edit my profile after creating it?',
      answer: 'Yes! You can edit your profile anytime from your dashboard. Simply click "Edit Profile" and make any changes you need. Your updates will be saved automatically.'
    },
    {
      question: 'How do PDF templates work?',
      answer: 'After creating your profile, visit the Templates page to choose from our professionally designed PDF templates. Each template has a different style and color scheme. You can preview any template before downloading.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We take data security seriously. Your personal information is encrypted and stored securely. We never share your data with third parties without your consent.'
    },
    {
      question: 'Can I download multiple PDFs?',
      answer: 'Yes! You can generate and download PDFs with different templates as many times as you want. Each PDF will include your latest profile information.'
    },
    {
      question: 'What if I forget my password?',
      answer: 'If you forget your password, click "Forgot Password" on the sign-in page. We\'ll send you instructions to reset it via email.'
    },
    {
      question: 'How do I delete my account?',
      answer: 'To delete your account, please contact our support team at support@caregiverprofile.app. We\'ll help you remove your account and all associated data.'
    },
    {
      question: 'Is CaregiverProfile free to use?',
      answer: 'Yes, CaregiverProfile is completely free to use. You can create profiles, use all templates, and download as many PDFs as you need at no cost.'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Find answers to commonly asked questions and get help with CaregiverProfile.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              {filteredFAQs.length} {filteredFAQs.length === 1 ? 'question' : 'questions'} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </motion.div>

          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      expandedFAQ === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-lg p-8 shadow-sm border">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600">
                  Try searching with different keywords or contact our support team.
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still need help?
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@caregiverprofile.app"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Support
              </a>
              
              <button
                onClick={() => alert('Live chat coming soon!')}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Live Chat
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              We typically respond within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
