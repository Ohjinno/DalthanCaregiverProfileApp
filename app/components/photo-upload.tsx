
'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Crop } from 'lucide-react';
import { motion } from 'framer-motion';
import { LoadingDots } from './loading-dots';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface PhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoUpdate: (url: string) => void;
}

export function PhotoUpload({ currentPhotoUrl, onPhotoUpdate }: PhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      const data = await response.json();
      onPhotoUpdate(data.url);
      toast.success('Photo uploaded successfully!');
    } catch (error: any) {
      console.error('Photo upload error:', error);
      toast.error(error.message || 'Failed to upload photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const removePhoto = () => {
    onPhotoUpdate('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className="form-label flex items-center">
        <Camera className="w-4 h-4 mr-2" />
        Profile Photo
      </label>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Current Photo Preview */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-4 border-gray-200">
            {currentPhotoUrl ? (
              <>
                <div className="relative w-full h-full aspect-square bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={currentPhotoUrl}
                    alt="Profile photo"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <button
                  type="button"
                  onClick={removePhoto}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Camera className="w-8 h-8" />
              </div>
            )}
          </div>
        </div>

        {/* Upload Area */}
        <div className="flex-1">
          <motion.div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-teal-500 bg-teal-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {isUploading ? (
              <div className="py-4">
                <LoadingDots />
                <p className="text-sm text-gray-600 mt-2">Uploading photo...</p>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">
                  Drag and drop your photo here, or{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  JPG, PNG up to 5MB. Image will be resized to 400x400px.
                </p>
              </>
            )}
          </motion.div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {!currentPhotoUrl && (
            <p className="text-sm text-gray-500 mt-2">
              A professional headshot helps you make a great first impression.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
