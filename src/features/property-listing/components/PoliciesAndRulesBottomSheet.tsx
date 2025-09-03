import React from "react";
import { BaseBottomSheet } from "@/components";

interface PoliciesAndRulesBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  policies?: { id: string; rule: string; }[];
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
  policies = [],
}) => {
  // Icon mapping based on policy rule content
  const getIconForPolicy = (rule: string): string => {
    const lowerRule = rule.toLowerCase();
    
    if (lowerRule.includes('tenant') || lowerRule.includes('preference') || lowerRule.includes('professional') || lowerRule.includes('student')) {
      return "👥";
    }
    if (lowerRule.includes('food') || lowerRule.includes('vegetarian') || lowerRule.includes('non-vegetarian')) {
      return "🍽️";
    }
    if (lowerRule.includes('guest') || lowerRule.includes('visitor') || lowerRule.includes('opposite gender')) {
      return "🚫";
    }
    if (lowerRule.includes('quiet') || lowerRule.includes('noise') || lowerRule.includes('sound')) {
      return "🔇";
    }
    if (lowerRule.includes('curfew') || lowerRule.includes('timing') || lowerRule.includes('time')) {
      return "⏰";
    }
    if (lowerRule.includes('smoking') || lowerRule.includes('smoke')) {
      return "🚭";
    }
    if (lowerRule.includes('cooking') || lowerRule.includes('kitchen')) {
      return "🍳";
    }
    if (lowerRule.includes('safety') || lowerRule.includes('emergency')) {
      return "🛡️";
    }
    if (lowerRule.includes('pet') || lowerRule.includes('animal')) {
      return "🐕";
    }
    if (lowerRule.includes('parking') || lowerRule.includes('vehicle')) {
      return "🚗";
    }
    if (lowerRule.includes('alcohol') || lowerRule.includes('drink')) {
      return "🍺";
    }
    // Default icon for general rules
    return "📋";
  };

  // Convert policies to PolicyRule format
  const policyRules: PolicyRule[] = policies.map((policy) => {
    // Extract title and description from the rule
    const ruleParts = policy.rule.split(':');
    const title = ruleParts[0]?.trim() || policy.rule;
    const description = ruleParts.length > 1 ? ruleParts.slice(1).join(':').trim() : policy.rule;
    
    return {
      id: policy.id,
      title: title,
      description: description,
      icon: getIconForPolicy(policy.rule),
    };
  });

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
            {policyRules.length > 0 ? (
              policyRules.map((rule) => (
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
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {rule.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-base font-medium text-gray-900 mb-2">
                  No policies available
                </h3>
                <p className="text-sm text-gray-600">
                  No specific policies and rules have been set for this property.
                </p>
              </div>
            )}
          </div>
        </div>
      </BaseBottomSheet>
    );
};

export default PoliciesAndRulesBottomSheet; 