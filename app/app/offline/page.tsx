
'use client';

import { motion } from 'framer-motion';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function OfflinePage() {
  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-xl shadow-lg p-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <WifiOff className="w-8 h-8 text-gray-400" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-4"
          >
            You're Offline
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            It looks like you don't have an internet connection. Please check your network and try again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <button
              onClick={handleRefresh}
              className="btn-primary w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>

            <Link
              href="/"
              className="btn-secondary w-full justify-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-4 bg-teal-50 rounded-lg border border-teal-200"
          >
            <p className="text-sm text-teal-700">
              <strong>Tip:</strong> Some features of CaregiverProfile work offline. 
              You can still view cached pages and your saved profile data.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
