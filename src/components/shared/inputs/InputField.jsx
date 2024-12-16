import React from 'react';

const InputField = ({ label, type = 'text', id, placeholder = '', value , onChange, required = false }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2 border bg-gray-100/50  dark:bg-gray-800 border-gray-500 dark:border-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-500 rounded-lg focus:outline-none focus:border-none focus:bg-white focus:ring-2 focus:ring-mySecondary-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
