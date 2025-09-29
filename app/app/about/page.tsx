
'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

export default function AboutPage() {
  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: valuesRef, inView: valuesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Professional Empowerment',
      description: 'We believe every care professional deserves tools that showcase their expertise and dedication.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Simplicity & Accessibility',
      description: 'Creating professional profiles should be simple, accessible, and available to everyone.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Quality & Excellence',
      description: 'We maintain the highest standards in design, functionality, and user experience.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Community Impact',
      description: 'Supporting the heroes who care for others by helping them advance their careers.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Professionals Served' },
    { number: '50,000+', label: 'PDFs Generated' },
    { number: '5', label: 'Profession Categories' },
    { number: '4', label: 'Template Styles' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-8">
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="text-teal-600">CaregiverProfile</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're dedicated to empowering care professionals with the tools they need 
              to create outstanding profiles and advance their careers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                CaregiverProfile was born from a simple recognition: the professionals who dedicate 
                their lives to caring for others deserve exceptional tools to showcase their skills 
                and advance their careers.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We've built a comprehensive platform that makes it easy for caregivers, nurses, 
                nannies, freelancers, and contractors to create professional profiles and generate 
                stunning PDFs that help them stand out in their fields.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={missionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={missionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our commitment to the care professionals 
              who trust us with their career development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 text-teal-600 rounded-xl mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why We Built CaregiverProfile
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-lg mb-6">
                The care industry is filled with incredibly talented professionals who often 
                struggle to effectively communicate their skills and experience. Traditional 
                resume builders weren't designed with the unique needs of caregivers, nurses, 
                nannies, and other care professionals in mind.
              </p>
              <p className="text-lg mb-6">
                We realized there was a gap in the market for a tool specifically designed 
                for care professionals – one that understands their unique skill sets, 
                certifications, and the personal nature of their work.
              </p>
              <p className="text-lg">
                CaregiverProfile bridges that gap, providing profession-specific templates, 
                relevant form fields, and industry-appropriate formatting that helps care 
                professionals present themselves in the best possible light.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Build Your Professional Profile?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Join thousands of care professionals who trust CaregiverProfile 
              to help them advance their careers.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Get Started Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
