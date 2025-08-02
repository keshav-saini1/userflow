import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BaseBottomSheet } from '@/components';
import type { FilterStepProps } from '../types';

const FilterStep4: React.FC<FilterStepProps> = ({
  isOpen,
  onClose,
  onNext
}) => {
  const [sharingType, setSharingType] = useState('Single Sharing');
  const [gender, setGender] = useState('Male');
  const [budgetRange, setBudgetRange] = useState({ min: 8000, max: 25000 });
  const [securityDeposit, setSecurityDeposit] = useState('15 Days');
  const [residentType, setResidentType] = useState('Student');

  const handleApplyFilters = () => {
    onNext({
      sharingType,
      gender,
      budgetRange,
      securityDeposit,
      residentType
    });
  };

  const handleClearAll = () => {
    setSharingType('Single Sharing');
    setGender('Male');
    setBudgetRange({ min: 8000, max: 25000 });
    setSecurityDeposit('15 Days');
    setResidentType('Student');
  };

  const sharingTypeOptions = [
    { label: 'Single Sharing', value: 'Single Sharing' },
    { label: 'Double Sharing', value: 'Double Sharing' },
    { label: 'Triple Sharing', value: 'Triple Sharing' }
  ];

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' }
  ];

  const securityDepositOptions = [
    { label: '15 Days', value: '15 Days' },
    { label: '1 Months', value: '1 Months' },
    { label: '2 Months', value: '2 Months' }
  ];

  const residentTypeOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Working Professional', value: 'Working Professional' }
  ];

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Filters"
      className="min-h-[90vh]"
    >
      <div className="flex flex-col h-[90vh]">
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Sharing Type */}
          <div className="border-b border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3.5">Sharing Type</h3>
            <div className="flex gap-2 flex-wrap">
              {sharingTypeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSharingType(option.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    sharingType === option.value
                      ? 'bg-gray-50 border border-gray-900 text-gray-900'
                      : 'border border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div className="border-b border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3.5">Gender</h3>
            <div className="flex gap-2 flex-wrap">
              {genderOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setGender(option.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    gender === option.value
                      ? 'bg-gray-50 border border-gray-900 text-gray-900'
                      : 'border border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="border-b border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3.5">Budget</h3>
            <div className="flex gap-3.5 mb-4">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Minimum</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={budgetRange.min}
                    onChange={(e) => setBudgetRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="w-full text-[#101828] pl-8 pr-3 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8000"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Maximum</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={budgetRange.max}
                    onChange={(e) => setBudgetRange(prev => ({ ...prev, max: parseInt(e.target.value) || 0 }))}
                    className="w-full pl-8 text-[#101828] pr-3 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="25000"
                  />
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Most places cost between ₹10,000 - ₹20,000 per month
              </p>
            </div>
          </div>

          {/* Security Deposit */}
          <div className="border-b border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3.5">Security Deposit</h3>
            <div className="flex gap-2 flex-wrap">
              {securityDepositOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSecurityDeposit(option.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    securityDeposit === option.value
                      ? 'bg-gray-50 border border-gray-900 text-gray-900'
                      : 'border border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Type of Resident */}
          <div className="border-b border-gray-100 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3.5">Type of Resident</h3>
            <div className="flex gap-2 flex-wrap">
              {residentTypeOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setResidentType(option.value)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    residentType === option.value
                      ? 'bg-gray-50 border border-gray-900 text-gray-900'
                      : 'border border-gray-200 text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed at bottom of screen */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleClearAll}
              className="flex-1 py-3 px-6 bg-white border border-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Clear All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleApplyFilters}
              className="flex-1 py-3 px-6 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Apply
            </motion.button>
          </div>
        </div>
      </div>
    </BaseBottomSheet>
  );
};

export default FilterStep4; 