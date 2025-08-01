import React from "react";
import { BaseBottomSheet } from "@/components";

interface PoliciesAndRulesBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PolicyRule {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const PoliciesAndRulesBottomSheet: React.FC<PoliciesAndRulesBottomSheetProps> = ({
  isOpen,
  onClose,
}) => {
  const policyRules: PolicyRule[] = [
    {
      id: "1",
      title: "Tenant preference",
      description: "Working Professional, Student, Relative and Friends",
      icon: "👥",
    },
    {
      id: "2",
      title: "Food preference",
      description: "Both Vegetarian and Non-Vegetarian",
      icon: "🍽️",
    },
    {
      id: "3",
      title: "Guest policy",
      description: "Opposite genders are not allowed.\n₹500 Guest Charges",
      icon: "🚫",
    },
    {
      id: "4",
      title: "Quiet hours",
      description: "11:00 p.m → 06:00 a.m",
      icon: "🔇",
    },
    {
      id: "5",
      title: "Curfew timings",
      description: "11:00 p.m → 06:00 a.m",
      icon: "⏰",
    },
    {
      id: "6",
      title: "Smoking policy",
      description: "Not allowed",
      icon: "🚭",
    },
    {
      id: "7",
      title: "Rules",
      description: "1. Cooking inside the room is not allowed.\n2. Follow all safety and emergency procedures.",
      icon: "📋",
    },
  ];

  return (
    <BaseBottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Policies and Rules"
      className="bg-gray-50"
      bodyClassName="bg-gray-50"
    >
      <div className="flex flex-col h-full bg-gray-50">
          {/* Header Section */}
          <div className="px-6 py-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-wide">
                Stay Guidelines
              </h1>
              <p className="text-base text-gray-600 leading-relaxed">
                Here are the guidelines set for this rental — from guest rules to
                quiet hours and more.
              </p>
            </div>
          </div>

          {/* Policy Rules List */}
          <div className="px-6 pb-6 space-y-4">
            {policyRules.map((rule) => (
              <div
                key={rule.id}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <span className="text-lg">{rule.icon}</span>
                  </div>
                  <h3 className="text-base font-medium text-gray-900">
                    {rule.title}
                  </h3>
                </div>
                <div className="ml-7">
                  {rule.id === "7" ? (
                    <ol className="list-decimal space-y-1 text-sm text-gray-600">
                      <li>Cooking inside the room is not allowed.</li>
                      <li>Follow all safety and emergency procedures.</li>
                    </ol>
                  ) : (
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {rule.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BaseBottomSheet>
    );
};

export default PoliciesAndRulesBottomSheet; 