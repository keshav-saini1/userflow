import React from 'react';
import { useNavigate } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { FiCreditCard } from 'react-icons/fi';
import default_back from '@/assets/default_back.svg';

const AllPaymentsPage = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 w-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="px-4 lg:px-8 py-4 lg:py-6 flex items-center gap-4">
                    <button onClick={handleBackClick}>
                        <img src={default_back} alt="back" className="w-10 h-10" />
                    </button>
                    <h1 className="text-lg lg:text-xl font-semibold text-gray-900">All Payments</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="px-3.5 lg:px-8 py-3.5 lg:py-8 space-y-3.5 lg:space-y-6">
                <div className="max-w-6xl mx-auto">
                    {/* Coming Soon Card */}
                    <div className="bg-white rounded-xl shadow-sm p-4 lg:p-6 text-center">
                        <div className="max-w-md mx-auto">
                            {/* Icon */}
                            <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 lg:mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                                <FiCreditCard className="w-8 h-8 lg:w-10 lg:h-10 text-blue-600" />
                            </div>

                            {/* Main Content */}
                            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 lg:mb-3">
                                Coming Soon!
                            </h2>
                            <p className="text-sm lg:text-base text-gray-600 mb-6 lg:mb-8">
                                We're building something amazing for you. Your complete payment history, receipts, and transaction details will be available here soon.
                            </p>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="pt-4 lg:pt-6">
                        <button
                            onClick={handleBackClick}
                            className="w-full bg-gray-900 text-white rounded-xl py-3 lg:py-4 px-4 lg:px-6 flex items-center justify-center gap-3 text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors"
                        >
                            Go Back to Dashboard
                            <FaArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllPaymentsPage