
'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">CaregiverProfile</h3>
            <p className="text-gray-600">
              Empowering caregivers, nurses, nannies, freelancers, and contractors with professional profile tools.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Quick Links</h4>
            <div className="space-y-2">
              <a href="/auth/signup" className="block text-gray-600 hover:text-teal-600 transition-colors">
                Get Started
              </a>
              <a href="/templates" className="block text-gray-600 hover:text-teal-600 transition-colors">
                Templates
              </a>
              <a href="/about" className="block text-gray-600 hover:text-teal-600 transition-colors">
                About Us
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-md font-medium text-gray-900">Support</h4>
            <div className="space-y-2">
              <a href="mailto:support@caregiverprofile.app" className="block text-gray-600 hover:text-teal-600 transition-colors">
                Contact Support
              </a>
              <a href="/help" className="block text-gray-600 hover:text-teal-600 transition-colors">
                Help Center
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} CaregiverProfile. All rights reserved.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-1 text-gray-600 text-sm mt-2 md:mt-0"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for care professionals</span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
