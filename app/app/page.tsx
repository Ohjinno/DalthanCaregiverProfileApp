
'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FileText, Users, Download, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { LoadingDots } from '../components/loading-dots';
import { useInView } from 'react-intersection-observer';

export default function HomePage() {
  const { data: session, status } = useSession();
  const [leadFormVisible, setLeadFormVisible] = useState(false);
  const [leadForm, setLeadForm] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leadForm, source: 'homepage_cta' }),
      });

      if (response.ok) {
        setLeadForm({ name: '', email: '' });
        setLeadFormVisible(false);
        alert('Thank you! We\'ll be in touch soon.');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Professional Templates',
      description: 'Choose from multiple profession-specific PDF templates designed by experts.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Multi-Profession Support',
      description: 'Built for caregivers, nurses, nannies, freelancers, and contractors.',
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Instant PDF Export',
      description: 'Generate and download your professional profile in seconds.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Easy Profile Builder',
      description: 'Simple step-by-step process to create your perfect profile.',
    },
  ];

  const professions = [
    { name: 'Caregivers', icon: '🏥', color: 'bg-blue-100 text-blue-600' },
    { name: 'Nurses', icon: '💉', color: 'bg-green-100 text-green-600' },
    { name: 'Nannies', icon: '👶', color: 'bg-pink-100 text-pink-600' },
    { name: 'Freelancers', icon: '💼', color: 'bg-purple-100 text-purple-600' },
    { name: 'Contractors', icon: '🔨', color: 'bg-orange-100 text-orange-600' },
  ];

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingDots />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-100/20 to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Craft Your{' '}
              <span className="text-teal-600 relative">
                Pro Profile
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600/30 -z-10"
                />
              </span>{' '}
              Today!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              Professional profile builder designed specifically for care professionals. 
              Create stunning PDFs in minutes and stand out in your field.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              {session?.user ? (
                <Link
                  href="/dashboard"
                  className="btn-primary text-lg px-8 py-4 group"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/signup"
                    className="btn-primary text-lg px-8 py-4 group"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                    onClick={() => setLeadFormVisible(true)}
                    className="btn-secondary text-lg px-8 py-4"
                  >
                    Learn More
                  </button>
                </>
              )}
            </motion.div>

            {/* Profession Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {professions.map((profession, index) => (
                <motion.div
                  key={profession.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${profession.color} text-sm font-medium`}
                >
                  <span className="text-lg">{profession.icon}</span>
                  <span>{profession.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Lead Capture Modal */}
        {leadFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setLeadFormVisible(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-4">Get Early Access</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of professionals already using CaregiverProfile.
              </p>
              <form onSubmit={handleLeadSubmit}>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="form-input"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full"
                  >
                    {isSubmitting ? <LoadingDots /> : 'Get Started'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to create 
              professional profiles that get noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-xl mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Stand Out in Your Profession
              </h2>
              <div className="space-y-6">
                {[
                  'Create professional PDFs in under 10 minutes',
                  'Multiple templates designed for each profession',
                  'Mobile-friendly builder works on any device',
                  'Secure and private - your data stays protected'
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-teal-600 mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-gray-700">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-20 bg-teal-100 rounded"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-teal-600 text-white px-4 py-2 rounded text-sm">
                    Download PDF
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!session?.user && (
        <section className="py-20 bg-teal-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Create Your Profile?
              </h2>
              <p className="text-xl text-teal-100 mb-8">
                Join thousands of professionals who trust CaregiverProfile for their career success.
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors group"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
