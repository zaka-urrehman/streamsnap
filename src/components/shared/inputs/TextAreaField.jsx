import React from 'react';

const TextareaField = ({ label, id, rows = 4, placeholder = '', value, onChange, required = false }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-mySecondary-400 text-white"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default TextareaField;
