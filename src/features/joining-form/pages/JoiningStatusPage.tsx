import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import approved_img from "@/assets/approved.svg";
import review_img from "@/assets/review.svg";
import default_back from "@/assets/default_back.svg";
import { LuUserRound } from "react-icons/lu";
import { BiHomeAlt } from "react-icons/bi";
import { PiCurrencyInrBold } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { GrDocumentText } from "react-icons/gr";
import { FiArrowRight } from "react-icons/fi";

type StatusType = "success" | "failure" | "pending";

interface DetailItem {
  label: string;
  value: string;
}

interface ProgressItem {
  title: string;
  description: string;
  time: string;
  completed: boolean;
}

interface ApplicationDetail {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}

const JoiningStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<StatusType>("pending");

  useEffect(() => {
    const statusParam = searchParams.get("status") as StatusType;
    if (statusParam) {
      setStatus(statusParam);
    }
  }, [searchParams]);

  const statusConfig = {
    success: {
      title: "Application Approved",
      message: "Your application is approved by our team",
      bgColor: "bg-green-50 border-green-200",
      icon: approved_img,
      iconClass: "w-16 h-16"
    },
    failure: {
      title: "Application Under Review", 
      message: "Your application is being reviewed by our team",
      bgColor: "bg-red-50 border-red-200",
      icon: review_img,
      iconClass: "w-16 h-16"
    },
    pending: {
      title: "Application Under Review",
      message: "Your application is being reviewed by our team", 
      bgColor: "bg-orange-50 border-orange-200",
      icon: review_img,
      iconClass: "w-7 h-7"
    }
  };

  const details: DetailItem[] = [
    { label: "Your Room", value: "101 Bed A" },
    { label: "Monthly Rent", value: "₹55,000" },
    { label: "Move-in Date", value: "09 July, 2025" },
    { label: "Submitted On", value: "25 June, 2025" }
  ];

  const applicationDetails: ApplicationDetail[] = [
    { icon: LuUserRound, label: "Full Name", value: "Ishika Malhotra" },
    { icon: BiHomeAlt, label: "Room Assignment", value: "101 Bed A" },
    { icon: PiCurrencyInrBold, label: "Monthly Rent", value: "₹55,000" },
    { icon: CiCalendar, label: "Agreement Start Date", value: "20 Jul'25" },
    { icon: CiCalendar, label: "Agreement End Date", value: "31 Jul'25" },
    { icon: GrDocumentText, label: "Documents", value: "Documents Pending" }
  ];

  const progressItems: ProgressItem[] = [
    { title: "Application Submitted", description: "Your application has been received", time: "Yesterday", completed: true },
    { title: "Under Review", description: "Application reviewed", time: "2d ago", completed: true },
    { title: "Decision Pending", description: "We'll notify you once a decision is made", time: "3d ago", completed: status === "success" || status === "failure" }
  ];

  const handleBack = () => navigate(-1);
  const handleContinueToDashboard = () => navigate("/dashboard");
  const handleRemindManagement = () => console.log("Remind management clicked");
  const handleChatSupport = () => console.log("Chat support clicked");
  const handleCallUs = () => console.log("Call us clicked");

  const renderDetailItem = ({ label, value }: DetailItem) => (
    <div key={label} className="flex justify-between items-center">
      <span className="text-gray-600 text-xs">{label}</span>
      <span className="font-semibold text-gray-900 text-sm">{value}</span>
    </div>
  );

  const renderApplicationDetail = ({ icon: Icon, label, value }: ApplicationDetail) => (
    <div key={label} className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-gray-600" />
      <div className="flex-1">
        <p className="text-gray-600 text-xs">{label}</p>
        <p className="font-medium text-gray-900 text-sm">{value}</p>
      </div>
    </div>
  );

  const renderProgressItem = ({ title, description, time, completed }: ProgressItem) => (
    <div key={title} className="flex items-start gap-4 relative">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
        completed ? "bg-green-100" : "bg-gray-100"
      }`}>
        <svg className={`w-3.5 h-3.5 ${
          completed ? "text-green-600" : "text-gray-400"
        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 text-sm">{title}</h4>
        <p className="text-gray-600 text-xs">{description}</p>
      </div>
      <span className="text-gray-500 text-xs absolute right-0 top-0">{time}</span>
    </div>
  );

  const config = statusConfig[status];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center gap-3 p-4">
          <button onClick={handleBack}>
            <img src={default_back} alt="back" className="w-10 h-10" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-gray-900 text-sm">Joining Request Status</h1>
            <p className="text-gray-600 text-xs">Track your application progress</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Status Card */}
          <div className={`rounded-xl p-6 border ${config.bgColor}`}>
            <div className="flex items-center gap-4">
              <div>
                {config.icon ? (
                  <img src={config.icon} alt={config.title} className={config.iconClass} />
                ) : (
                  <svg className={config.iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-gray-900 text-lg">{config.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{config.message}</p>
              </div>
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-xl p-4 mt-6 space-y-4">
              {details.map(renderDetailItem)}
            </div>
          </div>

          {/* Application Details */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-6">Application Details</h3>
            <div className="space-y-6">
              {applicationDetails.map(renderApplicationDetail)}
            </div>
          </div>

          {/* Application Progress */}
          <div className="bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 text-sm mb-6">Application Progress</h3>
            <div className="space-y-6">
              {progressItems.map(renderProgressItem)}
            </div>
          </div>

          {/* Need Assistance */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 text-base mb-4">Need assistance?</h3>
            <div className="flex gap-3">
              <button onClick={handleChatSupport} className="flex-1 bg-white rounded-xl py-2.5 px-6 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-gray-900 text-sm font-medium">Chat Support</span>
              </button>
              <button onClick={handleCallUs} className="flex-1 bg-white rounded-xl py-2.5 px-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-900 text-sm font-medium">Call Us</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          {status === "success" && (
            <button onClick={handleContinueToDashboard} className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <span className="text-sm">Continue to Dashboard</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          )}

          {status === "failure" && (
            <button onClick={handleRemindManagement} className="w-full bg-gray-900 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
              <span className="text-sm">Remind Management</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoiningStatusPage;
