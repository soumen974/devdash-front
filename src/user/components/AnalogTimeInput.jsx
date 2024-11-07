import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const AnalogDateInput = ({ value, onChange, className, label = "Select Date" }) => {
  // State for formatted display date
  const [displayDate, setDisplayDate] = useState('');
  
  // Format the date for display (dd/mm/yyyy)
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format date for input value (yyyy-mm-dd)
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };

  // Initialize display date when component mounts or value changes
  useEffect(() => {
    setDisplayDate(formatDateForDisplay(value));
  }, [value]);

  // Handle date input change
  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    
    // Update the hidden input with yyyy-mm-dd format for form submission
    onChange(inputDate);
    
    // Update display date with dd/mm/yyyy format
    setDisplayDate(formatDateForDisplay(inputDate));
  };

  // Handle manual date entry
  const handleDisplayChange = (event) => {
    const input = event.target.value;
    setDisplayDate(input);

    // Validate and convert dd/mm/yyyy to yyyy-mm-dd
    if (input.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const formattedDate = formatDateForInput(input);
      // Validate the date is real
      const date = new Date(formattedDate);
      if (!isNaN(date.getTime())) {
        onChange(formattedDate);
      }
    }
  };

  // Handle blur event to ensure correct format
  const handleBlur = () => {
    setDisplayDate(formatDateForDisplay(value));
  };

  return (
    <div className={`${className}`}>
      <label className="text-sm font-medium text-gray-300 mb-2 block">
        {label}
      </label>
      
      <div className="relative">
        {/* Display Input (dd/mm/yyyy) */}
        <input
          type="text"
          value={displayDate}
          onChange={handleDisplayChange}
          onBlur={handleBlur}
          placeholder="DD/MM/YYYY"
          className="w-full h-12 px-4 bg-[#2A2A32] text-white rounded-xl border-2 
            border-gray-700/50 focus:outline-none focus:border-[#FD356E] 
            focus:ring-2 focus:ring-[#FD356E]/20 transition-all duration-200 
            transform hover:scale-[1.01] focus:scale-[1.01] pr-12"
        />

        {/* Hidden Date Input for Form Submission */}
        <input
          type="date"
          value={value}
          onChange={handleDateChange}
          className="sr-only"
          tabIndex={-1}
        />

        {/* Calendar Icon Button */}
        <button
          type="button"
          onClick={() => document.querySelector('input[type="date"]').showPicker()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 
            text-gray-400 hover:text-[#FD356E] transition-colors duration-200"
        >
          <Calendar className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default AnalogDateInput;