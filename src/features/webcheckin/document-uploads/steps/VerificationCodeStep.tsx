import React, { useState, useEffect } from 'react';
import type { DocumentUploadStepProps } from '../types';

const VerificationCodeStep: React.FC<DocumentUploadStepProps> = ({
  onNext,
}) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [phoneNumber] = useState('+91 8699900055');

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleVerifyAndContinue = () => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      onNext();
    }
  };

  const handleResendCode = () => {
    setCountdown(30);
    setCanResend(false);
    // Here you would typically call an API to resend the code
  };

  const isCodeComplete = verificationCode.every(digit => digit !== '');

  return (
    <div className="flex flex-col gap-[35px] h-full">
      {/* Header Section */}
      <div className="flex flex-col gap-[10.5px]">
        <div className="flex flex-col items-center">
          <h2 className="text-[#101828] text-[21px] font-medium leading-[26.25px] text-center">
            Enter verification code 📱
          </h2>
        </div>
        <div className="flex flex-col gap-[10.5px] items-center">
          <p className="text-[#717182] text-[14px] leading-[22.75px] text-center">
            We sent a 6-digit code to
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[#5a5a69] text-[14px] font-semibold leading-[22.75px]">
              {phoneNumber}
            </span>
            <button className="text-[#717182] text-[14px] leading-[22.75px]">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Verification Code Input */}
      <div className="flex flex-col gap-[21px]">
        <div className="flex gap-[10.5px] justify-center">
          {verificationCode.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[42px] h-[49px] text-black bg-neutral-100 rounded-[12.75px] text-center text-[18px] font-medium focus:outline-none focus:ring-2 focus:ring-[#155dfc] focus:bg-white"
              maxLength={1}
              inputMode="numeric"
            />
          ))}
        </div>
        
        <div className="flex flex-col gap-[10.5px] items-center">
          <p className="text-[#717182] text-[12.3px] leading-[17.5px] text-center">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResendCode}
              className="text-[#155dfc] text-[12.3px] leading-[17.5px] font-medium"
            >
              Resend code
            </button>
          ) : (
            <p className="text-[#717182] text-[12.3px] leading-[17.5px] text-center">
              Resend in {countdown}s
            </p>
          )}
        </div>
      </div>

      {/* Bottom Action Section */}
      <div className="mt-auto">
        <div className="bg-[rgba(255,255,255,0.95)] backdrop-blur rounded-t-[14px] border-t border-[rgba(0,0,0,0.05)] p-[15px] pb-[21px]">
          <button
            onClick={handleVerifyAndContinue}
            disabled={!isCodeComplete}
            className={`w-full h-[49px] rounded-[14px] flex items-center justify-center gap-[10.5px] text-[14px] font-medium leading-[21px] transition-all ${
              isCodeComplete
                ? 'bg-[#030213] text-white shadow-[0px_10px_15px_-3px_rgba(3,2,19,0.2),0px_4px_6px_-4px_rgba(3,2,19,0.2)]'
                : 'bg-[#030213] text-white opacity-40 cursor-not-allowed'
            }`}
          >
            <span>Verify & Continue</span>
            <svg className="w-[17.5px] h-[17.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <p className="text-[#717182] text-[10.5px] leading-[14px] text-center mt-[10.5px]">
            Enter the 6-digit code sent to your phone
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationCodeStep; 