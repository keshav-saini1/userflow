import React, { useState } from 'react';
import DateInput from './DateInput';

const DateInputExample: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');

  return (
    <div className="p-6 space-y-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">DateInput with shadcn/ui Calendar</h2>
      
      {/* Basic Date Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Basic Date Picker</h3>
        <DateInput
          label="Select Date"
          placeholder="Choose a date"
          value={selectedDate}
          onChange={setSelectedDate}
          name="date"
        />
        {selectedDate && (
          <p className="text-sm text-gray-600">Selected: {selectedDate}</p>
        )}
      </div>

      {/* Date Input with Min/Max */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Date Picker with Range</h3>
        <DateInput
          label="Date of Birth"
          placeholder="Select your birth date"
          value={birthDate}
          onChange={setBirthDate}
          name="birthDate"
          min="1900-01-01"
          max="2024-12-31"
        />
        {birthDate && (
          <p className="text-sm text-gray-600">Birth Date: {birthDate}</p>
        )}
      </div>

      {/* Disabled Date Input */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled Date Picker</h3>
        <DateInput
          label="Disabled Date"
          placeholder="This is disabled"
          value=""
          onChange={() => {}}
          name="disabledDate"
          disabled={true}
        />
      </div>

      {/* Date Input with Error */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Date Picker with Error</h3>
        <DateInput
          label="Required Date"
          placeholder="This field is required"
          value=""
          onChange={() => {}}
          name="requiredDate"
          error="This field is required"
        />
      </div>
    </div>
  );
};

export default DateInputExample; 