import React, { useState, useEffect } from 'react';

const AnalogDateInput = ({ value, onChange, className }) => {
  const [year, month, day] = value.split('-');

  const [monthAngle, setMonthAngle] = useState(0);
  const [dayAngle, setDayAngle] = useState(0);

  useEffect(() => {
    const monthAngle = (parseInt(month) - 1) * 30;
    const dayAngle = (parseInt(day) - 1) * (360 / 31);
    setMonthAngle(monthAngle);
    setDayAngle(dayAngle);
  }, [month, day]);

  const handleDateChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={`relative w-full h-12 ${className}`}>
     

      {/* Date Input Field */}
      <div className="relative h-full">
        
        <input
          type="date"
          name="completion_date"
          value={value}
          onChange={handleDateChange}
          className="w-full h-full px-4 bg-[#2A2A32] text-white rounded-xl border-2 border-gray-700/50 focus:outline-none focus:border-[#FD356E] focus:ring-2 focus:ring-[#FD356E]/20 transition-all duration-200 transform hover:scale-[1.01] focus:scale-[1.01] appearance-none"
          required
        />
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnalogDateInput;