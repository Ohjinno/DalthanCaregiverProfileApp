
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  FileText, 
  Download, 
  Edit3, 
  Plus, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import { LoadingDots } from '../../components/loading-dots';
import { UserProfile } from '../../lib/types';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    profileComplete: 0,
    lastUpdated: null as Date | null,
    downloadsCount: 0,
  });

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/profiles');
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
        calculateStats(data.profile);
      } else if (response.status === 404) {
        // No profile exists yet
        setProfile(null);
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

  const calculateStats = (profileData: UserProfile) => {
    if (!profileData) return;

    // Calculate profile completion percentage
    const requiredFields = [
      'firstName', 'lastName', 'email', 'profession', 'bio', 
      'experience', 'skills', 'yearsExperience'
    ];
    
    const filledFields = requiredFields.filter(field => {
      const value = profileData[field as keyof UserProfile];
      return value && value !== '' && (Array.isArray(value) ? value.length > 0 : true);
    });

    const completionPercentage = Math.round((filledFields.length / requiredFields.length) * 100);

    setStats({
      profileComplete: completionPercentage,
      lastUpdated: profileData.updatedAt ? new Date(profileData.updatedAt) : null,
      downloadsCount: 0, // This would be tracked in a real app
    });
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to access your dashboard</h1>
          <Link href="/auth/signin" className="btn-primary">
            Sign In
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user.name || 'Professional'}!
          </h1>
          <p className="text-gray-600">
            Manage your professional profile and create stunning PDFs.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Profile Complete</p>
                <p className="text-3xl font-bold text-teal-600">{stats.profileComplete}%</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.profileComplete}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Last Updated</p>
                <p className="text-lg font-semibold text-gray-900">
                  {stats.lastUpdated
                    ? stats.lastUpdated.toLocaleDateString()
                    : 'Never'
                  }
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">PDF Downloads</p>
                <p className="text-3xl font-bold text-green-600">{stats.downloadsCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Your Profile
              </h2>
            </div>
            
            <div className="p-6">
              {profile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <p className="text-gray-600">{profile.profession}</p>
                      <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 mb-2">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Profile Created</span>
                      </div>
                      {profile.isComplete && (
                        <div className="flex items-center text-teal-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Complete</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/profile"
                      className="btn-primary flex-1 justify-center"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Link>
                    <Link
                      href="/templates"
                      className="btn-secondary flex-1 justify-center"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Profile Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Create your professional profile to get started.
                  </p>
                  <Link
                    href="/profile"
                    className="btn-primary"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Profile
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <Link
                  href="/profile"
                  className="flex items-center p-4 rounded-lg border hover:border-teal-300 hover:bg-teal-50 transition-colors group"
                >
                  <div className="bg-teal-100 p-2 rounded-lg mr-4 group-hover:bg-teal-200 transition-colors">
                    <Edit3 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your information and preferences</p>
                  </div>
                </Link>

                <Link
                  href="/templates"
                  className="flex items-center p-4 rounded-lg border hover:border-purple-300 hover:bg-purple-50 transition-colors group"
                >
                  <div className="bg-purple-100 p-2 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Choose Template</h3>
                    <p className="text-sm text-gray-600">Browse and select PDF templates</p>
                  </div>
                </Link>

                <div className="flex items-center p-4 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="bg-gray-200 p-2 rounded-lg mr-4">
                    <Download className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Download PDF</h3>
                    <p className="text-sm text-gray-500">Complete your profile first</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 border border-teal-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Success</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3">
              <div className="bg-teal-100 p-1.5 rounded-lg mt-0.5">
                <CheckCircle className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Complete Your Profile</h4>
                <p className="text-sm text-gray-600">Fill in all sections for the best results</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-blue-100 p-1.5 rounded-lg mt-0.5">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Choose the Right Template</h4>
                <p className="text-sm text-gray-600">Select a template that matches your profession</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-1.5 rounded-lg mt-0.5">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">Keep It Updated</h4>
                <p className="text-sm text-gray-600">Regularly update your skills and experience</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
