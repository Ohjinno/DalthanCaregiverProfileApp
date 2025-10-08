
'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Plus,
  X,
  Save,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, ProfessionType, Reference, PortfolioItem } from '../lib/types';
import { PROFESSION_FORMS, PROFESSIONS } from '../lib/profession-data';
import { LoadingDots } from './loading-dots';
import { PhotoUpload } from './photo-upload';
import toast from 'react-hot-toast';

interface ProfileBuilderProps {
  initialProfile: UserProfile | null;
  onSave: (profile: UserProfile) => Promise<void>;
}

export function ProfileBuilder({ initialProfile, onSave }: ProfileBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserProfile>({
    profession: initialProfile?.profession || '',
    firstName: initialProfile?.firstName || '',
    lastName: initialProfile?.lastName || '',
    email: initialProfile?.email || '',
    phone: initialProfile?.phone || '',
    address: initialProfile?.address || '',
    city: initialProfile?.city || '',
    state: initialProfile?.state || '',
    zipCode: initialProfile?.zipCode || '',
    photoUrl: initialProfile?.photoUrl || '',
    bio: initialProfile?.bio || '',
    experience: initialProfile?.experience || '',
    education: initialProfile?.education || '',
    certifications: initialProfile?.certifications || '',
    skills: initialProfile?.skills || [],
    availability: initialProfile?.availability || [],
    hourlyRate: initialProfile?.hourlyRate || '',
    yearsExperience: initialProfile?.yearsExperience || 0,
    languages: initialProfile?.languages || [],
    references: initialProfile?.references || [],
    portfolioItems: initialProfile?.portfolioItems || [],
    templateStyle: initialProfile?.templateStyle || 'modern',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const steps = [
    { id: 'profession', title: 'Choose Profession', description: 'Select your professional category' },
    { id: 'basic', title: 'Basic Information', description: 'Your personal details' },
    { id: 'professional', title: 'Professional Details', description: 'Your experience and skills' },
    { id: 'additional', title: 'Additional Information', description: 'References and portfolio' },
    { id: 'review', title: 'Review & Save', description: 'Review your information' },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    switch (step) {
      case 0:
        if (!formData.profession) newErrors.profession = 'Please select a profession';
        break;
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        break;
      case 2:
        if (!formData.bio) newErrors.bio = 'Professional bio is required';
        if (!formData.yearsExperience || formData.yearsExperience < 0) {
          newErrors.yearsExperience = 'Years of experience is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Profile save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addReference = () => {
    const newRef: Reference = {
      name: '',
      position: '',
      company: '',
      phone: '',
      email: '',
      relationship: '',
    };
    updateFormData('references', [...(formData.references || []), newRef]);
  };

  const updateReference = (index: number, field: string, value: string) => {
    const updatedRefs = [...(formData.references || [])];
    updatedRefs[index] = { ...updatedRefs[index], [field]: value };
    updateFormData('references', updatedRefs);
  };

  const removeReference = (index: number) => {
    const updatedRefs = formData.references?.filter((_, i) => i !== index) || [];
    updateFormData('references', updatedRefs);
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = formData.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    updateFormData('skills', updatedSkills);
  };

  const toggleAvailability = (availability: string) => {
    const currentAvailability = formData.availability || [];
    const updatedAvailability = currentAvailability.includes(availability)
      ? currentAvailability.filter(a => a !== availability)
      : [...currentAvailability, availability];
    updateFormData('availability', updatedAvailability);
  };

  const toggleLanguage = (language: string) => {
    const currentLanguages = formData.languages || [];
    const updatedLanguages = currentLanguages.includes(language)
      ? currentLanguages.filter(l => l !== language)
      : [...currentLanguages, language];
    updateFormData('languages', updatedLanguages);
  };

  const professionData = formData.profession ? PROFESSION_FORMS[formData.profession as ProfessionType] : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].title}</h2>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 h-2 mx-1 rounded-full transition-colors ${
                index <= currentStep ? 'bg-teal-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        
        <p className="text-sm text-gray-600">{steps[currentStep].description}</p>
      </div>

      <div className="p-6">
        {/* Step 0: Profession Selection */}
        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">Choose Your Profession *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                {PROFESSIONS.map((profession) => (
                  <button
                    key={profession}
                    type="button"
                    onClick={() => updateFormData('profession', profession)}
                    className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                      formData.profession === profession
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {PROFESSION_FORMS[profession].icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{profession}</h3>
                        <p className="text-sm text-gray-600">{PROFESSION_FORMS[profession].title}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.profession && <p className="form-error">{errors.profession}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <PhotoUpload
              currentPhotoUrl={formData.photoUrl}
              onPhotoUpdate={(url) => updateFormData('photoUrl', url)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">First Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    className="form-input pl-12"
                    placeholder="Enter your first name"
                  />
                </div>
                {errors.firstName && <p className="form-error">{errors.firstName}</p>}
              </div>

              <div>
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="form-input"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="form-error">{errors.lastName}</p>}
              </div>

              <div>
                <label className="form-label">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className="form-input pl-12"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div>
                <label className="form-label">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="form-input pl-12"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  className="form-input pl-12"
                  placeholder="Street address"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="form-label">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="form-input"
                  placeholder="City"
                />
              </div>

              <div>
                <label className="form-label">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => updateFormData('state', e.target.value)}
                  className="form-input"
                  placeholder="State"
                />
              </div>

              <div>
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData('zipCode', e.target.value)}
                  className="form-input"
                  placeholder="Zip code"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Professional Details */}
        {currentStep === 2 && professionData && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="form-label">Professional Bio *</label>
              <textarea
                value={formData.bio}
                onChange={(e) => updateFormData('bio', e.target.value)}
                className="form-input h-32"
                placeholder={professionData.bioPrompts.join(' ')}
              />
              {errors.bio && <p className="form-error">{errors.bio}</p>}
            </div>

            {/* Profession-specific fields */}
            {professionData.fields.map((field) => (
              <div key={field.key}>
                <label className="form-label">
                  {field.label} {field.required && '*'}
                </label>
                
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.key as keyof UserProfile] as string || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    className="form-input"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                )}

                {field.type === 'number' && (
                  <input
                    type="number"
                    value={formData[field.key as keyof UserProfile] as number || 0}
                    onChange={(e) => updateFormData(field.key, parseInt(e.target.value) || 0)}
                    className="form-input"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    min="0"
                  />
                )}

                {field.type === 'textarea' && (
                  <textarea
                    value={formData[field.key as keyof UserProfile] as string || ''}
                    onChange={(e) => updateFormData(field.key, e.target.value)}
                    className="form-input h-24"
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                )}

                {field.type === 'boolean' && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={field.key}
                      checked={formData[field.key as keyof UserProfile] as boolean || false}
                      onChange={(e) => updateFormData(field.key, e.target.checked)}
                      className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <label htmlFor={field.key} className="text-sm text-gray-700">
                      Yes
                    </label>
                  </div>
                )}

                {field.type === 'multiselect' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {field.options?.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          if (field.key === 'skills') toggleSkill(option);
                          else if (field.key === 'availability') toggleAvailability(option);
                          else if (field.key === 'languages') toggleLanguage(option);
                          else {
                            // For other multiselect fields
                            const currentValues = (formData[field.key as keyof UserProfile] as string[]) || [];
                            const updatedValues = currentValues.includes(option)
                              ? currentValues.filter(v => v !== option)
                              : [...currentValues, option];
                            updateFormData(field.key, updatedValues);
                          }
                        }}
                        className={`p-2 text-sm rounded-lg border transition-colors ${
                          ((formData[field.key as keyof UserProfile] as string[]) || []).includes(option)
                            ? 'border-teal-600 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-teal-300'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {errors[field.key] && <p className="form-error">{errors[field.key]}</p>}
              </div>
            ))}

            <div>
              <label className="form-label">Additional Experience</label>
              <textarea
                value={formData.experience}
                onChange={(e) => updateFormData('experience', e.target.value)}
                className="form-input h-24"
                placeholder="Describe your additional work experience, achievements, and notable projects"
              />
            </div>

            <div>
              <label className="form-label">Education</label>
              <textarea
                value={formData.education}
                onChange={(e) => updateFormData('education', e.target.value)}
                className="form-input h-20"
                placeholder="List your educational background, degrees, and relevant training"
              />
            </div>
          </motion.div>
        )}

        {/* Step 3: Additional Information */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">References</h3>
                <button
                  type="button"
                  onClick={addReference}
                  className="btn-secondary text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Reference
                </button>
              </div>

              {formData.references && formData.references.length > 0 ? (
                <div className="space-y-4">
                  {formData.references.map((ref, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Reference {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={ref.name}
                          onChange={(e) => updateReference(index, 'name', e.target.value)}
                          className="form-input"
                          placeholder="Full Name"
                        />
                        <input
                          type="text"
                          value={ref.position}
                          onChange={(e) => updateReference(index, 'position', e.target.value)}
                          className="form-input"
                          placeholder="Position/Title"
                        />
                        <input
                          type="text"
                          value={ref.company}
                          onChange={(e) => updateReference(index, 'company', e.target.value)}
                          className="form-input"
                          placeholder="Company/Organization"
                        />
                        <input
                          type="text"
                          value={ref.relationship}
                          onChange={(e) => updateReference(index, 'relationship', e.target.value)}
                          className="form-input"
                          placeholder="Relationship (e.g., Former Supervisor)"
                        />
                        <input
                          type="tel"
                          value={ref.phone}
                          onChange={(e) => updateReference(index, 'phone', e.target.value)}
                          className="form-input"
                          placeholder="Phone Number"
                        />
                        <input
                          type="email"
                          value={ref.email}
                          onChange={(e) => updateReference(index, 'email', e.target.value)}
                          className="form-input"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">No references added yet</p>
                  <p className="text-sm text-gray-500 mt-2">References help validate your experience</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Profession:</span> {formData.profession}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    {formData.phone && <p><span className="font-medium">Phone:</span> {formData.phone}</p>}
                    {formData.city && formData.state && (
                      <p><span className="font-medium">Location:</span> {formData.city}, {formData.state}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Professional Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {formData.yearsExperience && (
                      <p><span className="font-medium">Experience:</span> {formData.yearsExperience} years</p>
                    )}
                    {formData.hourlyRate && (
                      <p><span className="font-medium">Hourly Rate:</span> ${formData.hourlyRate}</p>
                    )}
                    {formData.skills && formData.skills.length > 0 && (
                      <p><span className="font-medium">Skills:</span> {formData.skills.length} skills listed</p>
                    )}
                    {formData.references && formData.references.length > 0 && (
                      <p><span className="font-medium">References:</span> {formData.references.length} references</p>
                    )}
                  </div>
                </div>
              </div>

              {formData.bio && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{formData.bio}</p>
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Next Steps</h4>
              <p className="text-sm text-blue-700">
                After saving your profile, you'll be able to choose from multiple PDF templates 
                and download your professional profile.
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-primary"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting ? <LoadingDots /> : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
